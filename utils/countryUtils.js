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
            result[n].question = questionTemplate(type, result[n].name);
            result[n].answers = getRandomAnswers(arr, x, type);

        }
        return result;
    }

}

function getRandomType() {
    const types = ['country', 'city', 'flag'];
    var type = types[Math.floor(Math.random()*types.length)];
    return type;
}

const questionTemplate = (type = '', name = '') => {
    var question = '';
    if (type == 'country') {
        return 'Guess the country ?';
    } else if (type == 'city') {
        return 'Whats the capital of'+name+'?';
    } else if (type == 'flag') {
        return 'This flag belongs tocountry ?';
    }

    return question;
};

function getRandomAnswers(questions = [], index = 0, type='') {

    if (questions.length > 0) {
        var answersOptions = new Array(3),
        len = questions.length,
        takenAnswers = new Array(len);
        takenAnswers[index] = --len;
        for (let i = 0; i< 3; i++) {
            var x = Math.floor(Math.random() * len);
            
            if (type == 'city') {
                answersOptions[i] = questions[x in takenAnswers ? takenAnswers[x] : x].capital;
                takenAnswers[x] = --len in takenAnswers ? takenAnswers[len] : len;
            } else if (type =='country' || type =='flag'){
                answersOptions[i] = questions[x in takenAnswers ? takenAnswers[x] : x].name;
                takenAnswers[x] = --len in takenAnswers ? takenAnswers[len] : len;
            }
        }
        return JSON.stringify(answersOptions);
    } 
}

module.exports = countryUtils;