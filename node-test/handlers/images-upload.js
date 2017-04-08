let fs = require('fs')
let ejs = require('ejs')
let queryString = require('querystring')
let navigation = require('../models/navigation')
let multiparty = require('multiparty')

module.exports = (req, res) => {
  if (req.pathName === '/images/upload') {
    if (req.method === 'GET') {
      fs.readFile('./content/images/upload.html', 'utf-8', (err, data) => {
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
    } else if (req.method === 'POST') {
      let form = new multiparty.Form()
      form.parse(req)

      form.on('part', (part) => {
        if (part.filename) {
          let body = ''

          part.setEncoding('binary')
          part.on('data', (data) => {
            body += data
          })

          part.on('end', () => {
            fs.writeFile('./uploads/' + part.filename, body, (err) => {
              if (err) {
                console.log(err)
                res.writeHead(500)
                res.end()

                return
              }

              res.writeHead(302, {
                'Location': '/images/upload?uploaded=true'
              })
              res.end()

              return
            })
          })
        } else {
          part.resume()
        }
      })
    }
  } else {
    return true
  }
}

