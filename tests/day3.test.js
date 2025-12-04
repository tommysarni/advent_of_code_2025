
const {getLargestBankVoltage, getLargestVoltage, getLargestBankVoltage2, getLargestVoltage2} = require('../calendar/day3/index.js');


describe('P1', () => {


    test('getLargestBankVoltage - given 1', () => {
        expect(getLargestBankVoltage('987654321111111')).toBe(98);
    })

    test('getLargestBankVoltage - given 1', () => {
        expect(getLargestBankVoltage('811111111111119')).toBe(89);
    })

    test('getLargestBankVoltage - given 1', () => {
        expect(getLargestBankVoltage('234234234234278')).toBe(78);
    })

    test('getLargestBankVoltage - given 1', () => {
        expect(getLargestBankVoltage('818181911112111')).toBe(92);
    })

    test('getLargestVoltage - given 1', () => {
        expect(getLargestVoltage(['987654321111111','811111111111119','234234234234278','818181911112111'])).toBe(357);
    })
})

describe('P2', () => {


    test('getLargestBankVoltage - given 1', () => {
        expect(getLargestBankVoltage2('987654321111111')).toBe(BigInt(987654321111));
    })

    test('getLargestBankVoltage - given 1', () => {
        expect(getLargestBankVoltage2('811111111111119')).toBe(BigInt(811111111119));
    })

    test('getLargestBankVoltage - given 1', () => {
        expect(getLargestBankVoltage2('234234234234278')).toBe(BigInt(434234234278));
    })

    test('getLargestBankVoltage - given 1', () => {
        expect(getLargestBankVoltage2('818181911112111')).toBe(BigInt(888911112111));
    })

    test('getLargestVoltage - given 1', () => {
        expect(getLargestVoltage2(['987654321111111','811111111111119','234234234234278','818181911112111'])).toBe(BigInt(3121910778619));
    })
})