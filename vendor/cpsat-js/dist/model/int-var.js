import { LinearExpr, BoundedLinearExpression, toLinearExpr } from './linear-expr.js';
const INT_VAR_MIN = -(2 ** 52);
const INT_VAR_MAX = 2 ** 52;
/**
 * Represents an integer variable in a CP-SAT model.
 * Wraps a variable index and provides expression-building methods.
 */
export class IntVar {
    index;
    name;
    constructor(index, name) {
        this.index = index;
        this.name = name;
    }
    toLinearExpr() {
        return LinearExpr.fromVarIndex(this.index);
    }
    plus(other) {
        return this.toLinearExpr().plus(toLinearExpr(other));
    }
    minus(other) {
        return this.toLinearExpr().minus(toLinearExpr(other));
    }
    times(scalar) {
        return this.toLinearExpr().times(scalar);
    }
    negate() {
        return this.toLinearExpr().negate();
    }
    /** expr == other */
    equals(other) {
        const lhs = this.toLinearExpr();
        const rhs = toLinearExpr(other);
        const diff = lhs.minus(rhs);
        return new BoundedLinearExpression(diff, 0n, 0n);
    }
    /** expr != other — encoded as domain with hole at 0 */
    notEquals(other) {
        const lhs = this.toLinearExpr();
        const rhs = toLinearExpr(other);
        const diff = lhs.minus(rhs);
        // CP-SAT encodes != via domain: [INT_MIN, -1] U [1, INT_MAX]
        // We'll handle this specially in CpModel.add()
        return new BoundedLinearExpression(diff, BigInt(INT_VAR_MIN), BigInt(INT_VAR_MAX));
    }
    /** expr <= other */
    le(other) {
        const lhs = this.toLinearExpr();
        const rhs = toLinearExpr(other);
        const diff = lhs.minus(rhs);
        return new BoundedLinearExpression(diff, BigInt(INT_VAR_MIN), 0n);
    }
    /** expr >= other */
    ge(other) {
        const lhs = this.toLinearExpr();
        const rhs = toLinearExpr(other);
        const diff = lhs.minus(rhs);
        return new BoundedLinearExpression(diff, 0n, BigInt(INT_VAR_MAX));
    }
    /** expr < other */
    lt(other) {
        const lhs = this.toLinearExpr();
        const rhs = toLinearExpr(other);
        const diff = lhs.minus(rhs);
        return new BoundedLinearExpression(diff, BigInt(INT_VAR_MIN), -1n);
    }
    /** expr > other */
    gt(other) {
        const lhs = this.toLinearExpr();
        const rhs = toLinearExpr(other);
        const diff = lhs.minus(rhs);
        return new BoundedLinearExpression(diff, 1n, BigInt(INT_VAR_MAX));
    }
    /** Negative literal: NOT this variable (for boolean context) */
    not() {
        return -this.index - 1;
    }
}
/**
 * A boolean variable (integer variable with domain [0, 1]).
 */
export class BoolVar extends IntVar {
    constructor(index, name) {
        super(index, name);
    }
}
//# sourceMappingURL=int-var.js.map