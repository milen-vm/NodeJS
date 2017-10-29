const encryption = require('../utilities/encryption')
let User = require('mongoose').model('User')

module.exports = {
  register: (req, res) => {
    res.render('users/register')
  },
  create: (req, res) => {
    let userReq = req.body
    User
      .find({username: userReq.username}, (err, user) => {
        if (err) {
          console.log(err)
          return
        }

        if (user) {
          userReq.globalError = 'Username is already exists!'
          res.render('users/register', userReq)
        }
      })

    // const query = User.findOne({username: userReq.username}, null);
    // let userResult = await query.exec();
    //
    // if (userResult) {
    //   userReq.globalError = 'Username is already exists!'
    //   res.render('users/register', userReq)
    //
    //   return
    // }

    if (userReq.password !== userReq.confirmPassword) {
      userReq.globalError = 'Passwords do not match!'
      res.render('users/register', userReq)

      return
    }

    userReq.salt = encryption.generateSalt()
    userReq.hashedPass = encryption.generateHashedPassword(userReq.salt, userReq.password)

    User
      .create(userReq)
      .then((user) => {
        req.logIn(user, (err, user) => {
          if (err) {
            res.render('users/register', {globalError: 'Oops server error!'})

            return
          }

          res.redirect('/')
        })
      })
  },
  login: (req, res) => {
    res.render('users/login')
  },
  authenticate: (req, res) => {
    let userReq = req.body

    User
      .findOne({username: userReq.username})
      .then((user) => {
        if (!user.authenticate(userReq.password)) {
          res.render('users/login', {globalError: 'Invalid username or password!'})
        } else {
          req.logIn(user, (err, user) => {
            if (err) {
              console.log(err)
              res.render('users/login', {globalError: 'Server error, cannot login!'})

              return
            }

            res.redirect('/')
          })
        }
      })
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  }
}
