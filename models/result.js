const mongose = require('mongose');
const Schema = mongose.Schema;
const ObjectId = Schema.ObjectId;

const ResultSchema = new Schema({
    id: ObjectId,
    userId: Number,
    date: { type: Date, default: Date.now },
    points: String
});

var Result = mongose.model('Result', ResultSchema);
module.exports = Result;