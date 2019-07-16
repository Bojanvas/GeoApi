const mongoose = require('mongose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const SeaSchema = new Schema({
    id: ObjectId,
    name: String,
    location: String,
    deep: Number,
    sea_file_name: String,
    sea_file_path: String,
    points: { type: Number, default: 7 }
});

const Sea = mongoose.model('Sea', SeaSchema);

module.exports = Sea;