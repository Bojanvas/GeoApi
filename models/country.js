const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const Country = new Schema({
  id: ObjectId,
  name: String,
  capital: String,
  flag: String,
  country_img : String,
  points: { type: Number, default: 5 },
});

module.exports = Country;