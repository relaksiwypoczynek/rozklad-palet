import { create } from '../../../@bufbuild/protobuf/dist/esm/index.js';
import { LinearExpressionProtoSchema, } from '../generated/cp_model_pb.js';
/**
 * Represents a linear expression: sum(coeffs[i] * vars[i]) + offset.
 * Used to build constraints and objectives in CP-SAT models.
 */
export class LinearExpr {
    /** Map from variable index to coefficient */
    terms;
    offset;
    constructor(terms, offset) {
        this.terms = terms;
        this.offset = offset;
    }
    static fromConstant(value) {
        return new LinearExpr(new Map(), BigInt(value));
    }
    static fromVarIndex(varIndex, coeff = 1n) {
        return new LinearExpr(new Map([[varIndex, coeff]]), 0n);
    }
    plus(other) {
        if (typeof other === 'number' || typeof other === 'bigint') {
            return new LinearExpr(new Map(this.terms), this.offset + BigInt(other));
        }
        const newTerms = new Map(this.terms);
        for (const [varIdx, coeff] of other.terms) {
            const existing = newTerms.get(varIdx) ?? 0n;
            const sum = existing + coeff;
            if (sum === 0n) {
                newTerms.delete(varIdx);
            }
            else {
                newTerms.set(varIdx, sum);
            }
        }
        return new LinearExpr(newTerms, this.offset + other.offset);
    }
    minus(other) {
        if (typeof other === 'number' || typeof other === 'bigint') {
            return new LinearExpr(new Map(this.terms), this.offset - BigInt(other));
        }
        return this.plus(other.times(-1));
    }
    times(scalar) {
        const s = BigInt(scalar);
        if (s === 0n) {
            return LinearExpr.fromConstant(0);
        }
        const newTerms = new Map();
        for (const [varIdx, coeff] of this.terms) {
            newTerms.set(varIdx, coeff * s);
        }
        return new LinearExpr(newTerms, this.offset * s);
    }
    negate() {
        return this.times(-1);
    }
    /** expr == value */
    equals(other) {
        const rhs = typeof other === 'number' || typeof other === 'bigint'
            ? LinearExpr.fromConstant(other) : other;
        const diff = this.minus(rhs);
        return new BoundedLinearExpression(diff, 0n, 0n);
    }
    /** expr <= value */
    le(other) {
        const rhs = typeof other === 'number' || typeof other === 'bigint'
            ? LinearExpr.fromConstant(other) : other;
        const diff = this.minus(rhs);
        return new BoundedLinearExpression(diff, -4503599627370496n, 0n);
    }
    /** expr >= value */
    ge(other) {
        const rhs = typeof other === 'number' || typeof other === 'bigint'
            ? LinearExpr.fromConstant(other) : other;
        const diff = this.minus(rhs);
        return new BoundedLinearExpression(diff, 0n, 4503599627370496n);
    }
    /** expr < value */
    lt(other) {
        const rhs = typeof other === 'number' || typeof other === 'bigint'
            ? LinearExpr.fromConstant(other) : other;
        const diff = this.minus(rhs);
        return new BoundedLinearExpression(diff, -4503599627370496n, -1n);
    }
    /** expr > value */
    gt(other) {
        const rhs = typeof other === 'number' || typeof other === 'bigint'
            ? LinearExpr.fromConstant(other) : other;
        const diff = this.minus(rhs);
        return new BoundedLinearExpression(diff, 1n, 4503599627370496n);
    }
    toProto() {
        const vars = [];
        const coeffs = [];
        for (const [varIdx, coeff] of this.terms) {
            vars.push(varIdx);
            coeffs.push(coeff);
        }
        return create(LinearExpressionProtoSchema, {
            vars,
            coeffs,
            offset: this.offset,
        });
    }
}
/**
 * Represents a bounded linear expression: lb <= expr <= ub.
 * Created by comparison methods on LinearExpr/IntVar.
 */
export class BoundedLinearExpression {
    expr;
    lb;
    ub;
    constructor(expr, lb, ub) {
        this.expr = expr;
        this.lb = lb;
        this.ub = ub;
    }
}
/** Helper to convert something that could be LinearExpr, number, or has toLinearExpr() */
export function toLinearExpr(value) {
    if (value instanceof LinearExpr)
        return value;
    if (typeof value === 'number' || typeof value === 'bigint')
        return LinearExpr.fromConstant(value);
    return value.toLinearExpr();
}
//# sourceMappingURL=linear-expr.js.map