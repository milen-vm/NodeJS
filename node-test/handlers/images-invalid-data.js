let fs = require('fs')
let ejs = require('ejs')
let navigation = require('../models/navigation')

module.exports = (req, res) => {
  if (req.pathName === '/images/invalid-data') {
    fs.readFile('./content/images/invalid-data.html', 'utf-8', (err, data) => {
      if (err) {
        console.log(err)
        res.writeHead(500)
        res.end()

        return
      }

      let renderedHtml = ejs.render(data, {nav: navigation})

      res.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': renderedHtml.length
      })
      res.write(renderedHtml)
      res.end()
    })
  } else {
    return true
  }
}
