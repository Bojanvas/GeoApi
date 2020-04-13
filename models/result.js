const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ResultSchema = new Schema({
    id: ObjectId,
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    date: { type: Date, default: Date.now },
    score: Number
});

var Result = mongoose.model('Result', ResultSchema);
module.exports = Result;