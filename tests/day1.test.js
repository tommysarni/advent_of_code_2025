const { timesDialHitsZero, timesDialClicksZero, positiveOnlyModulo } = require("../calendar/day1/day1.js");


test('given', () => {
    const input = [
        'L68',
        'L30',
        'R48',
        'L5',
        'R60',
        'L55',
        'L1',
        'L99',
        'R14',
        'L82',
    ];

    expect(timesDialHitsZero(input)).toBe(3);

});

test('given click', () => {
    const input = [
        'L68',
        'L30',
        'R48',
        'L5',
        'R60',
        'L55',
        'L1',
        'L99',
        'R14',
        'L82',
    ];

    expect(timesDialClicksZero(input)).toBe(6);

});

test('pos modulo', () => {


    expect(positiveOnlyModulo(-10, 100)).toBe(90);
    expect(positiveOnlyModulo(0, 100)).toBe(0);
    expect(positiveOnlyModulo(10, 100)).toBe(10);
    expect(positiveOnlyModulo(100, 100)).toBe(0);
    expect(positiveOnlyModulo(-120, 100)).toBe(80);
})