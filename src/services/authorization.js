const _ = require('lodash')
const Boom = require('@hapi/boom');
const Account = require('../models/Account')
const jwtDecode = require('jwt-decode')

async function authorization(request) {
  const headers = request.headers;
  const userId = request.query.userId;
  const authData = _.get(headers,'authorization');
  if(!authData) {
    throw Boom.unauthorized();
  }
  const accessToken = _.split(authData,' ')[1];
  if(!accessToken) {
    throw Boom.unauthorized();
  }
  let decodedToken;
  try{
    decodedToken = jwtDecode(accessToken);
  }catch(err) {
    throw Boom.unauthorized();
  }
  const usernameFromToken = _.get(decodedToken,'payload.username');
  const account = await Account.get(userId);
  if(!account) {
    throw Boom.unauthorized();
  }
  if(account.username !== usernameFromToken) {
    throw Boom.unauthorized();
  }

  return true;
}

module.exports = {
  authorization
}