import { type LinearExpressionProto } from '../generated/cp_model_pb.js';
/**
 * Represents a linear expression: sum(coeffs[i] * vars[i]) + offset.
 * Used to build constraints and objectives in CP-SAT models.
 */
export declare class LinearExpr {
    /** Map from variable index to coefficient */
    readonly terms: ReadonlyMap<number, bigint>;
    readonly offset: bigint;
    constructor(terms: Map<number, bigint>, offset: bigint);
    static fromConstant(value: number | bigint): LinearExpr;
    static fromVarIndex(varIndex: number, coeff?: bigint): LinearExpr;
    plus(other: LinearExpr | number | bigint): LinearExpr;
    minus(other: LinearExpr | number | bigint): LinearExpr;
    times(scalar: number | bigint): LinearExpr;
    negate(): LinearExpr;
    /** expr == value */
    equals(other: LinearExpr | number | bigint): BoundedLinearExpression;
    /** expr <= value */
    le(other: LinearExpr | number | bigint): BoundedLinearExpression;
    /** expr >= value */
    ge(other: LinearExpr | number | bigint): BoundedLinearExpression;
    /** expr < value */
    lt(other: LinearExpr | number | bigint): BoundedLinearExpression;
    /** expr > value */
    gt(other: LinearExpr | number | bigint): BoundedLinearExpression;
    toProto(): LinearExpressionProto;
}
/**
 * Represents a bounded linear expression: lb <= expr <= ub.
 * Created by comparison methods on LinearExpr/IntVar.
 */
export declare class BoundedLinearExpression {
    readonly expr: LinearExpr;
    readonly lb: bigint;
    readonly ub: bigint;
    constructor(expr: LinearExpr, lb: bigint, ub: bigint);
}
/** Helper to convert something that could be LinearExpr, number, or has toLinearExpr() */
export declare function toLinearExpr(value: LinearExpr | number | bigint | {
    toLinearExpr(): LinearExpr;
}): LinearExpr;
//# sourceMappingURL=linear-expr.d.ts.map