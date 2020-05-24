/**
 * For authentication tokens
 */
const { sign } = require('jsonwebtoken')
/**
 * Bring the secrest of our token
 */
const { JWT_SECRET } = require('../config')

/**
 * function in which we return the token along with its duration
 * @param {object} user the user with whom we make the token
 * @return {object} Authentication token encrypting the user object with our secret password
 */
module.exports.generateToken = function (user) {
  //We create the authentication token by encrypting the user object with our secret password and giving it an expiration time of 4h
  return sign({ user }, JWT_SECRET, { expiresIn: '4h' })
}
