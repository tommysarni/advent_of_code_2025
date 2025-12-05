const { FoodInventory } = require("../calendar/day5");

const raw = `
3-5
10-14
16-20
12-18

1
5
8
11
17
32
`.trim();

const [rangesStr, idsStr] = raw.split('\n\n');
const ranges = rangesStr.split('\n').filter(str => str);
const ids = idsStr.split('\n').filter(str => str !== "");

const inventory = new FoodInventory(ranges,ids);


test('FoodInventory - given', () => {

    expect(inventory.countFresh()).toBe(3)
})

test('FoodInventory - p2 - given', () => {

    expect(inventory.countFreshRangeDifference()).toBe(14)
})