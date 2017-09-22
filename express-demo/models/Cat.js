'use strict'

let db = require('./db')
let dbConnecton = db.dbConnection
let mongoose = db.mongoose

let catSchema = new mongoose.Schema({
  name: {type: String, required: true},
  color: {type: String}
})

let Cat = mongoose.model('Cat', catSchema)

module.exports = Cat
