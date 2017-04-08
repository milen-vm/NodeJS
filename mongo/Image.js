let mongoose = require('mongoose')
let Tag = require('./Tag')

let imageSchema = new mongoose.Schema({
  url: String,
  creationDate: Date,
  description: {type: String, default: 'Photo'},
  tags: [Tag.schema]
})

let Image = mongoose.model('Image', imageSchema)

module.exports = Image
