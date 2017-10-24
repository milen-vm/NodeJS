const express = require('express')

let app = express()
let env = process.env.NODE_ENV || 'development'
let config = require('./server/confing/config')[env]

require('./server/confing/database')(config)
require('./server/confing/express')(config, app)
require('./server/confing/routes')(app)

console.log(process.env.NODE_ENV)

app.listen(config.port)
console.log('Express is ready on port: ' + config.port)
