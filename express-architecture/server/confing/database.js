const mongoose = require('mongoose')
mongoose.Promise = global.Promise

module.exports = (config) => {
  mongoose.connect(config.db)

  let db = mongoose.connection
  db.once('open', (err) => {
    if (err) {
      console.log(err)
    }

    console.log('MongoDB connection is ready!')
  })

  db.on('error', (err) => {
    console.log(err)
  })

  require('../models/user').seedAdminUser()
}
