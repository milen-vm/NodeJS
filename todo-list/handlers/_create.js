let fs = require('fs')
let ejs = require('ejs')
let queryString = require('querystring')
let multiparty = require('multiparty')
let nav = require('./partial/nav')
let procesTodo = require('../modules/porces-todo')

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
        if (req.GET['valid'] && parseInt(req.GET['valid']) === -1) {
          msg = 'Some parameters are missing or empty.'
        }

        let renderedHtml = ejs.render(data, {nav: nav, msg: msg})

        res.writeHead(200, 'OK', {
          'Content-Type': 'text/html',
          'Content-Length': renderedHtml.length
        })
        res.write(renderedHtml)
        res.end()
      })
    } else if (req.method === 'POST') {
      let body = ''

      req.on('data', (data) => {
        body += data

        if (body.length > 1e6) {
          req.connection.destroy()
        }
      })

      req.on('end', () => {
        let post = queryString.parse(body)

        if (procesTodo.save(post)) {
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
      // let form = new multiparty.Form({autoFiles: false})
      //
      // form.on('part', (part) => {
      //   if (part.filename) {
      //
      //   } else {
      //     if (fields.indexOf(part.name) > -1) {
      //       let value = ''
      //
      //       part.setEncoding('utf-8')
      //       part.on('data', (data) => {
      //         value += data
      //       })
      //       part.on('end', () => {
      //         procesTodo.set(part.name, value)
      //       })
      //     }
      //   }
      // })
      //
      // form.on('close', () => {
      // })
      //
      // form.parse(req)
      //
      // console.log(procesTodo.get)
      // res.writeHead(302, 'Found', {
      //   'Location': '/create?submited=true'
      // })
      // res.end()
    }

    return true
  } else {
    return false
  }
}
