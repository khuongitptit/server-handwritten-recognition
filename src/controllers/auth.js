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
async function confirmEmail(request, reply) {
  const data = request.params;
  const result = await authServices.confirmEmail(data);
  if (result.active) {
    return `<h3>Your email has been confirmed</h3><br/>
      <a href="http://localhost:1999/login">Sign in now</a>
    `;
  }
  return 'Error confirm email';
}
module.exports = {
  authenticate,
  register,
  updateAccount,
  confirmEmail,
};
