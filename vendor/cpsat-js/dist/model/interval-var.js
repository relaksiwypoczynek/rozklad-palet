/**
 * Represents an interval variable in a CP-SAT model.
 * Used for scheduling constraints (noOverlap, cumulative).
 *
 * An interval is defined by its constraint index in the model.
 * The constraint enforces: start + size == end.
 */
export class IntervalVar {
    /** Index of the interval constraint in the model's constraints array */
    constraintIndex;
    name;
    constructor(constraintIndex, name) {
        this.constraintIndex = constraintIndex;
        this.name = name;
    }
}
//# sourceMappingURL=interval-var.js.map