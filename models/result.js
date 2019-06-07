const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ResultSchema = new Schema({
    id: ObjectId,
    userId: String,
    date: { type: Date, default: Date.now },
    points: String
});

var Result = mongoose.model('Result', ResultSchema);
module.exports = Result;