const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const CountrySchema = new Schema({
  id: ObjectId,
  name: String,
  capital: String,
  flag: String,
  country_img : String,
  points: { type: Number, default: 5 },
});

var Country = mongoose.model('Country', CountrySchema);

module.exports = Country;