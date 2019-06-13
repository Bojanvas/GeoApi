const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
// const user = require('../models/user');

const ResultSchema = new Schema({
    id: ObjectId,
    userId: String,
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    date: { type: Date, default: Date.now },
    points: String
});

var Result = mongoose.model('Result', ResultSchema);
module.exports = Result;