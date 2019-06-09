const countryUtils = {

    getRandom(arr, n) {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            var type;
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
            result[n].type = type = getRandomType();
            result[n].answers = getRandomAnswers(arr, n, type);

        }
        return result;
    }

}

function getRandomType() {
    const types = ['country', 'city', 'flag'];
    var type = types[Math.floor(Math.random()*types.length)];
    return type;
}

function getRandomAnswers(questions = [], index = 0, type='') {

    if (questions.length > 0) {
        var answersOptions = new Array(3),
        len = questions.length,
        takenAnswers = new Array(len);
        for (let i = 0; i< 3; i++) {
            var x = Math.floor(Math.random() * len);
            
            if (type == 'city') {
                answersOptions[i] = questions[x in takenAnswers && x != index  ? takenAnswers[x] : x].capital;
                takenAnswers[x] = --len in takenAnswers ? takenAnswers[len] : len;
            } else if (type =='country' || type =='flag'){
                answersOptions[i] = questions[x in takenAnswers && x != index  ? takenAnswers[x] : x].name;
                takenAnswers[x] = --len in takenAnswers ? takenAnswers[len] : len;
            }
        }

        return JSON.stringify(answersOptions);
    } 
}

module.exports = countryUtils;