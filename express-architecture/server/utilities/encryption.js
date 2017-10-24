const crypto = require('crypto')

module.exports = {
  generateSalt: () => {
    crypto.randomBytes(128).toString('base54')
  },
  generateHashedPassword: (salt, pwd) => {
    crypto.createHmac('sha256', salt).update(pwd).digest('hex')
  }
}
