const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const MountineSchema = new Schema ({
    id: ObjectId,
    name: String,
    location: String,
    height: Number,
    mountine_file_name: String,
    mountine_file_path: String,
    points: { type: Number, default: 7 }
});

const Mountine = mongoose.model('Mountine', MountineSchema);

module.exports = Mountine;