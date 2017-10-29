const mongoose = require('mongoose')
const encription = require('../utilities/encryption')
const adminPass = 'admin123'

let requiredValidationMessage = '{PATH} is required'

let userSchema = mongoose.Schema({
  username: {type: String, required: requiredValidationMessage, unique: true},
  firstName: {type: String, required: true, message: requiredValidationMessage},
  lastName: {type: String, required: true, message: requiredValidationMessage},
  salt: String,
  hashedPass: String,
  roles: [String]
})

userSchema.method({
  authenticate: (password) => {
    return encription.generateHashedPassword(this.salt, password) === this.hashedPass
  }
})

let User = mongoose.model('User', userSchema)

module.exports.seedAdminUser = () => {
  User.find({username: 'Admin'}).then((users) => {
    if (users.length === 0) {
      let salt = encription.generateSalt()
      let hashedPass = encription.generateHashedPassword(salt, adminPass)

      User.create({
        username: 'Admin',
        firstName: 'Admin',
        lastName: 'Admin',
        salt: salt,
        hashedPass: hashedPass,
        roles: ['Admin']
      })
    }
  }, (err) => {
    console.log(err)
  })
}
