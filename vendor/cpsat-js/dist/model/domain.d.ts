/**
 * Represents a domain as sorted disjoint intervals [min0, max0, min1, max1, ...].
 * Used for integer variable bounds in CP-SAT.
 */
export declare class Domain {
    readonly intervals: readonly [bigint, bigint][];
    private constructor();
    static fromRange(min: number | bigint, max: number | bigint): Domain;
    static fromValues(values: (number | bigint)[]): Domain;
    static fromFlattenedIntervals(flat: bigint[]): Domain;
    toFlatBigIntArray(): bigint[];
}
//# sourceMappingURL=domain.d.ts.map