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
        return 'Whats the capital of '+name+'?';
    } else if (type == 'flag') {
        return 'This flag belongs to country ?';
    }

    return question;
};

function getRandomAnswers(questions = [], index = 0, type='') {

    if (questions.length > 0) {
        var answersOptions = new Array(4),
        len = questions.length,
        takenAnswers = new Array(len);

        // add corrcet answer
        if (type == 'city') {
            answersOptions[0]= questions[index].capital;
        } else if (type == 'country' || type == 'flag') {
            answersOptions[0] = questions[index].name;
        }

        takenAnswers[index] = --len;
        for (let i = 1; i < 4; i++) {
            var x = Math.floor(Math.random() * len);
            
            if (type == 'city') {
                answersOptions[i] = questions[x in takenAnswers ? takenAnswers[x] : x].capital;
                takenAnswers[x] = --len in takenAnswers ? takenAnswers[len] : len;
            } else if (type =='country' || type =='flag'){
                answersOptions[i] = questions[x in takenAnswers ? takenAnswers[x] : x].name;
                takenAnswers[x] = --len in takenAnswers ? takenAnswers[len] : len;
            }
        }
        shuffleAnswers(answersOptions);
        return JSON.stringify(answersOptions);
    } 
}

function shuffleAnswers(questions) {
    for(var i = questions.length; i-- > 1; ) {
      var j = Math.floor(Math.random() * i);
      var tmp = questions[i];
      questions[i] = questions[j];
      questions[j] = tmp;
    }
  }

module.exports = countryUtils;