let fs = require('fs')
let ejs = require('ejs')
let queryString = require('querystring')
// npm install qs --save
// var qs = require('qs'); for nested data - arrays and multi daymentional arrays
let images = require('../models/images')
let imageList = images.imageList
let navigation = require('../models/navigation')

function validateImageData (post) {
  let error = ''
  if (!post['name'] || !post['name'].trim().length) {
    error += 'Image Name is missing or empty.'
  }

  if (!post['url'] || !post['url'].trim().length) {
    error += error !== '' ? ' ' : ''
    error += 'Image URL is missing or empty.'
  }

  return {
    isValid: error === '',
    error: error
  }
}

module.exports = (req, res) => {
  if (req.pathName === '/images/form') {
    if (req.method === 'GET') {
      fs.readFile('./content/images/form.html', 'utf-8', (err, data) => {
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
      let body = ''

      req.on('data', (data) => {
        body += data

        // Too much POST data, kill the connection!
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (body.length > 1e6) {
          req.connection.destroy()
        }
      })

      req.on('end', () => {
        let post = queryString.parse(body)
        let validate = validateImageData(post)

        if (validate['isValid']) {
          imageList.push({name: post.name, url: post.url})

          fs.readFile('./content/images/form.html', 'utf-8', (err, data) => {
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
          res.writeHead(302, {
            'Location': '/images/invalid-data'
          })
          res.end()
        }
      })
    }
  } else {
    return true
  }
}
