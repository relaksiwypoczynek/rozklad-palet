import type { ConstraintProto } from '../generated/cp_model_pb.js';
import type { BoolVar, IntVar } from './int-var.js';
/**
 * Wraps a ConstraintProto in the model. Provides reification support
 * via onlyEnforceIf().
 */
export declare class Constraint {
    readonly proto: ConstraintProto;
    constructor(proto: ConstraintProto);
    /**
     * Sets enforcement literals. The constraint is only enforced when
     * all given literals are true.
     */
    onlyEnforceIf(literals: (BoolVar | IntVar | number) | (BoolVar | IntVar | number)[]): this;
}
//# sourceMappingURL=constraint.d.ts.map