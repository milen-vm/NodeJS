let fs = require('fs')
let ejs = require('ejs')
let nav = require('./partial/nav')
let procesTodo = require('../modules/proces-todo')

module.exports = (req, res) => {
  if (req.pathName === '/all') {
    fs.readFile('./content/all.html', 'utf-8', (err, data) => {
      if (err) {
        console.log(err)
        res.writeHead(500)
        res.end()
      }

      let todos = procesTodo.getSorted()

      let renderedHtml = ejs.render(data, {nav: nav, todos: todos})

      res.writeHead(200, 'OK', {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Length': Buffer.byteLength(renderedHtml, 'utf8')
      })
      res.write(renderedHtml)
      res.end()
    })

    return true
  } else {
    return false
  }
}
