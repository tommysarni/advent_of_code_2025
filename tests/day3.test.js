
const {getLargestBankVoltage, getLargestVoltage} = require('../calendar/day3/index.js');


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