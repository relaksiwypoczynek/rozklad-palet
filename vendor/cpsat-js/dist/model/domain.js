/**
 * Represents a domain as sorted disjoint intervals [min0, max0, min1, max1, ...].
 * Used for integer variable bounds in CP-SAT.
 */
export class Domain {
    intervals;
    constructor(intervals) {
        this.intervals = intervals;
    }
    static fromRange(min, max) {
        return new Domain([[BigInt(min), BigInt(max)]]);
    }
    static fromValues(values) {
        if (values.length === 0) {
            return new Domain([]);
        }
        const sorted = [...values].map(BigInt).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
        const intervals = [];
        let start = sorted[0];
        let end = sorted[0];
        for (let i = 1; i < sorted.length; i++) {
            if (sorted[i] === end + 1n) {
                end = sorted[i];
            }
            else {
                intervals.push([start, end]);
                start = sorted[i];
                end = sorted[i];
            }
        }
        intervals.push([start, end]);
        return new Domain(intervals);
    }
    static fromFlattenedIntervals(flat) {
        const intervals = [];
        for (let i = 0; i < flat.length; i += 2) {
            intervals.push([flat[i], flat[i + 1]]);
        }
        return new Domain(intervals);
    }
    toFlatBigIntArray() {
        return this.intervals.flatMap(([min, max]) => [min, max]);
    }
}
//# sourceMappingURL=domain.js.map