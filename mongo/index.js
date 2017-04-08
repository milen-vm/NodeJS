let mongoose = require('mongoose')
let connection = 'mongodb://localhost:27017/mongoose'
let Image = require('./Image')
let Tag = require('./Tag')

mongoose.Promise = global.Promise

let now = new Date()

let tag = new Tag({
  name: 'Photo',
  creatinDate: now
})

let img = new Image({
  url: 'abv.bg',
  creationDate: now,
  description: 'description',
  tags: [tag]
})

mongoose
  .connect(connection)
  .then(() => {
    'use strict'
    console.log('MongoDB is up and running!')

    tag
      .save()
      .catch((err) => {
        console.log(err)
      })
      .then((item) => {
        console.log(item)
      })

    img
      .save()
      .catch((err) => {
        console.log(err)
      })
      .then((item) => {
        console.log(item)
      })
  })
