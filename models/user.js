const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const User = new Schema({
  author: ObjectId,
  title: String,
  body: String,
  date: Date
});