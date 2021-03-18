const crypto = require('crypto');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const promisify = require('util').promisify;
const randToken = require('rand-token');
const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);

function randomKey() {
  const timeStamp = Date.now() % 100;
  return crypto.randomBytes(timeStamp).toString('hex');
}

function encodePassword(password) {
  return bcrypt.hashSync(password, config.get('SALT_ROUNDS'));
}

function checkPassword(plainPassword, hashPassword) {
  return bcrypt.compareSync(plainPassword, hashPassword);
}

async function generateAccessToken(payload) {
  try {
    return await sign(
      {
        payload,
      },
      config.get("ACCESS_TOKEN_SECRET"),
      {
        algorithm: 'HS256',
        expiresIn: config.get("ACCESS_TOKEN_LIFE"),
      }
    );
  } catch (error) {
    console.log(`Error in generate access token:  + ${error}`);
    return null;
  }
}

function generateRefreshToken() {
  return randToken.generate(100);
}

module.exports = {
  randomKey,
  encodePassword,
  checkPassword,
  generateAccessToken,
  generateRefreshToken,
};
