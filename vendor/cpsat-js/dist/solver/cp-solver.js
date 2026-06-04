import { create, toBinary, fromBinary } from '../../../@bufbuild/protobuf/dist/esm/index.js';
import { CpModelProtoSchema, CpSolverResponseSchema, CpSolverStatus, } from '../generated/cp_model_pb.js';
import { SatParametersSchema, } from '../generated/sat_parameters_pb.js';
export { CpSolverStatus };
/**
 * Loads the WASM module and solves CP-SAT models.
 *
 * Usage:
 *   const solver = await CpSolver.create();
 *   const result = solver.solve(model);
 */
export class CpSolver {
    module;
    constructor(module) {
        this.module = module;
    }
    static async create(options) {
        // Dynamic import of the Emscripten-generated JS glue
        const createModule = await loadWasmFactory(options?.locateFile);
        const module = await createModule();
        return new CpSolver(module);
    }
    solve(model, params) {
        const modelProto = model.toProto();
        const modelBytes = toBinary(CpModelProtoSchema, modelProto);
        const satParams = create(SatParametersSchema, {});
        // Force single worker for WASM (no threading support in MVP)
        satParams.numWorkers = 1;
        if (params?.maxTimeInSeconds !== undefined) {
            satParams.maxTimeInSeconds = params.maxTimeInSeconds;
        }
        if (params?.numWorkers !== undefined) {
            satParams.numWorkers = params.numWorkers;
        }
        const paramsBytes = toBinary(SatParametersSchema, satParams);
        // Allocate WASM heap memory for model
        const modelPtr = this.module._malloc(modelBytes.length);
        this.module.HEAPU8.set(modelBytes, modelPtr);
        // Allocate WASM heap memory for params
        const paramsPtr = this.module._malloc(paramsBytes.length);
        this.module.HEAPU8.set(paramsBytes, paramsPtr);
        let resultLen;
        try {
            resultLen = this.module._solve(modelPtr, modelBytes.length, paramsPtr, paramsBytes.length);
        }
        finally {
            this.module._free(modelPtr);
            this.module._free(paramsPtr);
        }
        // Read result from WASM memory
        const resultPtr = this.module._get_result_ptr();
        const resultBytes = new Uint8Array(this.module.HEAPU8.buffer, resultPtr, resultLen);
        // Copy before freeing
        const resultCopy = new Uint8Array(resultBytes);
        this.module._free_result();
        const response = fromBinary(CpSolverResponseSchema, resultCopy);
        return {
            status: response.status,
            objectiveValue: response.objectiveValue,
            bestObjectiveBound: response.bestObjectiveBound,
            wallTime: response.wallTime,
            value(variable) {
                return Number(response.solution[variable.index]);
            },
            response,
        };
    }
}
async function loadWasmFactory(locateFile) {
    const wasmUrl = new URL('../../build/cpsat.wasm', import.meta.url).href;
    // @ts-expect-error Emscripten-generated ESM glue; no TS declarations.
    const glue = await import('../../build/cpsat.mjs');
    const factory = glue.default;
    if (typeof factory !== 'function') {
        throw new Error('cpsat glue did not export a factory function');
    }
    const resolvedLocate = locateFile ?? ((path) => (path.endsWith('.wasm') ? wasmUrl : path));
    return (options) => factory({ ...options, locateFile: resolvedLocate });
}
//# sourceMappingURL=cp-solver.js.map