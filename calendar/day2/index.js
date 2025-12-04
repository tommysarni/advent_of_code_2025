function generateRepeating(digit, start, end, store = new Map()) {
    if (store.get(digit)) return store.get(digit);
    let results = new Set();
    if (digit < 2) return results;
    let divisor = 2;
    while (divisor <= digit) {

        if (digit % divisor !== 0) continue;
        const places = digit / divisor;

        const first = +((`${start}`).slice(0, places).padEnd(digit, '0'));
        console.log(first)
        for (let i = first; i <= end; i++) {
            results.add(+``.padStart(digit, i));

        }
        divisor++;
    }

    store.set(digit, results);
    return results;
}

function geneateInvalidBetween(start, end) {
    const store = new Map();
    const startDigits = Math.floor(Math.log10(start)) + 1;
    const endDigits = Math.floor(Math.log10(end)) + 1;
    if (endDigits < 2) return [];
    const nonfiltered = [];
    for (let i = startDigits; i <= endDigits; i++) {
        nonfiltered.push(...generateRepeating(i, start, end, store));
    }
    console.log({ startDigits, endDigits, nonfiltered: nonfiltered.slice(400) })

    const filtered = nonfiltered.filter(n => n >= start && n <= end);

    return filtered;
}

/**
 * Checks if the number is a repeated twice sequence
 * @param {number} n 
 * @return {boolean} true if number is repeated
 */
function isNumberRepeated(n) {
    const numStr = `${n}`;
    if (numStr.length % 2 !== 0) return false;
    const pivot = numStr.length / 2;
    return numStr.slice(0, pivot) === numStr.slice(pivot);
}


/**
 * Checks if the number is a repeated twice sequence
 * @param {number} n 
 * @return {boolean} true if number is repeated
 */
function isNumberRepeatedRegex(n) {
    const str = `${n}`;
    const len = str.length;
    // Try every possible substring length from 1 to half the string length
    for (let subLen = 1; subLen <= len / 2; subLen++) {
        if (len % subLen !== 0) continue; // only lengths that divide evenly
        const substring = str.slice(0, subLen);
        let repeated = '';
        const repeatCount = len / subLen;
        for (let i = 0; i < repeatCount; i++) {
            repeated += substring;
        }
        if (repeated === str) return true;
    }
    return false;
}

/**
 * Checks if the number is a repeated twice sequence
 * @param {number} n 
 * @return {boolean} true if number is repeated
 */
function isNumberRepeatedRegex2(n) {
    const RE = /^(.+?)\1+$/g
    return RE.test(`${n}`)
}


/**
 * Checks if the number is a repeated sequence (44, 446446)
 * @param {number} n 
 * @return {boolean} true if number is repeated
 */
function isNumberRepeatedAny(n) {
    const numStr = `${n}`;

    // check times divisible by digits (try half, then thirds, ...etc)
    for (let divisor = 2; divisor <= n; divisor++) {
        if (numStr.length % divisor !== 0) continue;
        const pivot = numStr.length / divisor;

        const first = numStr.slice(0, pivot);
        let isInvalid = false;
        for (let i = pivot; i < numStr.length; i += pivot) {
            if (i === pivot) isInvalid = true;
            const curr = numStr.slice(i, i + pivot);
            if (curr !== first) {
                isInvalid = false;
                break;
            }
        }

        if (isInvalid) return true;
    }

    return false;
}


/**
 * Creates a list of invalid ids between start & end
 * An ID is invalid if sequence of digits is repeated twice
 * @param {number} start - start number inclusive
 * @param {number} end  - end number inclusive
 * @returns {number[]} - list of invalid ids
 */
function getInvalidCountByRange(start, end, store = new Map()) {
    let results = [];
    for (let i = start; i <= end; i++) {
        const stored = store.get(i);
        if (stored) {
            results.push(i);
            continue
        }

        store.set(i, isNumberRepeated(i));
        if (isNumberRepeated(i)) results.push(i);

    }

    return results;
}

/**
 * Creates a list of invalid ids between start & end
 * An ID is invalid if sequence of digits is repeated twice
 * @param {number} start - start number inclusive
 * @param {number} end  - end number inclusive
 * @returns {number[]} - list of invalid ids
 */
function getInvalidCountByRangeP2(start, end, store = new Map()) {
    let results = [];
    for (let i = start; i <= end; i++) {
        const stored = store.get(i);
        if (stored) {
            results.push(i);
            continue
        }
        const repeated = isNumberRepeatedRegex(i);

        store.set(i, repeated);
        if (repeated) results.push(i);

    }

    return results;
}


/**
 * Gets the sum of invalid numbers of the ranges
 * @param {string[]} ranges - id ranges [start#-end#]
 * @returns {number} - Sum of Invalid numbers
 */
function getInvalidCountSum(ranges) {

    const intevals = ranges.split(',');
    const stored = new Map();

    const answer = intevals.reduce((prev, r) => {
        const [s, e] = r.split('-').map(Number);
        const invalidIds = getInvalidCountByRange(s, e, stored);
        if (!invalidIds.length) return prev;
        const currCount = invalidIds.reduce((sum, next) => sum + next, 0);
        return prev + currCount;
    }, 0)
    // console.log(stored)
    return answer;
}

/**
 * Gets the sum of invalid numbers of the ranges
 * @param {string[]} ranges - id ranges [start#-end#]
 * @returns {number} - Sum of Invalid numbers
 */
function getInvalidCountSumP2(ranges) {

    const intevals = ranges.split(',');
    const stored = new Map();

    const answer = intevals.reduce((prev, r) => {

        const [s, e] = r.split('-').map(Number);
        const invalidIds = getInvalidCountByRangeP2(s, e, stored);
        if (!invalidIds.length) return prev;
        const currCount = invalidIds.reduce((sum, next) => sum + next, 0);
        return prev + currCount;
    }, 0)
    // console.log(stored)
    return answer;
}

/**
 * Gets the sum of invalid numbers of the ranges
 * @param {string[]} ranges - id ranges [start#-end#]
 * @returns {number} - Sum of Invalid numbers
 */
function getInvalidCountSumP3(ranges) {
    const intevals = ranges.split(',');


    const answer = intevals.reduce((prev, r) => {

        const [s, e] = r.split('-').map(Number);
        const invalidIds = geneateInvalidBetween(s, e);
        console.log({ s, e, invalidIds })
        if (!invalidIds.length) return prev;
        const currCount = invalidIds.reduce((sum, next) => sum + next, 0);
        return prev + currCount;
    }, 0)
    // console.log(stored)
    return answer;
}





module.exports = { getInvalidCountByRange, getInvalidCountSum, isNumberRepeated, isNumberRepeatedAny, getInvalidCountByRangeP2, getInvalidCountSumP2, generateRepeating, getInvalidCountSumP3 }