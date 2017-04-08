let fs = require('fs')
let ejs = require('ejs')
let nav = require('./partial/nav')

module.exports = (req, res) => {
  if (req.pathName === '/') {
    fs.readFile('./content/home.html', 'utf-8', (err, data) => {
      if (err) {
        console.log(err)
        res.writeHead(500)
        res.end()
      }

      let renderedHtml = ejs.render(data, {nav: nav})

      res.writeHead(200, 'OK', {
        'Content-Type': 'text/html',
        'Content-Length': renderedHtml.length
      })
      res.write(renderedHtml)
      res.end()
    })

    return true
  } else {
    return false
  }
}
