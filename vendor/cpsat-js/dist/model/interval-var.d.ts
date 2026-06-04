/**
 * Represents an interval variable in a CP-SAT model.
 * Used for scheduling constraints (noOverlap, cumulative).
 *
 * An interval is defined by its constraint index in the model.
 * The constraint enforces: start + size == end.
 */
export declare class IntervalVar {
    /** Index of the interval constraint in the model's constraints array */
    readonly constraintIndex: number;
    readonly name: string;
    constructor(constraintIndex: number, name: string);
}
//# sourceMappingURL=interval-var.d.ts.map