let fs = require('fs')
let restrict = ['js', 'css', 'html', 'jpg']
// let url = require('url')

function getContentType (url) {
  let contentType = 'text/plain'

  if (url.endsWith('.css')) {
    contentType = 'text/css'
  } else if (url.endsWith('.js')) {
    contentType = 'application/javascript'
  }

  return contentType
}

module.exports = (req, res) => {
  let type = req.pathName.substring(req.pathName.lastIndexOf('.') + 1)
  let notAloed = restrict.indexOf(type) === -1

  if (notAloed) {
    res.writeHead(404)
    res.write('404 Not found')
    res.end()

    return true
  }

  fs.readFile('./content' + req.pathName, (err, data) => {
    if (err) {
      res.writeHead(404)
      res.write('404 Not found')
      res.end()

      return true
    }

    let contentType = getContentType(req.pathName)

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': data.length
    })
    res.write(data)
    res.end()
  })
}
