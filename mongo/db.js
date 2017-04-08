let mongoose = require('mongoose')
let connection = 'mongodb://localhost:27017/mongoose'
let Image = require('./Image')
let Tag = require('./Tag')

function saveImage (imgObj) {
  let image = new Image
}

module.exports = {
  saveImage: saveImage
}