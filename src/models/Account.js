const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema(
  {
    active: {
      type: Boolean,
      default: false,
    },
    email: String,
    fullname: String,
    username: String,
    password: String,
    birthday: Object,
    avatarURL: String,
    activeConfig: {
      code: Number,
      expiredIn: Number,
    },
    accessToken: String,
    refreshToken: String,
  },
  { timestamps: true }
);
const Account = mongoose.model('accounts', AccountSchema);
async function get(id) {
  return Account.findById(id);
}
async function findOne(query) {
  return Account.findOne(query);
}
async function update(id, data) {
  return Account.updateOne({ _id: id }, data);
}
async function add(data) {
  return Account.create(data);
}
async function activate(accountId, activeCode) {
  return Account.updateOne({ _id: accountId, 'activeConfig.code': activeCode }, {$set: {active: true}, $unset: {activeConfig: 1}});
}
async function searchByKeyword(userId, keyword) {
  const regex = new RegExp(keyword, 'i');
  return Account.find({
    $and: [
      { _id: { $ne: userId } },
      { $or: [{ username: regex }, { fullname: regex }] },
    ],
  });
}
module.exports = {
  get,
  findOne,
  update,
  add,
  find: Account.find.bind(Account),
  activate,
  searchByKeyword,
};
