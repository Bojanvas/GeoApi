const countryUtils = {

    getRandom(arr, n) {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
            result[n].type = getRandomType();
    
        }
        return result;
    }
}

function getRandomType() {
    const types = ['country', 'city', 'flag'];
    var type = types[Math.floor(Math.random()*types.length)];
    return type;
}

module.exports = countryUtils;