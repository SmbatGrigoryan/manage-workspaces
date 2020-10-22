const {promisify} = require('util');
const jwt = require('jsonwebtoken');

module.exports = {
  jwtSign: promisify(jwt.sign),
  jwtVerify: promisify(jwt.verify)
};
