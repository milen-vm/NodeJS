const mongoose = require('mongoose')
mongoose.Promise = global.Promise

module.exports = (config) => {
  mongoose.connect(config.db)

  let db = mongoose.connection
  db.once('open', (err) => {
    if (err) {
      console.log('DB open error: ' + err)
    }

    console.log('MongoDB connection is ready!')
  })

  db.on('error', (err) => {
    console.log('Database error: ' + err)
  })

  require('../models/User').seedAdminUser()
}

// module.exports = (config) => {
//   let promise = mongoose.createConnection(config.db, {useMongoClient: true})
//
//   promise.once('open', (err) => {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log('MongoDB connection is ready!')
//     }
//   })
//
//   promise.on('error', (err) => {
//     console.log(err)
//   })
//
//   require('../models/User').seedAdminUser()
// }
