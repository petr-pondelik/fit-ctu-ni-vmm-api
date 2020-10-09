import IntegerDistance from "../../src/Distance/IntegerDistance";

let integerDistance: IntegerDistance = new IntegerDistance();

console.assert(integerDistance.evaluate(500, 600) === 100);
console.assert(integerDistance.evaluate(600, 500) === 100);
console.assert(integerDistance.evaluate(-600, 500) === 1100);
console.assert(integerDistance.evaluate(600, -500) === 1100);
console.assert(integerDistance.evaluate(600.444, 500) === 100);
