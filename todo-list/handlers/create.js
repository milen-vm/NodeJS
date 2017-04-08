const maxFileSize = 1e6
const stausMissingParameter = -1
const statusOverSizeLimit = -2
const statusInvalidImageFormat = -3

let fs = require('fs')
let ejs = require('ejs')
// let queryString = require('querystring')
let multiparty = require('multiparty')
let nav = require('./partial/nav')
let procesTodo = require('../modules/proces-todo')
let procesImage = require('../modules/proces-image')

module.exports = (req, res) => {
  if (req.pathName === '/create') {
    if (req.method === 'GET') {
      fs.readFile('./content/create.html', 'utf-8', (err, data) => {
        if (err) {
          console.log(err)
          res.writeHead(500)
          res.end()
        }

        let msg = ''
        if (req.GET['valid'] && parseInt(req.GET['valid']) === stausMissingParameter) {
          msg = 'Some parameters are missing or empty.'
        }

        if (req.GET['valid'] && parseInt(req.GET['valid']) === statusOverSizeLimit) {
          let maxFileSizeStr = (maxFileSize / (1024 * 1024)).toFixed(2)
          msg = `Max allowed image size ${maxFileSizeStr} Mb.`
        }

        if (req.GET['valid'] && parseInt(req.GET['valid']) === statusInvalidImageFormat) {
          msg = `Invalid image format. Allowed formats: ${procesImage.allowedFormats.join(', ')}.`
        }

        let renderedHtml = ejs.render(data, {nav: nav, msg: msg})

        res.writeHead(200, 'OK', {
          'Content-Type': 'text/html; charset=utf-8',
          'Content-Length': Buffer.byteLength(renderedHtml, 'utf8')
        })
        res.write(renderedHtml)
        res.end()
      })
    } else if (req.method === 'POST') {
      let todo = {}
      let form = new multiparty.Form()
      form.parse(req)

      form.on('error', (err) => {
        console.log(err)
        res.writeHead(500)
        res.end()
      })

      form.on('part', (part) => {
        if (part.byteCount > maxFileSize) {
          res.writeHead(302, 'Found', {
            'Location': '/create?valid=' + statusOverSizeLimit
          })
          res.end()
        }

        if (!part.filename) {
          let field = ''

          part.on('data', (data) => {
            field += data
          })

          part.on('end', () => {
            todo[part.name] = field
          })
          // part.resume()
        } else

        if (part.filename) {
          console.log(part.filename)
          if (!procesImage.isValidFormat(part.filename)) {
            res.writeHead(302, 'Found', {
              'Location': '/create?valid=' + statusInvalidImageFormat
            })
            res.end()
          }

          let file = ''
          part.setEncoding('binary')

          part.on('data', (data) => {
            file += data
          })

          part.on('end', () => {
            let uniqueFileName = procesImage.genUniqueName(part.filename, 7)
            fs.writeFileSync('./content/images/' + uniqueFileName, file, {encoding: 'binary'})
            todo[part.name] = uniqueFileName
          })
        } else {
          if (!procesImage.isValidFormat(part.filename)) {
            res.writeHead(302, 'Found', {
              'Location': '/create?valid=' + statusInvalidImageFormat
            })
            res.end()
          }
        }

        part.on('error', (err) => {
          res.writeHead(500)
          res.end()
        })
      })

      form.on('close', () => {
        if (procesTodo.save(todo)) {
          res.writeHead(302, 'Found', {
            'Location': '/create?valid=1'
          })
          res.end()
        } else {
          res.writeHead(302, 'Found', {
            'Location': '/create?valid=-1'
          })
          res.end()
        }
      })

      // let body = ''
      //
      // req.on('data', (data) => {
      //   body += data
      //
      //   if (body.length > 1e6) {
      //     req.connection.destroy()
      //   }
      // })
      //
      // req.on('end', () => {
      //   let post = queryString.parse(body)
      //
      //   if (procesTodo.save(post)) {
      //     res.writeHead(302, 'Found', {
      //       'Location': '/create?valid=1'
      //     })
      //     res.end()
      //   } else {
      //     res.writeHead(302, 'Found', {
      //       'Location': '/create?valid=-1'
      //     })
      //     res.end()
      //   }
      // })
    }

    return true
  } else {
    return false
  }
}
