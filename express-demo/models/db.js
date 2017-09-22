'use strict'

const connection = 'mongodb://localhost:27017/mongoose'
let mongoose = require('mongoose')
let dbConnection = mongoose.connect(connection)

mongoose.Promise = global.Promise

module.exports = {
  dbConnection: dbConnection,
  mongoose: mongoose
}
