const resultsUtils = {

    calculateResult(points, time, callback){

        callback(points * time / 10)
    }
}

module.exports = resultsUtils;