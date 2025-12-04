



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


module.exports = { getLargestBankVoltage, getLargestVoltage }