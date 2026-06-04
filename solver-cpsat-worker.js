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
  const assign = [];
  for (let k = 0; k < upperBound; k++) {
    used[k] = model.newBoolVar(`used_${k}`);
    usedLength[k] = model.newIntVar(0, trailer.length, `used_len_${k}`);
    model.add(usedLength[k].le(used[k].times(trailer.length)));
    if (k > 0) model.add(used[k].le(used[k - 1]));
  }

  for (let i = 0; i < items.length; i++) {
    assign[i] = [];
    for (let k = 0; k < upperBound; k++) {
      assign[i][k] = model.newBoolVar(`a_${i}_${k}`);
      model.add(assign[i][k].le(used[k]));
      model.add(usedLength[k].ge(x[i].plus(packLength[i]))).onlyEnforceIf(assign[i][k]);
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

  const trailerWeight = trailer.length * items.length + trailer.length + 1;
  const objectiveTerms = [
    ...used.map((varItem) => varItem.times(trailerWeight)),
    ...usedLength
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
    for (const item of trailerPlaced) item.trailerIndex = trailerIndex;
    const usedLen = trailerPlaced.reduce((max, item) => Math.max(max, item.x + item.length), 0);
    const usedWid = trailerPlaced.reduce((max, item) => Math.max(max, item.y + item.width), 0);
    const packUsedLen = trailerPlaced.reduce((max, item) => Math.max(max, item.x + item.packLength), 0);
    const packUsedWid = trailerPlaced.reduce((max, item) => Math.max(max, item.y + item.packWidth), 0);
    const placedArea = trailerPlaced.reduce((sum, item) => sum + item.area, 0);
    trailers.push({
      index: trailerIndex,
      placed: trailerPlaced,
      usedLength: usedLen,
      usedWidth: usedWid,
      packUsedLength: packUsedLen,
      packUsedWidth: packUsedWid,
      fill: placedArea / Math.max(1, trailer.length * trailer.width),
      placedArea,
      strategyLabel: result.status === CpSolverStatus.OPTIMAL ? "OR-Tools CP-SAT exact" : "OR-Tools CP-SAT feasible",
      method: "WASM CP-SAT"
    });
    placed.push(...trailerPlaced);
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
    strategyLabel: result.status === CpSolverStatus.OPTIMAL ? "OR-Tools CP-SAT exact" : "OR-Tools CP-SAT feasible",
    method: "WASM CP-SAT",
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
