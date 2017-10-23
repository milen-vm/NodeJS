const express = require('express')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
let app = express()
let env = process.env.NODE_ENV || 'development'
let config = require('./server/confing/config')[env]
console.log(env)

app.set('view engine', 'pug')
app.set('views', './server/views')
app.use(express.static('public'))

app.get('/', (req, res) => {
  mongoose.connect(config.db)
    .then(() => {
      console.log('MongoDB is ready!')
    })
  console.log(env)
  res.render('index')
})

app.listen(config.port)
console.log('Express is ready on port: ' + config.port)
