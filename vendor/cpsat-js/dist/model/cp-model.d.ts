import { type CpModelProto } from '../generated/cp_model_pb.js';
import { IntVar, BoolVar, type LinearExprLike } from './int-var.js';
import { BoundedLinearExpression } from './linear-expr.js';
import { IntervalVar } from './interval-var.js';
import { Constraint } from './constraint.js';
/**
 * Builder for a CP-SAT model. Mirrors the Python CpModel API.
 *
 * Usage:
 *   const model = new CpModel();
 *   const x = model.newIntVar(0, 10, 'x');
 *   model.maximize(x);
 */
export declare class CpModel {
    private readonly proto;
    constructor(name?: string);
    newIntVar(lb: number | bigint, ub: number | bigint, name: string): IntVar;
    newBoolVar(name: string): BoolVar;
    newConstant(value: number | bigint): IntVar;
    newIntervalVar(start: LinearExprLike, size: LinearExprLike, end: LinearExprLike, name: string): IntervalVar;
    /** Add a bounded linear constraint: lb <= expr <= ub */
    add(bounded: BoundedLinearExpression): Constraint;
    addLinearConstraint(expr: LinearExprLike, lb: number | bigint, ub: number | bigint): Constraint;
    addAllDifferent(exprs: LinearExprLike[]): Constraint;
    addBoolOr(literals: (BoolVar | IntVar | number)[]): Constraint;
    addBoolAnd(literals: (BoolVar | IntVar | number)[]): Constraint;
    addNoOverlap(intervals: IntervalVar[]): Constraint;
    addCircuit(arcs: [number, number, BoolVar | IntVar | number][]): Constraint;
    minimize(expr: LinearExprLike): void;
    maximize(expr: LinearExprLike): void;
    toProto(): CpModelProto;
    private addConstraintProto;
    private setObjective;
}
//# sourceMappingURL=cp-model.d.ts.map