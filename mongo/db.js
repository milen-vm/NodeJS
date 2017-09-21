'usse strict'

let mongoose = require('mongoose')
let connection = 'mongodb://localhost:27017/mongoose'
let Image = require('./Image')
let Tag = require('./Tag')

mongoose.Promise = global.Promise

let dbConection = mongoose.connect(connection)

function saveImage (img) {
  dbConection.then(() => {
    let now = new Date()
    let imageItem = new Image({
      url: img.url,
      creationDate: now,
      description: img.description,
      tags: img.tags
    })

    imageItem
      .save()
      .catch((err) => {
        console.log(err)
      })

    return imageItem
  })
}

function saveTag (tag) {
  dbConection.then(() => {
    let now = new Date()
    let tagItem = new Tag({
      name: tag.name,
      creatinDate: now
    })

    tagItem
      .save()
      .catch((err) => {
        console.log(err)
      })
console.log(tagItem)
    return tagItem
  })
}

module.exports = {
  saveImage: saveImage,
  saveTag: saveTag
}
