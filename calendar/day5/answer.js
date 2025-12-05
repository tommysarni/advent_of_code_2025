const { FoodInventory } = require(".");
const { raw } = require("./input");

const [rangesStr, idsStr] = raw.split('\n\n');
const ranges = rangesStr.split('\n').filter(str => str);
const ids = idsStr.split('\n').filter(str => str !== "");

const inventory = new FoodInventory(ranges, ids);

console.log(inventory.countFresh())
console.log(inventory.countFreshRangeDifference())