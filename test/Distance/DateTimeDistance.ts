import DateTimeDistance from "../../src/Distance/DateTimeDistance";

let dateTimeDistance: DateTimeDistance = new DateTimeDistance();

console.assert(dateTimeDistance.evaluate('2020-09-25T16:08:40-04:00', '2020-09-25T16:08:20-04:00') === 20000);
console.assert(dateTimeDistance.evaluate('2020-09-25T16:08:40-04:00', '2020-09-25T16:08:20-03:00') === 3620000);
console.assert(dateTimeDistance.evaluate('2020-09-25T16:08:40-04:00', '2020-09-25T16:08:20-05:00') === 3580000);
