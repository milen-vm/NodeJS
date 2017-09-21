'use strict'

let db = require('./db')

let tag = db.saveTag({name: 'Picture5'})

// tag.then((item) => {
//   db.saveImage({
//     url: 'dir.bg',
//     description: 'Some text5',
//     tags: [item]
//   })
//   .then((item) => {
//     console.log(item)
//   })
// })

// let mongoose = require('mongoose')
// let connection = 'mongodb://localhost:27017/mongoose'
// let Image = require('./Image')
// let Tag = require('./Tag')

// mongoose.Promise = global.Promise

// let now = new Date()
//
// let tag = new Tag({
//   name: 'Photo',
//   creatinDate: now
// })

// let img = new Image({
//   url: 'abv.bg',
//   creationDate: now,
//   description: 'description',
//   tags: [tag]
// })

// mongoose
//   .connect(connection)
//   .then(() => {
//     console.log('MongoDB is up and running!')
//
//     tag
//       .save()
//       .catch((err) => {
//         console.log(err)
//       })
//       .then((item) => {
//         console.log(item)
//       })
//
//     img
//       .save()
//       .catch((err) => {
//         console.log(err)
//       })
//       .then((item) => {
//         console.log(item)
//       })
//   })
//     .catch((err) => {
//       console.log(err)
//     })
