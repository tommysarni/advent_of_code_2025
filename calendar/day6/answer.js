const { VertMath } = require(".");
const { raw } = require("./input");

const formatted = raw.
    split('\n')
    .map(str => str
        .split(' ')
        .map(s => s.trim())
        .filter(s => s !== ''));


const hw = new VertMath(formatted);

const ceph_hw = new VertMath(VertMath.preprocessCephToHuman(raw))

console.log(hw.sumAll())
console.log(ceph_hw.sumAll(false))