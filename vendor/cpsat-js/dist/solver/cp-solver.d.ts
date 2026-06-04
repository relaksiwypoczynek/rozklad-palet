import { CpSolverStatus, type CpSolverResponse } from '../generated/cp_model_pb.js';
import type { CpModel } from '../model/cp-model.js';
import type { IntVar } from '../model/int-var.js';
export { CpSolverStatus };
export interface CpSolverOptions {
    /** Custom path resolver for the WASM binary */
    locateFile?: (path: string) => string;
}
export interface SolverParams {
    maxTimeInSeconds?: number;
    numWorkers?: number;
}
export interface CpSolverResult {
    status: CpSolverStatus;
    objectiveValue: number;
    bestObjectiveBound: number;
    wallTime: number;
    /** Get the value of a variable in the solution */
    value(variable: IntVar): number;
    /** Raw response proto */
    response: CpSolverResponse;
}
/**
 * Loads the WASM module and solves CP-SAT models.
 *
 * Usage:
 *   const solver = await CpSolver.create();
 *   const result = solver.solve(model);
 */
export declare class CpSolver {
    private module;
    private constructor();
    static create(options?: CpSolverOptions): Promise<CpSolver>;
    solve(model: CpModel, params?: SolverParams): CpSolverResult;
}
//# sourceMappingURL=cp-solver.d.ts.map