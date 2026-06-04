/**
 * Wraps a ConstraintProto in the model. Provides reification support
 * via onlyEnforceIf().
 */
export class Constraint {
    proto;
    constructor(proto) {
        this.proto = proto;
    }
    /**
     * Sets enforcement literals. The constraint is only enforced when
     * all given literals are true.
     */
    onlyEnforceIf(literals) {
        const arr = Array.isArray(literals) ? literals : [literals];
        this.proto.enforcementLiteral = arr.map((lit) => typeof lit === 'number' ? lit : lit.index);
        return this;
    }
}
//# sourceMappingURL=constraint.js.map