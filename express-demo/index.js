'use strict'

const port = 1337
let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let path = require('path')

app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use((req, res, next) => {
  console.log('Middleware')
  next()
})

app.get('/', (req, res) => {
  res.render('index', {myArray: [1, 3, 7, 5], title: 'Заглавие'})
})

app.get('/one/:id/two/:num', (req, res) => {
  res.send(req.params)
})

app.post('/create', (req, res) => {
  console.log(req.body)
  res.send('Ok')
})

app.listen(port)

console.log(`Application is runing on port ${port}`)
