const _ = require('lodash');
const Account = require('../models/Account');
const mailServices = require('./mail');
const {
  randomCode,
  encodePassword,
  checkPassword,
  generateAccessToken,
  generateRefreshToken,
  isCodeExpired
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
  await Account.update(
    checkAccount._id,
    _.assign(checkAccount, { accessToken, refreshToken })
  );
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
    password: encodePassword(data.password),
    activeConfig: randomCode(),
  });
  const registerAccount = await Account.add(data);
  mailServices.sendMail({
    to: registerAccount.email,
    activeCode: _.get(registerAccount, 'activeConfig.code'),
  });
  return _.pick(registerAccount, ['_id', 'email', 'fullname', 'username']);
}

async function updateAccount(accountId, data) {
  let updateAccount = await Account.get(accountId);
  if(!updateAccount) {
    throw Boom.badRequest();
  }
  updateAccount = _.assign(updateAccount, data);
  updateAccount = await Account.update(accountId, data).then(() => Account.get(accountId));
  return _.pick(updateAccount, ['_id', 'email', 'fullname', 'username', 'birthday','avatarURL']);
}

async function verifyEmail(accountId, activeCode) {
  let emailToVerify = await Account.get(accountId);
  console.log("11111111",emailToVerify);
  if(!emailToVerify) {
    throw Boom.badRequest();
  }
  console.log("222222222",emailToVerify);
  emailToVerify = await Account.find({_id: accountId, 'activeConfig.code': activeCode});
  console.log("3333333",emailToVerify);
  if(_.isEmpty(emailToVerify)) {
    throw Boom.badData("wrong_active_code");
  }
  if(isCodeExpired(_.get(emailToVerify, 'activeConfig.expiredIn'))) {
    throw Boom.clientTimeout();
  }
  emailToVerify = await Account.activate(accountId, activeCode).then(() => Account.get(accountId));
  return _.pick(emailToVerify, ['_id','active']);
}

module.exports = {
  authenticate,
  register,
  updateAccount,
  verifyEmail,
};
