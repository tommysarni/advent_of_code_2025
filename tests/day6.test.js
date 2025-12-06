const { VertMath } = require("../calendar/day6");

const raw = `
123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `.trimStart();
const formatted = raw.
    split('\n')
    .map(str => str
        .split(' ')
        .map(s => s.trim())
        .filter(s => s !== ''));
const hw = new VertMath(formatted);


test('transformedstring', () => {
    expect(VertMath.preprocessCephToHuman(raw))
    .toStrictEqual([
        ["1", "24", "356", "*"], 
        ["369", "248", "8", "+"], 
        ["32", "581", "175", "*"], 
        ["623", "431", "4", "+"]])
})

test('Translate - given', () => {
    let expected = [
        ['123', '45', '6', '*'],
        ['328', '64', '98', '+'],
        ['51', '387', '215', '*'],
        ['64', '23', '314', '+'],
    ]
    expect(hw.questions).toBe(formatted);
    expect(hw.toTransformed()).toStrictEqual(expected);
})

test('solve problem', () => {

    expect(hw.solveProblem(['123', '45', '6', '*'])).toBe(33210)
    expect(hw.solveProblem(['328', '64', '98', '+'])).toBe(490)
    expect(hw.solveProblem(['328', '64', '98', '-10', '+'])).toBe(480)
    expect(hw.solveProblem(['-1', '64', '-1', '*'])).toBe(64)
})


test('sumAll', () => {

    const ceph_hw = new VertMath(VertMath.preprocessCephToHuman(raw))

    expect(ceph_hw.sumAll(false)).toBe(3263827)
})