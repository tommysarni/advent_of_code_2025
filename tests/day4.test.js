
const { ForkliftMap } = require("../calendar/day4");

const given = `
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`.split('\n').filter(str => str);

const floorplan = new ForkliftMap(given);

test('Forklift Map P1', () => {
    const markedRaw = `
..xx.xx@x.
x@@.@.@.@@
@@@@@.x.@@
@.@@@@..@.
x@.@@@@.@x
.@@@@@@@.@
.@.@.@.@@@
x.@@@.@@@@
.@@@@@@@@.
x.x.@@@.x.`
        
    const marked = markedRaw.split('\n').filter(str => str);

    const { rolls, numberMap, floorplan: fp } = floorplan.markAccessible()
    const formattedNumbers = numberMap.reduce((prev, curr) => {
        return prev + curr.join('') + '\n'
    }, '')
    const formattedPlan = fp.reduce((prev, curr) => {
        return prev + curr.join('').trim() + '\n'
    }, '')

    expect(markedRaw.trim()).toBe(formattedPlan.trim())
    expect(rolls).toBe(13)
})


test('Forklift Map P1', () => {

    
    const rolls = floorplan.markAccessibleContinued()

    expect(rolls).toBe(43)
})