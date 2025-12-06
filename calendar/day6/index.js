

class VertMath {

    /**
     * Constructs a VertMath
     * @param {string[][]} questionRows - math queestions in vertical format [1][1][+] => 1 + 1
     */
    constructor(questions) {
        this.questions = questions;
    }


    static preprocessCephToHuman(str) {
        const lines = str.split('\n');

        // CHANGE IF NOT RECT
        const rowLength = lines.length
        const colLength = lines[0].length;
        // -----
        const result = Array.from({ length: colLength },
            () => new Array(rowLength)
        )

        for (let r = 0; r < rowLength; r++) {
            for (let c = 0; c < colLength; c++) {

                result[c][r] = lines[r][c];
            }
        }

        const flatArrStr = result.map(arr => arr.join(''));

        //separate by empty spaces columns
        let answer = [];
        const strSize = flatArrStr[0].length;
        let curr = [];
        for (const str of flatArrStr) {
            if (str === ''.padStart(strSize, ' ')) {
                // new column
                answer.push(curr);
                curr = [];
            } else {
                curr.push(str);
            }
        }

        if (curr.length) answer.push(curr);

        return answer.map(arr => {
            const op = arr[0].at(-1)
            return [...arr.map(str => str.replace(/[^\d]/g, '')), op]
        });
    }


    /**
     * Swaps rows for columns of questions
     * NO MUTATION
     * @returns {string[][]} - Rotated Array of questions
     */
    toTransformed() {
        if (!this.questions || !this.questions.length) throw new Error('Bad Questions');
        // CHANGE IF NOT RECT
        const rowLength = this.questions.length;
        const colLength = this.questions[0].length;
        // -----
        const result = Array.from({ length: colLength },
            () => new Array(rowLength)
        )

        for (let r = 0; r < rowLength; r++) {
            for (let c = 0; c < colLength; c++) {

                result[c][r] = this.questions[r][c]
            }
        }

        return result;
    }


    /**
     * Solves a Math Problem
     * @param {string[]} problemArr - list of numbers followed by operator
     * @returns {number} - result
     */
    solveProblem(problemArr) {

        const operator = problemArr.at(-1);
        const numbers = problemArr.filter((n) => !isNaN(n)).map(Number);

        const total = numbers.reduce((prev, curr) => {

            switch (operator) {
                case "*":
                    return prev * curr;
                case "+":
                    return prev + curr;
                default:
                    console.log('Missing operator', + operator);
                    return prev;
            }
        }, operator === '+' ? 0 : 1)
        return total;
    }


    /**
     * Sums all individual math problems
     * @returns {number} - sum of all problems
     */
    sumAll(needTransform = true) {

        const transformed = needTransform ? this.toTransformed() : this.questions;

        const total = transformed.reduce((prev, curr) => {

            return prev + this.solveProblem(curr);
        }, 0)

        return total;
    }
}


module.exports = { VertMath }