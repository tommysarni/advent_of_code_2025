class IFoodInventory {

    /**
     * Creates FoodInventory
     * @param {string[]} ranges - inclusive fresh ids
     * @param {string[]} ids - all food ids
     */
    constructor(ranges, ids) {
        this.ranges = ranges.map(r => r.split('-').map(Number));
        this.ids = ids.map(Number);
    }

    /**
     * Gets # of Fresh Food from this.ids
     * @returns {number} # of Fresh Food from this.ids
     */
    countFresh() {
        throw new Error('Need to Implement')
    }

    /**
     * Determines if two ranges intersect
     * CONSTRAINT: (r1[0] <= r2[0])
     * @param {number[]} r1 - Range 1 CONSTRAINT: (r1[0] <= r2[0])
     * @param {*} r2 - Range 2
     * @returns {boolean} true if intersected
     */
    doesIntersect(r1, r2) {

        const [r1_s, r1_e] = r1;
        const [r2_s] = r2;

        return r2_s >= r1_s && r2_s <= r1_e;
    }


    /**
     * Collapses Ranges to smaller set
     * @param {number[][]} rangeArr - Sorted Ranges by start ascending
     * @returns {number[][]}
     */
    condenseRanges(rangeArr) {
        let i = 0;
        let curr = [];
        let result = [];
        while (i < rangeArr.length - 1) {
            const currRange = rangeArr[i];
            const nextRange = rangeArr[i + 1];
            const currCondensed = curr.length ? curr : currRange;

            if (this.doesIntersect(currCondensed, nextRange)) {
                curr = [Math.min(currCondensed[0], nextRange[0]), Math.max(currCondensed[1], nextRange[1])]
                rangeArr.splice(i, 1);
            } else {
                i++;
                result.push(currCondensed);
                curr = [];
            }
        }
        if (curr.length) result.push(curr);
        return result;
    }
}

class FoodInventory extends IFoodInventory {

    /**
     * Creates FoodInventory
     * @param {string[]} ranges - inclusive fresh ids
     * @param {number[]} ids - all food ids
     */
    constructor(ranges, ids) {
        super(ranges, ids);
    }


    /**
     * Gets # of Fresh Food from this.ids
     * @returns {number} # of Fresh Food from this.ids
     */
    countFresh() {

        // 1. Simplify Ranges
        const sorted = this.ranges.toSorted((a, b) => a[0] - b[0]);
        const condensed = this.condenseRanges(sorted);


        // 2. Filter IDs in Ranges
        const filtered = this.ids.filter(id => {
            return condensed.some(arr => id >= arr[0] && id <= arr[1]);
        });

        return filtered.length;
    }

    /**
     * Gets # of Fresh Food from this.ids
     * @returns {number} # of Fresh Food from this.ids
     */
    countFreshRangeDifference() {

        // 1. Simplify Ranges
        const sorted = this.ranges.toSorted((a, b) => a[0] - b[0]);
        const condensed = this.condenseRanges(sorted);

        // 2. count ranges
        return condensed.reduce((prev, curr) => {
            // add 1 for inclusivity (3-5: 3,4,5)
            return prev + (curr[1] - curr[0]) + 1;
        }, 0)

    }
}

module.exports = { FoodInventory }