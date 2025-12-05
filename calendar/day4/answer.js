const { ForkliftMap } = require(".");
const { raw } = require("./input");


const input = raw.split('\n').filter(str => str);

const floorplan = new ForkliftMap(input);
// const { rolls, numberMap, floorplan: fp } = floorplan.markAccessible();
const rolls = floorplan.markAccessibleContinued();
console.log(rolls)