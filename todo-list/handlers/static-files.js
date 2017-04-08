let fs = require('fs')
let allowedImages = require('../modules/proces-image').allowedFormats
let allowedFiles = ['js', 'css', 'html']
let allowed = allowedFiles.concat(allowedImages)
// let url = require('url')
// TODO
function getContentType (url) {
  let contentType = 'text/plain'
  let ext = url.substring(url.lastIndexOf('.') + 1)

  switch (ext) {
    case 'css':
      contentType = 'text/css'
      break
    case 'js':
      contentType = 'application/javascript'
      break
    case 'html':
      contentType = 'text/html; charset=utf-8'
      break
    case 'jpg':
    case 'jpeg':
      contentType = 'image/jpeg'
      break
    case 'png':
    case 'gif':
      contentType = 'image/' + ext
  }

  return contentType
}

module.exports = (req, res) => {
  let type = req.pathName.substring(req.pathName.lastIndexOf('.') + 1)
  let notAloed = allowed.indexOf(type) === -1

  if (notAloed) {
    return false
  }

  fs.readFile('./content' + req.pathName, (err, data) => {
    if (err) {
      console.log(err)
      return false
    }

    let contentType = getContentType(req.pathName)
// TODO
    res.writeHead(200, {
      'Content-Type': contentType
      // 'Content-Length': data.length
    })
    res.write(data)
    res.end()
  })

  return true
}
