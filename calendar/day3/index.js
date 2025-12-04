



/**
 * In a row of digits combine 2 digits (in order!) to get the largest number (joltage)
 * @param {string} bank List of batteries' energies (as a digits)
 * @returns {number} the largest joltage
 */
function getLargestBankVoltage(bank) {
    if (!bank) return 0;
    let l = 0;
    let r = bank.length - 1;
    let max = -Infinity;
    let highestDigit = 0;
    let highestDigitIdx = 0;

    while (l < r) {
        const lVal = bank.at(l);
        const rVal = bank.at(r);
        const combined = +`${lVal}${rVal}`;

        if (combined > max) {
            max = combined;
        }

        if (+lVal < +rVal) {
            l++;
            if (highestDigit < +rVal) {
                highestDigit = +rVal;
                highestDigitIdx = r;
            }

            if (l >= r && l <= highestDigitIdx) {
                r = bank.length - 1;
            }
        } else {
            r--;
            if (highestDigit < +lVal) {
                highestDigit = +lVal;
                highestDigitIdx = l;
            }
        }


    }


    return max;
}

/**
 * Get the largest sum of voltages for a group of battery banks
 * @param {string[]} bankArr List of batteries' energies (as digits)
 * @returns {number} Sum of largest joltages
 */
function getLargestVoltage(bankArr) {

    return bankArr.reduce((prev, curr) => {
        return prev + getLargestBankVoltage(curr);
    }, 0)
}

/**
 * In a row of digits combine 12 digits (in order!) to get the largest number (joltage)
 * @param {string} bank List of batteries' energies (as a digits)
 * @returns {BigInt} the largest joltage
 */
function getLargestBankVoltage2(bank) {
    if (!bank) return BigInt(0);

    function findMax(list) {
        if (!list.length) return { idx: -1, max: -Infinity }
        let max = -Infinity;
        let idx = -1;
        for (let i = 0; i < list.length; i++) {
            const curr = +list.at(i);
            if (curr > max) {
                max = curr;
                idx = i;
            }
        }
        return { idx, max }
    }

    let toChoose = 12; //1
    let l = 0; //10
    let result = ``;

    while (toChoose > 0) {
        const numOptions = (bank.length - l) - (toChoose - 1); // toChoose - 1 because you need to leave that many options after you pick
        const rest = bank.slice(l, (numOptions + l));
        const { idx, max } = findMax(rest);

        result += max;
        toChoose--;
        l += idx + 1;
    }

    return BigInt(result)
}

/**
 * Get the largest sum of voltages for a group of battery banks
 * @param {string[]} bankArr List of batteries' energies (as digits)
 * @returns {BigInt} Sum of largest joltages
 */
function getLargestVoltage2(bankArr) {

    return bankArr.reduce((prev, curr) => {
        return prev + getLargestBankVoltage2(curr);
    }, BigInt(0))
}


module.exports = { getLargestBankVoltage, getLargestVoltage, getLargestVoltage2, getLargestBankVoltage2 }