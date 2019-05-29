const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const CountrySchema = new Schema({
  id: ObjectId,
  name: String,
  capital: String,
  flag_file_name: String,
  flag_file_path: String,
  country_file_name : String,
  country_file_path : String,
  points: { type: Number, default: 5 },
});

var Country = mongoose.model('Country', CountrySchema);

module.exports = Country;