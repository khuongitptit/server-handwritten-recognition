const _ = require('lodash');
const Account = require('../models/Account');
const mailServices = require('./mail');
const {
  randomKey,
  encodePassword,
  checkPassword,
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/auth');
const Boom = require('@hapi/boom');

async function authenticate(data) {
  const checkAccount = await Account.findOne({ username: data.username });
  if (!checkAccount) {
    throw Boom.unauthorized('username_not_exist');
  }
  if (!_.get(checkAccount, 'active')) {
    throw Boom.notAcceptable('inactive_account');
  }
  const isPasswordValid = checkPassword(data.password, checkAccount.password);
  if (!isPasswordValid) {
    throw Boom.unauthorized('incorrect_password');
  }
  const accessToken = await generateAccessToken({
    username: checkAccount.username,
  });
  if (!accessToken) {
    throw Boom.unauthorized('error_login');
  }
  let refreshToken;
  if (!_.get(checkAccount, 'refreshToken')) {
    refreshToken = generateRefreshToken();
  } else {
    refreshToken = _.get(checkAccount, 'refreshToken');
  }
  await Account.update(checkAccount._id, _.assign(checkAccount, {accessToken, refreshToken}));
  return {
    _id: _.get(checkAccount, '_id'),
    username: _.get(checkAccount, 'username'),
    accessToken,
    refreshToken,
  };
}

async function register(data) {
  let checkAccount = await Account.findOne({ email: data.email });
  if (checkAccount) {
    throw Boom.badRequest('email_used');
  }
  checkAccount = await Account.findOne({ username: data.username });
  if (checkAccount) {
    throw Boom.badRequest('username_existed');
  }
  _.assign(data, {
    activeKey: randomKey(),
    password: encodePassword(data.password),
  });
  const createdAccount = await Account.add(data);
  if (createdAccount) {
    mailServices.sendMail({
      to: createdAccount.email,
      activeKey: createdAccount.activeKey,
    });
  }
  return { _id: createdAccount._id };
}

async function confirmEmail(data) {
  const { activeKey } = data;
  const accountToActivate = await Account.findOne({ activeKey });
  await Account.activate(activeKey);
  return Account.get(accountToActivate._id);
}
module.exports = {
  authenticate,
  register,
  confirmEmail,
};
