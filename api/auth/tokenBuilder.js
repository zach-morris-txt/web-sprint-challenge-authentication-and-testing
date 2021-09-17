//Imports
const jwt = require('jsonwebtoken')
const { SECRET } = require('../../config/secrets')


//Exports
module.exports = function (user) {
  const payload = {
    subject: user.id,
    username: user.username,
    password: user.password,
  }
  const options = {
    expiresIn: '1d',
  }
  const token = jwt.sign(
    payload,
    SECRET,
    options, 
  )
  return token
}