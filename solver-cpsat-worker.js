import { CpModel, CpSolver, CpSolverStatus } from "./vendor/cpsat-js/dist/index.js";

let cachedSolver = null;

self.onmessage = async (event) => {
  const { requestId, payload } = event.data || {};
  if (!requestId || !payload) return;

  try {
    progress(requestId, "Ladowanie silnika OR-Tools CP-SAT...");
    const solver = await getSolver();
    progress(requestId, "Budowanie modelu exact 2D...");
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

function progress(requestId, message, detail = "") {
  self.postMessage({ type: "progress", requestId, message, detail });
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
    for (const other of placed) {
      if (other === item) continue;
      if (other.x <= rightEdge) continue;
      const overlap = overlapAmount(item.y, item.packWidth, other.y, other.packWidth);
      if (overlap > 0) {
        staggerWaste += (other.x - rightEdge) * overlap;
        break;
      }
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
  const pairScore = preferredPairScore(placed, trailer, gap);
  return [-pairScore, packUsedLength, pocketPenalty, packUsedWidth, sumX, sumY, -contact, placed.length];
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

function maxRectsTailPack(initialPlaced, remaining, trailer, allowRotate, gap, startX) {
  if (remaining.length === 0) return initialPlaced.map((item) => ({ ...item }));
  const tail = {
    length: Math.max(0, trailer.length - startX),
    width: trailer.width
  };
  if (tail.length <= 0) return null;

  const orders = [
    remaining.slice().sort((a, b) =>
      b.packLength * b.packWidth - a.packLength * a.packWidth ||
      b.packLength - a.packLength ||
      b.packWidth - a.packWidth ||
      a.itemIndex - b.itemIndex
    ),
    remaining.slice().sort((a, b) =>
      b.packLength - a.packLength ||
      b.packWidth - a.packWidth ||
      b.packLength * b.packWidth - a.packLength * a.packWidth ||
      a.itemIndex - b.itemIndex
    ),
    remaining.slice().sort((a, b) =>
      b.packWidth - a.packWidth ||
      b.packLength - a.packLength ||
      b.packLength * b.packWidth - a.packLength * a.packWidth ||
      a.itemIndex - b.itemIndex
    ),
    roundRobinOrder(remaining)
  ];

  let best = null;
  let bestScore = null;
  for (const ordered of orders) {
    const bin = new MaxRectsBin(tail.length, tail.width);
    const tailPlaced = [];
    let failed = false;
    for (const source of ordered) {
      const item = {
        ...source,
        length: source.originalLength || source.length,
        width: source.originalWidth || source.width,
        packLength: (source.originalLength || source.length) + gap,
        packWidth: (source.originalWidth || source.width) + gap
      };
      const node = bin.insert(item, allowRotate);
      if (!node) {
        failed = true;
        break;
      }
      tailPlaced.push(placedFromSource(source, {
        rotated: node.orient.rotated,
        packLength: node.orient.packLength,
        packWidth: node.orient.packWidth,
        length: node.orient.actualLength,
        width: node.orient.actualWidth
      }, startX + node.x, node.y));
    }
    if (failed) continue;
    const candidate = [
      ...initialPlaced.map((item) => ({ ...item })),
      ...tailPlaced
    ].sort((a, b) => a.x - b.x || a.y - b.y);
    const score = layoutScoreTuple(candidate, trailer, gap);
    if (!best || compareTuple(score, bestScore) < 0) {
      best = candidate;
      bestScore = score;
    }
  }
  return best;
}

function originalSides(source) {
  return [
    source.originalLength || source.length,
    source.originalWidth || source.width
  ].sort((a, b) => a - b);
}

function footprintMatches(source, sideA, sideB) {
  const sides = originalSides(source);
  const expected = [sideA, sideB].sort((a, b) => a - b);
  return Math.abs(sides[0] - expected[0]) <= 2 && Math.abs(sides[1] - expected[1]) <= 2;
}

function orientationForPack(source, trailer, allowRotate, gap, targetLength, targetWidth) {
  return placedOrientations(source, trailer, allowRotate, gap).find((orient) =>
    Math.abs(orient.packLength - targetLength) <= 2 &&
    Math.abs(orient.packWidth - targetWidth) <= 2
  ) || null;
}

function placeRemainingSkyline(initialPlaced, remaining, trailer, allowRotate, gap, compact = true) {
  const placed = initialPlaced.map((item) => ({ ...item }));
  for (const source of remaining) {
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
  return compact ? compactPlacedItems(placed, trailer) : placed.sort((a, b) => a.x - b.x || a.y - b.y);
}

function preferredPairRowsRepack(sources, trailer, allowRotate, gap, label) {
  const wide115 = sources
    .filter((item) => footprintMatches(item, 1150, 1700))
    .sort((a, b) => a.x - b.x || a.y - b.y || a.itemIndex - b.itemIndex);
  const narrow75 = sources
    .filter((item) => footprintMatches(item, 750, 1050))
    .sort((a, b) => a.x - b.x || a.y - b.y || a.itemIndex - b.itemIndex);
  const pairCount = Math.min(wide115.length, narrow75.length);
  if (pairCount === 0) return null;

  const pairWideOrient = orientationForPack(wide115[0], trailer, allowRotate, gap, 1150 + gap, 1700 + gap);
  const pairNarrowOrient = orientationForPack(narrow75[0], trailer, allowRotate, gap, 1050 + gap, 750 + gap);
  if (!pairWideOrient || !pairNarrowOrient) return null;
  if (pairWideOrient.packWidth + pairNarrowOrient.packWidth > trailer.width) return null;

  const usedIds = new Set();
  const placed = [];
  let cursorX = 0;
  for (let i = 0; i < pairCount; i++) {
    const wide = wide115[i];
    const narrow = narrow75[i];
    const rowLength = Math.max(pairWideOrient.packLength, pairNarrowOrient.packLength);
    if (cursorX + rowLength > trailer.length) return null;
    placed.push(placedFromSource(wide, pairWideOrient, cursorX, 0));
    placed.push(placedFromSource(narrow, pairNarrowOrient, cursorX, pairWideOrient.packWidth));
    usedIds.add(wide.id);
    usedIds.add(narrow.id);
    cursorX += rowLength;
  }

  const remaining = sources
    .filter((item) => !usedIds.has(item.id))
    .sort((a, b) =>
      b.packLength * b.packWidth - a.packLength * a.packWidth ||
      b.packLength - a.packLength ||
      b.packWidth - a.packWidth ||
      a.itemIndex - b.itemIndex
    );
  const completed =
    maxRectsTailPack(placed, remaining, trailer, allowRotate, gap, cursorX) ||
    placeRemainingSkyline(placed, remaining, trailer, allowRotate, gap, false);
  if (!completed) return null;
  return {
    label,
    placed: completed
  };
}

function preferredPairScore(placed, trailer, gap) {
  const wide = placed.filter((item) =>
    footprintMatches(item, 1150, 1700) &&
    Math.abs(item.packLength - (1150 + gap)) <= 2 &&
    Math.abs(item.packWidth - (1700 + gap)) <= 2
  );
  const narrow = placed.filter((item) =>
    footprintMatches(item, 750, 1050) &&
    Math.abs(item.packLength - (1050 + gap)) <= 2 &&
    Math.abs(item.packWidth - (750 + gap)) <= 2
  );
  let score = 0;
  const used = new Set();
  for (const big of wide) {
    let best = null;
    for (const small of narrow) {
      if (used.has(small.id)) continue;
      const adjacentRight = Math.abs(big.y + big.packWidth - small.y) <= 2;
      const adjacentLeft = Math.abs(small.y + small.packWidth - big.y) <= 2;
      if (!adjacentRight && !adjacentLeft) continue;
      const combinedWidth = Math.max(big.y + big.packWidth, small.y + small.packWidth) - Math.min(big.y, small.y);
      if (combinedWidth > trailer.width) continue;
      const overlap = overlapAmount(big.x, big.packLength, small.x, small.packLength);
      if (overlap < Math.min(big.packLength, small.packLength) * 0.8) continue;
      const candidateScore = overlap + (trailer.width - combinedWidth <= 20 ? 5000 : 0);
      if (!best || candidateScore > best.score) best = { small, score: candidateScore };
    }
    if (best) {
      used.add(best.small.id);
      score += best.score;
    }
  }
  return score;
}

function repackTrailerLayout(trailerPlaced, trailer, allowRotate, gap) {
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
  let best = null;
  let bestScore = null;
  const preferredPair = preferredPairRowsRepack(base, trailer, allowRotate, gap, "CP-SAT + wzorzec 115x170 + 75x105");
  if (preferredPair) {
    best = preferredPair;
    bestScore = layoutScoreTuple(preferredPair.placed, trailer, gap);
  }
  for (const order of orders) {
    for (const candidate of [
      skylineRepack(order.items, trailer, allowRotate, gap, `${order.label} skyline`),
      maxRectsRepack(order.items, trailer, allowRotate, gap, `${order.label} max-rects`)
    ]) {
      if (!candidate) continue;
      const score = layoutScoreTuple(candidate.placed, trailer, gap);
      if (!best || compareTuple(score, bestScore) < 0) {
        best = candidate;
        bestScore = score;
      }
    }
  }
  if (!best) best = fallback;
  best.placed.sort((a, b) => a.x - b.x || a.y - b.y);
  return best;
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
  const items = expandItems(payload.rows || [], gap);
  const totalArea = items.reduce((sum, item) => sum + item.packArea, 0);
  const lowerBound = Math.max(1, Math.ceil(totalArea / Math.max(1, trailer.length * trailer.width)));
  const upperBound = greedyUpperBound(items, trailer, allowRotate);
  if (!upperBound) throw new Error("Co najmniej jedna paleta nie miesci sie na naczepie w zadnej orientacji.");

  progress(requestId, `OR-Tools CP-SAT: ${items.length} palet, naczepy ${lowerBound}-${upperBound}...`);

  const model = new CpModel("pallet_2d_bin_packing");
  const x = [];
  const y = [];
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
    model.add(x[i].plus(packLength[i]).le(trailer.length));
    model.add(y[i].plus(packWidth[i]).le(trailer.width));
  }

  const used = [];
  const usedLength = [];
  const usedWidth = [];
  const assign = [];
  for (let k = 0; k < upperBound; k++) {
    used[k] = model.newBoolVar(`used_${k}`);
    usedLength[k] = model.newIntVar(0, trailer.length, `used_len_${k}`);
    usedWidth[k] = model.newIntVar(0, trailer.width, `used_wid_${k}`);
    model.add(usedLength[k].le(used[k].times(trailer.length)));
    model.add(usedWidth[k].le(used[k].times(trailer.width)));
    if (k > 0) model.add(used[k].le(used[k - 1]));
  }

  for (let i = 0; i < items.length; i++) {
    assign[i] = [];
    for (let k = 0; k < upperBound; k++) {
      assign[i][k] = model.newBoolVar(`a_${i}_${k}`);
      model.add(assign[i][k].le(used[k]));
      model.add(usedLength[k].ge(x[i].plus(packLength[i]))).onlyEnforceIf(assign[i][k]);
      model.add(usedWidth[k].ge(y[i].plus(packWidth[i]))).onlyEnforceIf(assign[i][k]);
    }
    exactlyOne(model, assign[i]);
  }

  for (let k = 0; k < upperBound; k++) {
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const left = model.newBoolVar(`left_${i}_${j}_${k}`);
        const right = model.newBoolVar(`right_${i}_${j}_${k}`);
        const above = model.newBoolVar(`above_${i}_${j}_${k}`);
        const below = model.newBoolVar(`below_${i}_${j}_${k}`);
        model.add(x[i].plus(packLength[i]).le(x[j])).onlyEnforceIf(left);
        model.add(x[j].plus(packLength[j]).le(x[i])).onlyEnforceIf(right);
        model.add(y[i].plus(packWidth[i]).le(y[j])).onlyEnforceIf(above);
        model.add(y[j].plus(packWidth[j]).le(y[i])).onlyEnforceIf(below);
        model.addBoolOr([
          assign[i][k].not(),
          assign[j][k].not(),
          left,
          right,
          above,
          below
        ]);
        atMostOne(model, [left, right, above, below]);
      }
    }
  }

  const compactBound =
    items.length * (trailer.length * 4 + trailer.width * 2) +
    upperBound * trailer.width +
    1;
  const lengthWeight = compactBound + 1;
  const trailerWeight = upperBound * trailer.length * lengthWeight + compactBound + 1;
  const objectiveTerms = [
    ...used.map((varItem) => varItem.times(trailerWeight)),
    ...usedLength.map((varItem) => varItem.times(lengthWeight)),
    ...usedWidth,
    ...x.map((varItem) => varItem.times(4)),
    ...y.map((varItem) => varItem.times(2))
  ];
  model.minimize(linearSum(objectiveTerms));

  const maxTimeInSeconds = Math.max(1, Math.floor(clampNumber(payload.maxTimeSeconds, 1, 180)));
  progress(requestId, `OR-Tools CP-SAT: optymalizacja do ${maxTimeInSeconds}s...`);
  const result = solver.solve(model, {
    maxTimeInSeconds,
    numWorkers: 1
  });

  if (result.status !== CpSolverStatus.OPTIMAL && result.status !== CpSolverStatus.FEASIBLE) {
    throw new Error(`OR-Tools CP-SAT nie znalazl rozwiazania. Status: ${statusName(result.status)}.`);
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
    const repacked = repackTrailerLayout(trailerPlaced, trailer, allowRotate, gap);
    const strategyLabel = result.status === CpSolverStatus.OPTIMAL
      ? `OR-Tools CP-SAT exact, ${repacked.label}`
      : `OR-Tools CP-SAT feasible, ${repacked.label}`;
    const trailerSummary = buildTrailerSummary(
      repacked.placed,
      trailer,
      trailerIndex,
      strategyLabel,
      "WASM CP-SAT + skyline/max-rects"
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
    method: "WASM CP-SAT + skyline/max-rects",
    candidateCount: model.toProto().constraints.length,
    variantCount: model.toProto().variables.length,
    layoutVariant: Math.max(0, Math.floor(payload.layoutVariant || 0)),
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
