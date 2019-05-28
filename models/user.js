const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const UserSchema = new Schema({
  id: ObjectId,
  name: String,
  email: String,
  password: String,
  last_active: { type: Date, default: Date.now },
  is_premium : { type: Boolean, default: false },
  experiance:  { type: Number, default: 0 },
  is_guest : { type: Boolean, default: false },
  country : { type: String, default: 'Unknown' },
});

var User = mongoose.model('User', UserSchema);

module.exports = User;