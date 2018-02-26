module.exports = function count(s, pairs) {
  let count = 0;
  let mask = s.split('');
  let baseNumber = 1;
  for(let idx = 0; idx < pairs.length; idx++) {
    baseNumber *= pairs[idx][0];
  }
  //console.log(baseNumber)
  for(let candidate = 1; candidate <= baseNumber; candidate++) {
    mask.every((value, index) => {
      let notDivisible = + pairs.every(([base, power]) => (candidate + index) % base != 0);
      return value == notDivisible;
    }) && count++;
  }
  return count * pairs.reduce((init, [base, pow]) => init * Math.pow(base, pow - 1), 1);
}