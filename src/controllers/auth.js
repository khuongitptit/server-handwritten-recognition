const authServices = require('../services/auth');
const path = require('path');

async function authenticate(request) {
  const data = request.payload;
  return authServices.authenticate(data);
}
async function register(request) {
  const data = request.payload;
  return authServices.register(data);
}
async function updateAccount(request) {
  const {accountId} = request.params;
  const data = request.payload;
  return authServices.updateAccount(accountId, data);
}
async function verifyEmail(request) {
  const {accountId} = request.params;
  const {activeCode} = request.payload;
  return authServices.verifyEmail(accountId, activeCode);
}
module.exports = {
  authenticate,
  register,
  updateAccount,
  verifyEmail,
};
