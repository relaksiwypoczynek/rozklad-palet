import { LinearExpr, BoundedLinearExpression } from './linear-expr.js';
export type LinearExprLike = LinearExpr | IntVar | number | bigint;
/**
 * Represents an integer variable in a CP-SAT model.
 * Wraps a variable index and provides expression-building methods.
 */
export declare class IntVar {
    readonly index: number;
    readonly name: string;
    constructor(index: number, name: string);
    toLinearExpr(): LinearExpr;
    plus(other: LinearExprLike): LinearExpr;
    minus(other: LinearExprLike): LinearExpr;
    times(scalar: number | bigint): LinearExpr;
    negate(): LinearExpr;
    /** expr == other */
    equals(other: LinearExprLike): BoundedLinearExpression;
    /** expr != other — encoded as domain with hole at 0 */
    notEquals(other: LinearExprLike): BoundedLinearExpression;
    /** expr <= other */
    le(other: LinearExprLike): BoundedLinearExpression;
    /** expr >= other */
    ge(other: LinearExprLike): BoundedLinearExpression;
    /** expr < other */
    lt(other: LinearExprLike): BoundedLinearExpression;
    /** expr > other */
    gt(other: LinearExprLike): BoundedLinearExpression;
    /** Negative literal: NOT this variable (for boolean context) */
    not(): number;
}
/**
 * A boolean variable (integer variable with domain [0, 1]).
 */
export declare class BoolVar extends IntVar {
    constructor(index: number, name: string);
}
//# sourceMappingURL=int-var.d.ts.map