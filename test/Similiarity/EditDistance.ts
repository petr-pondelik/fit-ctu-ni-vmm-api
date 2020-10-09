import EditDistance from "../../src/Similiarity/EditDistance";

let editDistance = new EditDistance();
console.assert(editDistance.evaluate('abba', 'cba') === 2);
console.assert(editDistance.evaluate('elephant', 'relevant') === 3);
console.assert(editDistance.evaluate('Saturday', 'Sunday') === 3);
console.assert(editDistance.evaluate('Google', 'Facebook') === 8);
console.assert(editDistance.evaluate('dnes jsem měl k obědu', 'co jsem dnes neměl') === 14);