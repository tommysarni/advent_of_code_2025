const { getInvalidCountSum, getInvalidCountByRange, isNumberRepeated, isNumberRepeatedAny, getInvalidCountByRangeP2, getInvalidCountSumP2, getInvalidCountSumP3, generateRepeating } = require('../calendar/day2/index.js')

// test('generate repeating', () => {
//     expect(generateRepeating(0, 0, 100)).toStrictEqual(new Set());
//     expect(generateRepeating(1, 0, 100)).toStrictEqual(new Set());
//     expect(generateRepeating(2, 0, 100)).toStrictEqual(new Set([11,22,33,44,55,66,77,88,99]));
// })


// test('number is repeated', () => {

//     expect(isNumberRepeated(123123)).toBe(true);
//     expect(isNumberRepeated(1010)).toBe(true);
//     expect(isNumberRepeated(11)).toBe(true);
//     expect(isNumberRepeated(22)).toBe(true);
//     expect(isNumberRepeated(456789456789)).toBe(true);
//     expect(isNumberRepeated(0)).toBe(false);
//     expect(isNumberRepeated(12)).toBe(false);
//     expect(isNumberRepeated(567576)).toBe(false);
// })

// test('number is repeated', () => {

//     expect(isNumberRepeatedAny(123123)).toBe(true);
//     expect(isNumberRepeatedAny(38593859)).toBe(true);
//     expect(isNumberRepeatedAny(565656)).toBe(true);
//     expect(isNumberRepeatedAny(1698528)).toBe(false);

// })

test('part 1 - given', () => {

    const input = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`.replaceAll('\n', '')

    expect(getInvalidCountByRangeP2(11, 22)).toStrictEqual([11, 22]);
    expect(getInvalidCountByRangeP2(95, 115)).toStrictEqual([99, 111]);


})

test('part 2 - given', () => {

    const input = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`.replaceAll('\n', '')

    expect(getInvalidCountByRange(11, 22)).toStrictEqual([11, 22]);
    expect(getInvalidCountByRange(95, 115)).toStrictEqual([99]);
    expect(getInvalidCountByRange(998, 1012)).toStrictEqual([1010]);
    expect(getInvalidCountByRange(1188511880, 1188511890)).toStrictEqual([1188511885]);
    expect(getInvalidCountByRange(222220, 222224)).toStrictEqual([222222]);
    expect(getInvalidCountByRange(1698522, 1698528)).toStrictEqual([]);
    expect(getInvalidCountByRange(446443, 446449)).toStrictEqual([446446]);
    expect(getInvalidCountByRange(38593856, 38593862)).toStrictEqual([38593859]);
    expect(getInvalidCountByRange(565653, 565659)).toStrictEqual([]);

})

test('part 1 - given', () => {

    const input = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`.replaceAll('\n', '')

    expect(getInvalidCountSum(input)).toBe(1227775554);


})

test('part 2 - given', () => {

    const input = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`.replaceAll('\n', '')

    expect(getInvalidCountSumP2(input)).toBe(4174379265);


})

