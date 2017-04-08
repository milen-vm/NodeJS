let fs = require('fs')
let ejs = require('ejs')
let nav = require('./partial/nav')
let procesTodo = require('../modules/proces-todo')

module.exports = (req, res) => {
  if (req.pathName === '/status') {
    fs.readFile('./content/status.html', 'utf-8', (err, data) => {
      if (err) {
        console.log(err)
        res.writeHead(500)
        res.end()
      }

      let authorize = (req.headers['my-authorization'] && req.headers['my-authorization'] === 'admin') ? true : false
      let renderedHtml = ''

      if (authorize) {
        let todosCount = procesTodo.getTodosCount()
        let commentsCount = procesTodo.getCommentsCount()
        renderedHtml = ejs.render(data, {nav: nav, todosCount: todosCount, commentsCount: commentsCount, authorize: authorize})
      } else {
        renderedHtml = ejs.render(data, {nav: nav, authorize: authorize})
      }

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
