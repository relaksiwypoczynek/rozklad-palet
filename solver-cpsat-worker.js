import { CpModel, CpSolver, CpSolverStatus } from "./vendor/cpsat-js/dist/index.js";
import { create } from "./vendor/@bufbuild/protobuf/dist/esm/index.js";
import {
  IntervalConstraintProtoSchema,
  NoOverlap2DConstraintProtoSchema,
  PartialVariableAssignmentSchema
} from "./vendor/cpsat-js/dist/generated/cp_model_pb.js";
import { toLinearExpr } from "./vendor/cpsat-js/dist/model/linear-expr.js";

let cachedSolver = null;

self.onmessage = async (event) => {
  const { requestId, payload } = event.data || {};
  if (!requestId || !payload) return;

  try {
    progress(requestId, "cpsatLoading");
    const solver = await getSolver();
    progress(requestId, "cpsatBuilding");
    const plan = solveCpSatLayout(solver, payload, requestId);
    self.postMessage({ type: "result", requestId, plan });
  } catch (error) {
    self.postMessage({
      type: "error",
      requestId,
      message: error && error.message ? error.message : String(error)
    });
  }
};

async function getSolver() {
  if (!cachedSolver) {
    cachedSolver = await CpSolver.create({
      locateFile: (path) => new URL(`./vendor/cpsat-js/build/${path}`, import.meta.url).href
    });
  }
  return cachedSolver;
}

function progress(requestId, messageKey, params = {}, detail = "") {
  self.postMessage({ type: "progress", requestId, messageKey, params, detail });
}

function clampNumber(value, min, fallback) {
  const parsed = Number(value);
  return Math.max(min, Number.isFinite(parsed) ? parsed : fallback);
}

function expandItems(rows, gap) {
  const items = [];
  let index = 0;
  for (const row of rows || []) {
    const quantity = Math.floor(clampNumber(row.quantity, 0, 0));
    const length = clampNumber(row.length, 1, 1);
    const width = clampNumber(row.width, 1, 1);
    const name = String(row.name || "Paleta").trim() || "Paleta";
    for (let i = 0; i < quantity; i++) {
      const packLength = length + gap;
      const packWidth = width + gap;
      items.push({
        id: `${row.id}-${i + 1}`,
        rowId: row.id,
        typeIndex: rows.indexOf(row),
        itemIndex: i + 1,
        index: index++,
        name,
        length,
        width,
        packLength,
        packWidth,
        actualArea: length * width,
        packArea: packLength * packWidth,
        longSide: Math.max(packLength, packWidth),
        shortSide: Math.min(packLength, packWidth),
        color: row.color || "#475569"
      });
    }
  }
  return items;
}

function getOrientations(item, trailer, allowRotate) {
  const orientations = [{
    rotated: false,
    packLength: item.packLength,
    packWidth: item.packWidth,
    actualLength: item.length,
    actualWidth: item.width
  }];
  if (allowRotate && item.length !== item.width) {
    orientations.push({
      rotated: true,
      packLength: item.packWidth,
      packWidth: item.packLength,
      actualLength: item.width,
      actualWidth: item.length
    });
  }
  return orientations.filter((orient) =>
    orient.packLength <= trailer.length && orient.packWidth <= trailer.width
  );
}

function rangesOverlap(aStart, aSize, bStart, bSize) {
  return aStart < bStart + bSize && bStart < aStart + aSize;
}

function intersects(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function isContainedIn(a, b) {
  return a.x >= b.x && a.y >= b.y && a.x + a.w <= b.x + b.w && a.y + a.h <= b.y + b.h;
}

class MaxRectsBin {
  constructor(length, width) {
    this.length = length;
    this.width = width;
    this.freeRects = [{ x: 0, y: 0, w: length, h: width }];
  }

  insert(item, allowRotate) {
    let best = null;
    for (const free of this.freeRects) {
      for (const orient of getOrientations(item, this, allowRotate)) {
        if (orient.packLength > free.w || orient.packWidth > free.h) continue;
        const candidate = {
          x: free.x,
          y: free.y,
          w: orient.packLength,
          h: orient.packWidth,
          orient
        };
        const shortSide = Math.min(free.w - candidate.w, free.h - candidate.h);
        const areaWaste = free.w * free.h - candidate.w * candidate.h;
        const score = [areaWaste, shortSide, candidate.x + candidate.w, candidate.y + candidate.h];
        if (!best || compareTuple(score, best.score) < 0) best = { ...candidate, score };
      }
    }
    if (!best) return null;
    this.place(best);
    return best;
  }

  place(node) {
    const nextFree = [];
    for (const free of this.freeRects) {
      if (!intersects(free, node)) {
        nextFree.push(free);
        continue;
      }
      if (node.y > free.y) nextFree.push({ x: free.x, y: free.y, w: free.w, h: node.y - free.y });
      if (node.y + node.h < free.y + free.h) {
        nextFree.push({ x: free.x, y: node.y + node.h, w: free.w, h: free.y + free.h - (node.y + node.h) });
      }
      if (node.x > free.x) nextFree.push({ x: free.x, y: free.y, w: node.x - free.x, h: free.h });
      if (node.x + node.w < free.x + free.w) {
        nextFree.push({ x: node.x + node.w, y: free.y, w: free.x + free.w - (node.x + node.w), h: free.h });
      }
    }
    this.freeRects = nextFree.filter((rect) => rect.w > 0 && rect.h > 0);
    for (let i = 0; i < this.freeRects.length; i++) {
      for (let j = i + 1; j < this.freeRects.length; j++) {
        if (isContainedIn(this.freeRects[i], this.freeRects[j])) {
          this.freeRects.splice(i, 1);
          i--;
          break;
        }
        if (isContainedIn(this.freeRects[j], this.freeRects[i])) {
          this.freeRects.splice(j, 1);
          j--;
        }
      }
    }
  }
}

function compareTuple(a, b) {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const left = a[i] ?? 0;
    const right = b[i] ?? 0;
    if (left < right) return -1;
    if (left > right) return 1;
  }
  return 0;
}

function mixSeed(...values) {
  let seed = 2166136261;
  for (const value of values) {
    const text = String(value);
    for (let i = 0; i < text.length; i++) {
      seed ^= text.charCodeAt(i);
      seed = Math.imul(seed, 16777619);
    }
    seed ^= 0x9e3779b9;
    seed = Math.imul(seed, 2246822507);
  }
  return seed >>> 0;
}

function variantHash(seed, ...values) {
  let hash = seed >>> 0;
  for (const value of values) {
    hash = mixSeed(hash, value);
  }
  hash ^= hash >>> 16;
  hash = Math.imul(hash, 2246822507);
  hash ^= hash >>> 13;
  hash = Math.imul(hash, 3266489909);
  hash ^= hash >>> 16;
  return hash >>> 0;
}

function orderItemsForVariant(items, layoutVariant, inputSeed) {
  if (layoutVariant <= 0 || items.length < 2) return items;
  const seed = mixSeed(inputSeed || 1, layoutVariant, items.length);
  return items
    .map((item, index) => ({
      item,
      index,
      key: variantHash(seed, item.id, item.length, item.width, item.typeIndex, item.itemIndex, index)
    }))
    .sort((a, b) => a.key - b.key || a.index - b.index)
    .map((entry) => entry.item);
}

function layoutSignature(placed) {
  return placed
    .map((item) => [
      item.id,
      Math.round(item.x),
      Math.round(item.y),
      Math.round(item.packLength),
      Math.round(item.packWidth),
      item.rotated ? 1 : 0
    ].join(":"))
    .sort()
    .join("|");
}

function usedPackLength(placed) {
  return placed.reduce((max, item) => Math.max(max, item.x + item.packLength), 0);
}

function greedyUpperBound(items, trailer, allowRotate) {
  const ordered = items.slice().sort((a, b) =>
    b.packArea - a.packArea ||
    b.longSide - a.longSide ||
    a.index - b.index
  );
  const bins = [];
  for (const item of ordered) {
    let placed = false;
    for (const bin of bins) {
      const node = bin.insert(item, allowRotate);
      if (node) {
        placed = true;
        break;
      }
    }
    if (!placed) {
      const bin = new MaxRectsBin(trailer.length, trailer.width);
      const node = bin.insert(item, allowRotate);
      if (!node) return null;
      bins.push(bin);
    }
  }
  return Math.max(1, bins.length);
}

function greedyWarmStart(items, trailer, allowRotate) {
  const ordered = items.slice().sort((a, b) =>
    b.packArea - a.packArea ||
    b.longSide - a.longSide ||
    a.index - b.index
  );
  const bins = [];
  const placements = new Map();

  for (const item of ordered) {
    let placed = false;
    for (let binIndex = 0; binIndex < bins.length; binIndex++) {
      const node = bins[binIndex].bin.insert(item, allowRotate);
      if (!node) continue;
      const placement = {
        binIndex,
        x: node.x,
        y: node.y,
        rotated: node.orient.rotated,
        packLength: node.orient.packLength,
        packWidth: node.orient.packWidth
      };
      bins[binIndex].placements.push({ item, placement });
      placements.set(item.id, placement);
      placed = true;
      break;
    }
    if (placed) continue;

    const bin = new MaxRectsBin(trailer.length, trailer.width);
    const node = bin.insert(item, allowRotate);
    if (!node) return null;
    const binIndex = bins.length;
    const placement = {
      binIndex,
      x: node.x,
      y: node.y,
      rotated: node.orient.rotated,
      packLength: node.orient.packLength,
      packWidth: node.orient.packWidth
    };
    bins.push({ bin, placements: [{ item, placement }] });
    placements.set(item.id, placement);
  }

  return {
    bins,
    placements,
    count: bins.length
  };
}

function overlapAmount(aStart, aSize, bStart, bSize) {
  return Math.max(0, Math.min(aStart + aSize, bStart + bSize) - Math.max(aStart, bStart));
}

function placedOrientations(source, trailer, allowRotate, gap) {
  const originalLength = source.originalLength || source.length;
  const originalWidth = source.originalWidth || source.width;
  const orientations = [{
    rotated: false,
    packLength: originalLength + gap,
    packWidth: originalWidth + gap,
    length: originalLength,
    width: originalWidth
  }];
  if (allowRotate && originalLength !== originalWidth) {
    orientations.push({
      rotated: true,
      packLength: originalWidth + gap,
      packWidth: originalLength + gap,
      length: originalWidth,
      width: originalLength
    });
  }
  return orientations.filter((orient) =>
    orient.packLength <= trailer.length && orient.packWidth <= trailer.width
  );
}

function placedFromSource(source, orient, x, y) {
  return {
    ...source,
    x,
    y,
    packLength: orient.packLength,
    packWidth: orient.packWidth,
    length: orient.length,
    width: orient.width,
    originalLength: source.originalLength || source.length,
    originalWidth: source.originalWidth || source.width,
    rotated: orient.rotated,
    area: (source.originalLength || source.length) * (source.originalWidth || source.width)
  };
}

function contactScore(candidate, placed, trailer) {
  let contact = 0;
  if (candidate.x === 0) contact += candidate.packWidth;
  if (candidate.y === 0 || candidate.y + candidate.packWidth === trailer.width) {
    contact += candidate.packLength;
  }
  for (const other of placed) {
    if (other.x === candidate.x + candidate.packLength || other.x + other.packLength === candidate.x) {
      contact += overlapAmount(candidate.y, candidate.packWidth, other.y, other.packWidth);
    }
    if (other.y === candidate.y + candidate.packWidth || other.y + other.packWidth === candidate.y) {
      contact += overlapAmount(candidate.x, candidate.packLength, other.x, other.packLength);
    }
  }
  return contact;
}

function compactPlacedItems(placed, trailer) {
  const compacted = placed.map((item) => ({ ...item }));
  for (let pass = 0; pass < 16; pass++) {
    let moved = false;
    compacted.sort((a, b) => a.x - b.x || a.y - b.y);
    for (const item of compacted) {
      let targetX = 0;
      for (const other of compacted) {
        if (other === item) continue;
        if (!rangesOverlap(item.y, item.packWidth, other.y, other.packWidth)) continue;
        if (other.x + other.packLength <= item.x) {
          targetX = Math.max(targetX, other.x + other.packLength);
        }
      }
      targetX = Math.max(0, Math.min(targetX, trailer.length - item.packLength));
      if (targetX < item.x) {
        item.x = targetX;
        moved = true;
      }
    }

    compacted.sort((a, b) => a.y - b.y || a.x - b.x);
    for (const item of compacted) {
      let targetY = 0;
      for (const other of compacted) {
        if (other === item) continue;
        if (!rangesOverlap(item.x, item.packLength, other.x, other.packLength)) continue;
        if (other.y + other.packWidth <= item.y) {
          targetY = Math.max(targetY, other.y + other.packWidth);
        }
      }
      targetY = Math.max(0, Math.min(targetY, trailer.width - item.packWidth));
      if (targetY < item.y) {
        item.y = targetY;
        moved = true;
      }
    }
    if (!moved) break;
  }
  return compacted.sort((a, b) => a.x - b.x || a.y - b.y);
}

function layoutPocketPenalty(placed, trailer) {
  if (placed.length === 0) return 0;
  const packUsedLength = placed.reduce((max, item) => Math.max(max, item.x + item.packLength), 0);
  const packArea = placed.reduce((sum, item) => sum + item.packLength * item.packWidth, 0);
  const activeWaste = Math.max(0, packUsedLength * trailer.width - packArea);
  let staggerWaste = 0;
  for (const item of placed) {
    const rightEdge = item.x + item.packLength;
    let bestGap = Infinity;
    let bestOverlap = 0;
    for (const other of placed) {
      if (other === item) continue;
      if (other.x <= rightEdge) continue;
      const overlap = overlapAmount(item.y, item.packWidth, other.y, other.packWidth);
      if (overlap > 0) {
        const gap = other.x - rightEdge;
        if (gap < bestGap) {
          bestGap = gap;
          bestOverlap = overlap;
        }
      }
    }
    if (bestGap > 20 && Number.isFinite(bestGap)) {
      staggerWaste += bestGap * bestOverlap;
    }
  }
  return activeWaste + staggerWaste * 0.45;
}

function layoutContact(placed, trailer) {
  let contact = 0;
  for (const item of placed) {
    if (item.x === 0) contact += item.packWidth;
    if (item.y === 0 || item.y + item.packWidth === trailer.width) contact += item.packLength;
  }
  for (let i = 0; i < placed.length; i++) {
    for (let j = i + 1; j < placed.length; j++) {
      const a = placed[i];
      const b = placed[j];
      if (a.x + a.packLength === b.x || b.x + b.packLength === a.x) {
        contact += overlapAmount(a.y, a.packWidth, b.y, b.packWidth);
      }
      if (a.y + a.packWidth === b.y || b.y + b.packWidth === a.y) {
        contact += overlapAmount(a.x, a.packLength, b.x, b.packLength);
      }
    }
  }
  return contact;
}

function layoutScoreTuple(placed, trailer, gap = 0) {
  if (placed.length === 0) return [0, 0, 0, 0, 0, 0, 0, 0];
  const packUsedLength = placed.reduce((max, item) => Math.max(max, item.x + item.packLength), 0);
  const packUsedWidth = placed.reduce((max, item) => Math.max(max, item.y + item.packWidth), 0);
  const sumX = placed.reduce((sum, item) => sum + item.x, 0);
  const sumY = placed.reduce((sum, item) => sum + item.y, 0);
  const pocketPenalty = layoutPocketPenalty(placed, trailer);
  const contact = layoutContact(placed, trailer);
  const alignedRowScore = layoutAlignedRowScore(placed, trailer);
  const bandScore = layoutFullBandScore(placed, trailer);
  return [packUsedLength, pocketPenalty, -alignedRowScore, -bandScore, packUsedWidth, sumX, sumY, -contact, placed.length];
}

function skylineRepack(sources, trailer, allowRotate, gap, label) {
  const placed = [];
  for (const source of sources) {
    let best = null;
    for (const orient of placedOrientations(source, trailer, allowRotate, gap)) {
      const yCandidates = [0, Math.max(0, trailer.width - orient.packWidth)];
      for (const other of placed) {
        if (other.y <= trailer.width - orient.packWidth) yCandidates.push(other.y);
        const afterY = other.y + other.packWidth;
        if (afterY <= trailer.width - orient.packWidth) yCandidates.push(afterY);
      }
      const uniqueY = [...new Set(yCandidates.map((value) => Math.round(value)))].sort((a, b) => a - b);
      for (const y of uniqueY) {
        if (y < 0 || y + orient.packWidth > trailer.width) continue;
        let x = 0;
        for (const other of placed) {
          if (!rangesOverlap(y, orient.packWidth, other.y, other.packWidth)) continue;
          x = Math.max(x, other.x + other.packLength);
        }
        if (x + orient.packLength > trailer.length) continue;
        const candidate = placedFromSource(source, orient, x, y);
        const score = [
          x + orient.packLength,
          layoutPocketPenalty([...placed, candidate], trailer),
          x,
          y,
          -contactScore(candidate, placed, trailer),
          -orient.packLength * orient.packWidth
        ];
        if (!best || compareTuple(score, best.score) < 0) best = { candidate, score };
      }
    }
    if (!best) return null;
    placed.push(best.candidate);
  }
  return {
    label,
    placed: compactPlacedItems(placed, trailer)
  };
}

function maxRectsRepack(sources, trailer, allowRotate, gap, label) {
  const bin = new MaxRectsBin(trailer.length, trailer.width);
  const placed = [];
  for (const source of sources) {
    const item = {
      ...source,
      length: source.originalLength || source.length,
      width: source.originalWidth || source.width,
      packLength: (source.originalLength || source.length) + gap,
      packWidth: (source.originalWidth || source.width) + gap
    };
    const node = bin.insert(item, allowRotate);
    if (!node) return null;
    placed.push(placedFromSource(source, {
      rotated: node.orient.rotated,
      packLength: node.orient.packLength,
      packWidth: node.orient.packWidth,
      length: node.orient.actualLength,
      width: node.orient.actualWidth
    }, node.x, node.y));
  }
  return {
    label,
    placed: compactPlacedItems(placed, trailer)
  };
}

function roundRobinOrder(sources) {
  const groups = new Map();
  for (const source of sources) {
    const key = source.rowId ?? source.name;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(source);
  }
  const queues = [...groups.values()]
    .map((group) => group.slice().sort((a, b) => b.packLength * b.packWidth - a.packLength * a.packWidth || a.itemIndex - b.itemIndex))
    .sort((a, b) => (b[0].packLength * b[0].packWidth) - (a[0].packLength * a[0].packWidth));
  const ordered = [];
  while (queues.some((queue) => queue.length > 0)) {
    for (const queue of queues) {
      const next = queue.shift();
      if (next) ordered.push(next);
    }
  }
  return ordered;
}

function layoutFullBandScore(placed, trailer) {
  if (placed.length === 0) return 0;
  const edges = [...new Set(placed.flatMap((item) => [item.x, item.x + item.packLength]))]
    .filter((value) => value >= 0 && value <= trailer.length)
    .sort((a, b) => a - b);
  let score = 0;
  for (let i = 0; i < edges.length - 1; i++) {
    const left = edges[i];
    const right = edges[i + 1];
    if (right <= left) continue;
    const mid = (left + right) / 2;
    const occupiedWidth = placed
      .filter((item) => item.x <= mid && item.x + item.packLength >= mid)
      .reduce((sum, item) => sum + item.packWidth, 0);
    const gap = Math.max(0, trailer.width - occupiedWidth);
    const fillRatio = occupiedWidth / Math.max(1, trailer.width);
    const nearFullBonus = gap <= 20 ? 4 : gap <= 80 ? 2 : gap <= 180 ? 1 : 0;
    score += (right - left) * fillRatio * (1 + nearFullBonus);
  }
  return score;
}

function layoutAlignedRowScore(placed, trailer) {
  const groups = new Map();
  for (const item of placed) {
    const key = String(Math.round(item.x));
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }

  let score = 0;
  for (const group of groups.values()) {
    const occupiedWidth = group.reduce((sum, item) => sum + item.packWidth, 0);
    if (occupiedWidth > trailer.width) continue;
    const gap = trailer.width - occupiedWidth;
    const rowLength = group.reduce((max, item) => Math.max(max, item.packLength), 0);
    const fillRatio = occupiedWidth / Math.max(1, trailer.width);
    const nearFullBonus = gap <= 20 ? 6 : gap <= 80 ? 3 : gap <= 180 ? 1 : 0;
    score += rowLength * fillRatio * (1 + nearFullBonus);
  }
  return score;
}

function rowStateSignature(state) {
  return state.ids.slice().sort().join(",");
}

function compareRowScore(a, b) {
  return compareTuple(a.score, b.score);
}

function selectRowStates(states, limit) {
  const bySignature = new Map();
  for (const state of states) {
    const signature = rowStateSignature(state);
    const current = bySignature.get(signature);
    if (!current || compareRowScore(state, current) < 0) bySignature.set(signature, state);
  }
  return [...bySignature.values()].sort(compareRowScore).slice(0, limit);
}

function findBestWidthRow(remaining, trailer, allowRotate, gap) {
  const beamLimit = Math.max(80, Math.min(260, remaining.length * 14));
  let states = [{
    entries: [],
    ids: [],
    usedWidth: 0,
    rowLength: 0,
    area: 0,
    score: [trailer.width, 0, 0, 0]
  }];
  let best = null;

  for (let depth = 0; depth < Math.min(remaining.length, 8); depth++) {
    const next = states.slice();
    for (const state of states) {
      const used = new Set(state.ids);
      for (const source of remaining) {
        if (used.has(source.id)) continue;
        for (const orient of placedOrientations(source, trailer, allowRotate, gap)) {
          const usedWidth = state.usedWidth + orient.packWidth;
          if (usedWidth > trailer.width) continue;
          const rowLength = Math.max(state.rowLength, orient.packLength);
          const area = state.area + orient.packLength * orient.packWidth;
          const widthWaste = trailer.width - usedWidth;
          const densityWaste = Math.max(0, rowLength * trailer.width - area);
          const score = [
            widthWaste,
            densityWaste,
            rowLength,
            -area,
            state.entries.length + 1
          ];
          const candidate = {
            entries: [...state.entries, { source, orient }],
            ids: [...state.ids, source.id],
            usedWidth,
            rowLength,
            area,
            score
          };
          next.push(candidate);
          if (!best || compareRowScore(candidate, best) < 0) best = candidate;
        }
      }
    }
    const selected = selectRowStates(next, beamLimit);
    if (selected.length === states.length && selected.every((state, index) => state === states[index])) break;
    states = selected;
  }

  return best;
}

function dynamicRowsRepack(sources, trailer, allowRotate, gap, label) {
  const remaining = sources.map((item) => ({ ...item }));
  const placed = [];
  let cursorX = 0;

  while (remaining.length > 0) {
    const row = findBestWidthRow(remaining, trailer, allowRotate, gap);
    if (!row || row.entries.length === 0) return null;
    if (cursorX + row.rowLength > trailer.length) return null;

    let cursorY = 0;
    for (const entry of row.entries) {
      placed.push(placedFromSource(entry.source, entry.orient, cursorX, cursorY));
      cursorY += entry.orient.packWidth;
    }
    const used = new Set(row.ids);
    for (let i = remaining.length - 1; i >= 0; i--) {
      if (used.has(remaining[i].id)) remaining.splice(i, 1);
    }
    cursorX += row.rowLength;
  }

  return {
    label,
    placed: compactPlacedItems(placed, trailer)
  };
}

function repackTrailerLayout(trailerPlaced, trailer, allowRotate, gap, variantSeed = 0) {
  if (trailerPlaced.length < 2) {
    return {
      label: "CP-SAT + kompresja",
      placed: compactPlacedItems(trailerPlaced, trailer)
    };
  }
  const base = trailerPlaced.map((item) => ({ ...item }));
  const orders = [
    { label: "CP-SAT + dosuniecie", items: base.slice().sort((a, b) => a.x - b.x || a.y - b.y) },
    { label: "CP-SAT + pole", items: base.slice().sort((a, b) => b.packLength * b.packWidth - a.packLength * a.packWidth || b.packLength - a.packLength || b.packWidth - a.packWidth) },
    { label: "CP-SAT + dlugosc", items: base.slice().sort((a, b) => b.packLength - a.packLength || b.packWidth - a.packWidth || b.packLength * b.packWidth - a.packLength * a.packWidth) },
    { label: "CP-SAT + szerokosc", items: base.slice().sort((a, b) => b.packWidth - a.packWidth || b.packLength - a.packLength || b.packLength * b.packWidth - a.packLength * a.packWidth) },
    { label: "CP-SAT + mieszane typy", items: roundRobinOrder(base) }
  ];

  const fallback = { label: "CP-SAT + kompresja", placed: compactPlacedItems(base, trailer) };
  const candidates = [];
  const signatures = new Set();
  const addCandidate = (candidate) => {
    if (!candidate || candidate.placed.length !== base.length) return;
    const normalized = {
      ...candidate,
      placed: candidate.placed.map((item) => ({ ...item }))
    };
    const signature = layoutSignature(normalized.placed);
    if (signatures.has(signature)) return;
    signatures.add(signature);
    normalized.score = layoutScoreTuple(normalized.placed, trailer, gap);
    candidates.push(normalized);
  };
  addCandidate(fallback);
  const dynamicRows = dynamicRowsRepack(base, trailer, allowRotate, gap, "CP-SAT + dynamiczne rzedy pelnej szerokosci");
  addCandidate(dynamicRows);
  for (const order of orders) {
    for (const candidate of [
      skylineRepack(order.items, trailer, allowRotate, gap, `${order.label} skyline`),
      maxRectsRepack(order.items, trailer, allowRotate, gap, `${order.label} max-rects`)
    ]) {
      addCandidate(candidate);
    }
  }
  if (candidates.length === 0) addCandidate(fallback);
  candidates.sort((a, b) => compareTuple(a.score, b.score));
  const best = candidates[0] || fallback;

  let selected = best;
  if (variantSeed > 0 && candidates.length > 1) {
    const bestUsedLength = usedPackLength(best.placed);
    const bestPocketPenalty = layoutPocketPenalty(best.placed, trailer);
    let variantPool = candidates.filter((candidate) => {
      const candidateUsedLength = usedPackLength(candidate.placed);
      const candidatePocketPenalty = layoutPocketPenalty(candidate.placed, trailer);
      return (
        candidate.placed.length === best.placed.length &&
        candidateUsedLength <= bestUsedLength + 1200 &&
        candidatePocketPenalty <= bestPocketPenalty + trailer.width * 1200
      );
    });
    if (variantPool.length < 2) variantPool = candidates.slice(0, Math.min(6, candidates.length));
    selected = variantPool[variantSeed % variantPool.length] || best;
  }

  const selectedPlan = selected || best;
  selectedPlan.placed.sort((a, b) => a.x - b.x || a.y - b.y);
  return selectedPlan;
}

function buildTrailerSummary(trailerPlaced, trailer, trailerIndex, strategyLabel, method) {
  const normalized = trailerPlaced.map((item) => ({ ...item, trailerIndex }));
  normalized.sort((a, b) => a.x - b.x || a.y - b.y);
  const usedLen = normalized.reduce((max, item) => Math.max(max, item.x + item.length), 0);
  const usedWid = normalized.reduce((max, item) => Math.max(max, item.y + item.width), 0);
  const packUsedLen = normalized.reduce((max, item) => Math.max(max, item.x + item.packLength), 0);
  const packUsedWid = normalized.reduce((max, item) => Math.max(max, item.y + item.packWidth), 0);
  const placedArea = normalized.reduce((sum, item) => sum + item.area, 0);
  return {
    index: trailerIndex,
    placed: normalized,
    usedLength: usedLen,
    usedWidth: usedWid,
    packUsedLength: packUsedLen,
    packUsedWidth: packUsedWid,
    fill: placedArea / Math.max(1, trailer.length * trailer.width),
    placedArea,
    strategyLabel,
    method
  };
}

function linearSum(terms) {
  if (terms.length === 0) return 0;
  let expr = toExpr(terms[0]);
  for (let i = 1; i < terms.length; i++) expr = expr.plus(toExpr(terms[i]));
  return expr;
}

function toExpr(value) {
  if (value && typeof value.toLinearExpr === "function") return value.toLinearExpr();
  return value;
}

function literalIndex(literal) {
  return typeof literal === "number" ? literal : literal.index;
}

function addOptionalInterval(model, start, size, end, presenceLiteral, name) {
  const constraint = model.addConstraintProto();
  constraint.name = name;
  constraint.enforcementLiteral = [literalIndex(presenceLiteral)];
  constraint.constraint = {
    case: "interval",
    value: create(IntervalConstraintProtoSchema, {
      start: toLinearExpr(start).toProto(),
      size: toLinearExpr(size).toProto(),
      end: toLinearExpr(end).toProto()
    })
  };
  return model.toProto().constraints.length - 1;
}

function addNoOverlap2D(model, xIntervals, yIntervals, name) {
  const constraint = model.addConstraintProto();
  constraint.name = name;
  constraint.constraint = {
    case: "noOverlap2d",
    value: create(NoOverlap2DConstraintProtoSchema, {
      xIntervals,
      yIntervals
    })
  };
  return constraint;
}

function addSolutionHint(model, assignments) {
  const vars = [];
  const values = [];
  const seen = new Set();
  for (const [variable, value] of assignments) {
    if (!variable || typeof variable.index !== "number" || !Number.isFinite(value)) continue;
    if (seen.has(variable.index)) continue;
    seen.add(variable.index);
    vars.push(variable.index);
    values.push(BigInt(Math.round(value)));
  }
  if (vars.length === 0) return;
  model.toProto().solutionHint = create(PartialVariableAssignmentSchema, {
    vars,
    values
  });
}

function exactlyOne(model, bools) {
  model.add(linearSum(bools).equals(1));
}

function atMostOne(model, bools) {
  if (bools.length > 0) model.add(linearSum(bools).le(1));
}

function buildPackLengthExpr(item, rot) {
  if (!rot) return item.packLength;
  return rot.times(item.packWidth - item.packLength).plus(item.packLength);
}

function buildPackWidthExpr(item, rot) {
  if (!rot) return item.packWidth;
  return rot.times(item.packLength - item.packWidth).plus(item.packWidth);
}

function solveCpSatLayout(solver, payload, requestId) {
  const startedAt = nowMs();
  const trailer = {
    length: Math.floor(clampNumber(payload.trailer?.length, 1, 13620)),
    width: Math.floor(clampNumber(payload.trailer?.width, 1, 2480))
  };
  const gap = Math.floor(clampNumber(payload.gap, 0, 0));
  const allowRotate = payload.allowRotate !== false;
  const layoutVariant = Math.max(0, Math.floor(payload.layoutVariant || 0));
  const expandedItems = expandItems(payload.rows || [], gap);
  const items = orderItemsForVariant(expandedItems, layoutVariant, payload.inputSeed || 1);
  const totalArea = items.reduce((sum, item) => sum + item.packArea, 0);
  const lowerBound = Math.max(1, Math.ceil(totalArea / Math.max(1, trailer.length * trailer.width)));
  const warmStart = greedyWarmStart(items, trailer, allowRotate);
  const upperBound = warmStart ? warmStart.count : greedyUpperBound(items, trailer, allowRotate);
  if (!upperBound) throw new Error("Co najmniej jedna paleta nie miesci sie na naczepie w zadnej orientacji.");

  progress(requestId, "cpsatRange", { count: items.length, lower: lowerBound, upper: upperBound });

  const model = new CpModel("pallet_2d_bin_packing");
  const x = [];
  const y = [];
  const xEnd = [];
  const yEnd = [];
  const rot = [];
  const packLength = [];
  const packWidth = [];
  const actualLength = [];
  const actualWidth = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const orientations = getOrientations(item, trailer, allowRotate);
    if (orientations.length === 0) {
      throw new Error(`${item.name} jest wieksza niz naczepa.`);
    }
    x[i] = model.newIntVar(0, trailer.length, `x_${i}`);
    y[i] = model.newIntVar(0, trailer.width, `y_${i}`);
    const canRotate = orientations.some((orient) => orient.rotated);
    rot[i] = canRotate ? model.newBoolVar(`rot_${i}`) : null;
    if (!canRotate && allowRotate && item.length !== item.width) {
      const only = orientations[0];
      if (only.rotated) {
        rot[i] = model.newConstant(1);
      }
    }
    packLength[i] = buildPackLengthExpr(item, rot[i]);
    packWidth[i] = buildPackWidthExpr(item, rot[i]);
    actualLength[i] = rot[i] ? rot[i].times(item.width - item.length).plus(item.length) : item.length;
    actualWidth[i] = rot[i] ? rot[i].times(item.length - item.width).plus(item.width) : item.width;
    xEnd[i] = model.newIntVar(0, trailer.length, `x_end_${i}`);
    yEnd[i] = model.newIntVar(0, trailer.width, `y_end_${i}`);
    model.add(xEnd[i].equals(x[i].plus(packLength[i])));
    model.add(yEnd[i].equals(y[i].plus(packWidth[i])));
  }

  const used = [];
  const usedLength = [];
  const usedWidth = [];
  const assign = [];
  const xIntervalsByBin = [];
  const yIntervalsByBin = [];
  for (let k = 0; k < upperBound; k++) {
    used[k] = model.newBoolVar(`used_${k}`);
    usedLength[k] = model.newIntVar(0, trailer.length, `used_len_${k}`);
    usedWidth[k] = model.newIntVar(0, trailer.width, `used_wid_${k}`);
    xIntervalsByBin[k] = [];
    yIntervalsByBin[k] = [];
    model.add(usedLength[k].le(used[k].times(trailer.length)));
    model.add(usedWidth[k].le(used[k].times(trailer.width)));
    if (k > 0) model.add(used[k].le(used[k - 1]));
  }

  for (let i = 0; i < items.length; i++) {
    assign[i] = [];
    for (let k = 0; k < upperBound; k++) {
      assign[i][k] = model.newBoolVar(`a_${i}_${k}`);
      model.add(assign[i][k].le(used[k]));
      model.add(usedLength[k].ge(xEnd[i])).onlyEnforceIf(assign[i][k]);
      model.add(usedWidth[k].ge(yEnd[i])).onlyEnforceIf(assign[i][k]);
      xIntervalsByBin[k].push(addOptionalInterval(
        model,
        x[i],
        packLength[i],
        xEnd[i],
        assign[i][k],
        `x_interval_${i}_${k}`
      ));
      yIntervalsByBin[k].push(addOptionalInterval(
        model,
        y[i],
        packWidth[i],
        yEnd[i],
        assign[i][k],
        `y_interval_${i}_${k}`
      ));
    }
    exactlyOne(model, assign[i]);
  }

  for (let k = 0; k < upperBound; k++) {
    addNoOverlap2D(model, xIntervalsByBin[k], yIntervalsByBin[k], `no_overlap_2d_${k}`);
  }

  if (warmStart) {
    const hints = [];
    for (let k = 0; k < upperBound; k++) {
      const bin = warmStart.bins[k];
      const binPlacements = bin?.placements || [];
      const hintUsedLength = binPlacements.reduce((max, entry) =>
        Math.max(max, entry.placement.x + entry.placement.packLength), 0);
      const hintUsedWidth = binPlacements.reduce((max, entry) =>
        Math.max(max, entry.placement.y + entry.placement.packWidth), 0);
      hints.push([used[k], binPlacements.length > 0 ? 1 : 0]);
      hints.push([usedLength[k], hintUsedLength]);
      hints.push([usedWidth[k], hintUsedWidth]);
    }

    for (let i = 0; i < items.length; i++) {
      const placement = warmStart.placements.get(items[i].id);
      if (!placement) continue;
      hints.push([x[i], placement.x]);
      hints.push([y[i], placement.y]);
      hints.push([xEnd[i], placement.x + placement.packLength]);
      hints.push([yEnd[i], placement.y + placement.packWidth]);
      if (rot[i]) hints.push([rot[i], placement.rotated ? 1 : 0]);
      for (let k = 0; k < upperBound; k++) {
        hints.push([assign[i][k], placement.binIndex === k ? 1 : 0]);
      }
    }
    addSolutionHint(model, hints);
  }

  const variantPositionWeights = items.map((item, index) => {
    if (layoutVariant <= 0) return { x: 4, y: 2 };
    const hash = variantHash(layoutVariant, payload.inputSeed || 1, item.id, index);
    return {
      x: 1 + (hash % 7),
      y: 1 + ((hash >>> 8) % 5)
    };
  });
  const maxXWeight = variantPositionWeights.reduce((max, weight) => Math.max(max, weight.x), 0);
  const maxYWeight = variantPositionWeights.reduce((max, weight) => Math.max(max, weight.y), 0);
  const compactBound =
    items.length * (trailer.length * maxXWeight + trailer.width * maxYWeight) +
    upperBound * trailer.width +
    1;
  const lengthWeight = compactBound + 1;
  const trailerWeight = upperBound * trailer.length * lengthWeight + compactBound + 1;
  const objectiveTerms = [
    ...used.map((varItem) => varItem.times(trailerWeight)),
    ...usedLength.map((varItem) => varItem.times(lengthWeight)),
    ...usedWidth,
    ...x.map((varItem, index) => varItem.times(variantPositionWeights[index].x)),
    ...y.map((varItem, index) => varItem.times(variantPositionWeights[index].y))
  ];
  model.minimize(linearSum(objectiveTerms));

  const maxTimeInSeconds = Math.max(1, Math.floor(clampNumber(payload.maxTimeSeconds, 1, 180)));
  progress(requestId, "cpsatOptimizing", { seconds: maxTimeInSeconds });
  const result = solver.solve(model, {
    maxTimeInSeconds,
    numWorkers: 1
  });

  if (result.status !== CpSolverStatus.OPTIMAL && result.status !== CpSolverStatus.FEASIBLE) {
    const detail = result.response?.solutionInfo ? ` ${result.response.solutionInfo}` : "";
    throw new Error(`OR-Tools CP-SAT nie znalazl rozwiazania. Status: ${statusName(result.status)}.${detail}`);
  }

  const placed = [];
  const trailers = [];
  for (let k = 0; k < upperBound; k++) {
    if (result.value(used[k]) !== 1) continue;
    const trailerPlaced = [];
    for (let i = 0; i < items.length; i++) {
      if (result.value(assign[i][k]) !== 1) continue;
      const item = items[i];
      const rotated = rot[i] ? result.value(rot[i]) === 1 : false;
      const packL = rotated ? item.packWidth : item.packLength;
      const packW = rotated ? item.packLength : item.packWidth;
      const actualL = rotated ? item.width : item.length;
      const actualW = rotated ? item.length : item.width;
      const placedItem = {
        id: item.id,
        rowId: item.rowId,
        itemIndex: item.itemIndex,
        name: item.name,
        color: item.color,
        x: result.value(x[i]),
        y: result.value(y[i]),
        packLength: packL,
        packWidth: packW,
        length: actualL,
        width: actualW,
        originalLength: item.length,
        originalWidth: item.width,
        rotated,
        area: actualL * actualW,
        trailerIndex: trailers.length + 1
      };
      trailerPlaced.push(placedItem);
    }
    trailerPlaced.sort((a, b) => a.x - b.x || a.y - b.y);
    const trailerIndex = trailers.length + 1;
    const repackVariantSeed = layoutVariant > 0 ? layoutVariant + trailerIndex * 997 : 0;
    const repacked = repackTrailerLayout(trailerPlaced, trailer, allowRotate, gap, repackVariantSeed);
    const strategyLabel = result.status === CpSolverStatus.OPTIMAL
      ? `OR-Tools CP-SAT exact, ${repacked.label}`
      : `OR-Tools CP-SAT feasible, ${repacked.label}`;
    const trailerSummary = buildTrailerSummary(
      repacked.placed,
      trailer,
      trailerIndex,
      strategyLabel,
      "WASM CP-SAT NoOverlap2D + dynamic rows/max-rects"
    );
    trailers.push(trailerSummary);
    placed.push(...trailerSummary.placed);
  }

  const placedArea = placed.reduce((sum, item) => sum + item.area, 0);
  const totalUsedLength = trailers.reduce((sum, trailerPlan) => sum + trailerPlan.usedLength, 0);
  const trailerArea = trailer.length * trailer.width;
  const trailerCount = trailers.length;

  return {
    placed,
    unplaced: [],
    trailers,
    trailerCount,
    placedArea,
    usedLength: totalUsedLength,
    maxUsedLength: Math.max(0, ...trailers.map((item) => item.usedLength)),
    usedWidth: Math.max(0, ...trailers.map((item) => item.usedWidth)),
    packUsedLength: Math.max(0, ...trailers.map((item) => item.packUsedLength)),
    packUsedWidth: Math.max(0, ...trailers.map((item) => item.packUsedWidth)),
    trailerArea,
    trailerWidth: trailer.width,
    fill: trailerCount > 0 ? placedArea / (trailerArea * trailerCount) : 0,
    freeArea: Math.max(0, trailerArea * trailerCount - placedArea),
    strategyLabel: result.status === CpSolverStatus.OPTIMAL
      ? "OR-Tools CP-SAT exact + repack"
      : "OR-Tools CP-SAT feasible + repack",
    method: "WASM CP-SAT NoOverlap2D + dynamic rows/max-rects",
    candidateCount: model.toProto().constraints.length,
    variantCount: model.toProto().variables.length,
    layoutVariant,
    searchQuality: "deep",
    searchElapsedMs: nowMs() - startedAt,
    status: statusName(result.status),
    objectiveValue: result.objectiveValue,
    bestObjectiveBound: result.bestObjectiveBound,
    solverWallTime: result.wallTime,
    lowerBound,
    upperBound
  };
}

function statusName(status) {
  if (status === CpSolverStatus.OPTIMAL) return "OPTIMAL";
  if (status === CpSolverStatus.FEASIBLE) return "FEASIBLE";
  if (status === CpSolverStatus.INFEASIBLE) return "INFEASIBLE";
  if (status === CpSolverStatus.MODEL_INVALID) return "MODEL_INVALID";
  return "UNKNOWN";
}

function nowMs() {
  return typeof performance !== "undefined" && performance.now ? performance.now() : Date.now();
}
