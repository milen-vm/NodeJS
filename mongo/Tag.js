let mongoose = require('mongoose')

let tagSchema = new mongoose.Schema({
  name: {type: String, unique: true, required: true},
  creatinDate: Date,
  images: []
})

let Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag
