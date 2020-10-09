import GreatCircleDistance from "../../src/Similiarity/GreatCircleDistance";

let greatCircleDistance: GreatCircleDistance = new GreatCircleDistance();
console.assert(greatCircleDistance.evaluate(49.744952, 13.387658, 50.097586, 14.354957) === 79.58020021933403);