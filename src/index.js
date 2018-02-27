module.exports = function count(s, pairs) {
    let count = 0;
    let mask = s.split('');
    let baseNumber = 1;
    for (let idx = 0; idx < pairs.length; idx++) {
        baseNumber *= pairs[idx][0];
    }

    if (mask.length == 1) {
        for (let i = 0; i < pairs.length; i++) {
            let allNumbers = Math.floor(baseNumber / pairs[i][0]);
            count += allNumbers;
            for (let j = 0; j < i; j++) {
                count -= Math.floor(allNumbers / pairs[j][0]);
                allNumbers -= Math.floor(allNumbers / pairs[j][0]);
            }
        }
        if (mask[0] == 1) count = baseNumber - count;
        return getResult();
    }
    if (baseNumber > 100000000) {

        return 0;
    }

    for (let candidate = 1; candidate <= baseNumber; candidate++) {
        mask.every((value, index) => {
            let notDivisible = +pairs.every(([base, power]) => (candidate + index) % base != 0);
            return value == notDivisible;
        }) && count++;
    }
    return getResult();

    function getResult() {
        for (let i = 0; i < pairs.length; i++) {
            let pow = pairs[i][1] - 1;
            let powPart;
            let pows = 1;
            while (Math.pow(pairs[i][0], Math.floor(pow / pows)) > 1000000007) {
                pows *= 2;
            }
            powPart = Math.floor(pow / pows);
            let mult = Math.pow(pairs[i][0], powPart);
            while (powPart < pow) {
                count = (count * mult) % 1000000007;
                pow -= powPart;
            }
            count = (count * Math.pow(pairs[i][0], pow)) % 1000000007;
        }
        return count;
    }

}