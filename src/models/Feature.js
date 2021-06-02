const mongoose = require('mongoose');

const FeatureSchema = new mongoose.Schema(
  {
    label: String,
    featureData: Array
  },
  { timestamps: true }
);
const Feature = mongoose.model('features', FeatureSchema);
async function get(id) {
  return Feature.findById(id);
}
async function findOne(query) {
  return Feature.findOne(query);
}
async function update(id, data) {
  return Feature.updateOne({ _id: id }, data);
}
async function add(data) {
  return Feature.create(data);
}
async function insertMany(data) {
  return Feature.insertMany(data);
}
module.exports = {
  get,
  findOne,
  update,
  add,
  find: Feature.find.bind(Feature),
  insertMany
};
