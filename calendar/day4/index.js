class ForkliftMap {


    /**
     * Creates Forklift Map
     * @param {string[][]} floorplan - rows of cells
     */
    constructor(floorplan) {
        // conver map to rows and columns
        this.floorplan = floorplan.map(str => str.split(''));
    }


    /**
     * Marks accessible spots on the map with an x
     * @returns {{floorplan: string[], rolls: number, numberMap: number[][]}} helpful result info
     */
    markAccessible() {
        // flood fill dps - when we hit 
        // go through once and update the map
        // Initializes empty map
        const numberMap = Array.from(
            { length: this.floorplan.length },
            (_, i) => new Array(this.floorplan[i].length).fill(0)
        );

        const addAdjacent = (r, c) => {
            for (let i = r - 1; i <= r + 1; i++) {
                if (i < 0 || i >= numberMap.length) continue;
                for (let j = c - 1; j <= c + 1; j++) {

                    if (j < 0 || j >= numberMap[i].length) continue;

                    if (i === r && j === c) continue;

                    numberMap[i][j] += 1;
                    if (numberMap[i][j] < 4 && this.floorplan[i][j] === '@') {
                        this.floorplan[i][j] = 'x';
                    } else if (numberMap[i][j] >= 4 && this.floorplan[i][j] === 'x') {
                        this.floorplan[i][j] = '@';
                    }


                }
            }

            this.floorplan[r][c] = (numberMap[r][c] < 4) ? 'x' : '@';
        }

        for (let row = 0; row < this.floorplan.length; row++) {
            for (let col = 0; col < this.floorplan[row].length; col++) {
                const currMark = this.floorplan[row][col];
                const hasPaper = currMark === "@" || currMark === 'x';
                if (hasPaper) addAdjacent(row, col);
            }
        }

        const rolls = this.floorplan.reduce((prev, curr) => {
            const currAmount = curr.filter(str => str === 'x').length

            return prev + currAmount
        }, 0)
        return { rolls, numberMap, floorplan: this.floorplan }
    }

    markAccessibleContinued() {
        let rolls = 0;
        let last = -Infinity;
        while (rolls !== last) {
            const { rolls: r } = this.markAccessible()
            last = rolls;
            rolls += r;

            this.floorplan = this.floorplan.reduce((prev, curr) => {
                const currArr = curr.map(str => str === 'x' ? '.' : str)

                return [...prev, currArr]
            }, [])
        }

        return rolls;
    }
}


module.exports = { ForkliftMap };