const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const AdminSchema = new Schema({
  id: ObjectId,
  email: String,
  password: String,
  last_active: { type: Date, default: Date.now },
});

var Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;