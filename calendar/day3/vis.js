class Step {

    constructor({ type, val, prev, next }) {
        this.type = type;
        this.val = val;
        this.prev = prev || null;
        this.next = next || null;
    }

    first() {
        let node = this;
        while (node.prev) {
            node = node.prev;
        }

        return node;
    }

    last() {
        let node = this;
        while (node.next) {
            node = node.next;
        }

        return node;
    }

    add(step) {
        const tail = this.last()
        tail.next = step;
        step.prev = tail;
        return step;
    }

    length() {
        let node = this.first();

        let count = 0
        while (node.next) {
            node = node.next;
            count++;
        }

        return count;
    }
}


class StepVis {

    constructor(step) {
        this.step = step;
        this.numSteps = this.step.length();
        this.currStep = 0;
    }

    init({ bankArr }) {
        const batteryContainer = document.querySelector('#batteryContainer');
        const makeDigitEl = (n) => {
            const digitEl = document.createElement('div');
            digitEl.classList.add('digit');
            digitEl.textContent = n;
            return digitEl;
        };
        if (batteryContainer) {
            
            for (const row of bankArr) {
                const rowEl = document.createElement('div')
                rowEl.classList.add('row');
                for (const n of row) {
                    rowEl.appendChild(makeDigitEl(n))
                }
                batteryContainer.appendChild(rowEl);
            }
        }
    }

    startVoltage() {

    }

    selectBattery({ numOptions, rest, idx, max, result }) {

    }

    finishBattery({ battery: bank, result }) {

    }

    finishVoltage({ result: answer }) {

    }
}

class Joltage {
    /**
     * Constructor
     * @param {string[]} bankArr - List of batteries' energies (as digits)
     */
    constructor(bankArr) {
        this.bankArr = bankArr;
        this.toChoose = 12;
        this.step = new Step({ type: 'init', val: { bankArr } });
    }


    /**
     * In a row of digits combine 12 digits (in order!) to get the largest number (joltage)
     * @param {string} bank List of batteries' energies (as a digits)
     * @returns {BigInt} the largest joltage
    */
    getMaxBatteryVoltage(bank) {
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

        let toChoose = this.toChoose;
        let l = 0;
        let result = ``;

        while (toChoose > 0) {
            const numOptions = (bank.length - l) - (toChoose - 1); // toChoose - 1 because you need to leave that many options after you pick
            const rest = bank.slice(l, (numOptions + l));
            const { idx, max } = findMax(rest);
            result += max;
            this.step.add(new Step({ type: 'select-battery', val: { numOptions, rest, idx, max, result } }))
            toChoose--;
            l += idx + 1;
        }

        this.step.add(new Step({ type: 'finish-battery', val: { battery: bank, result } }))
        return BigInt(result)
    }


    /**
     * Get the largest sum of voltages for a group of battery banks
     * @param {string[]} bankArr List of batteries' energies (as digits)
     * @returns {BigInt} Sum of largest joltages
     */
    getMaxVoltage() {
        this.step.add(new Step({ type: 'start-voltage', val: {} }))
        const answer = this.bankArr.reduce((prev, curr) => {
            return prev + this.getMaxBatteryVoltage(curr);
        }, BigInt(0))

        this.step.add(new Step({ type: 'finish-voltage', val: { result: answer } }))
        return answer;
    }
}

const jolts = new Joltage(['987654321111111', '811111111111119', '234234234234278', '818181911112111']);
const max = jolts.getMaxVoltage();
let vis = new StepVis(jolts.step);
vis.init({bankArr: jolts.bankArr})
console.log('here')