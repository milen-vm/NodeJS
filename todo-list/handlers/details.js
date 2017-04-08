let fs = require('fs')
let ejs = require('ejs')
let nav = require('./partial/nav')
let procesTodo = require('../modules/proces-todo')

module.exports = (req, res) => {
  let match = /^\/details\/(\d+)$/.exec(req.pathName)

  if (match !== null) {
    let id = parseInt(match[1])

    fs.readFile('./content/details.html', 'utf-8', (err, data) => {
      if (err) {
        console.log(err)
        res.writeHead(500)
        res.end()
      }

      let msg = ''
      if (req.GET['comment'] && parseInt(req.GET['comment']) === -1) {
        msg = 'Invalid! Comment cannot be empty.'
      }

      let todo = procesTodo.getById(id)
      let revState = todo.state === 'Done' ? 'Pending' : 'Done'
      let renderedHtml = ejs.render(data, {nav: nav, todo: todo, revState: revState, comments: todo.comments, msg: msg})

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
