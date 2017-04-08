let fs = require('fs')

module.exports = (req, res) => {

  if (req.pathName === '/') {
    fs.readFile('./content/index.html', (err, data) => {
      if (err) {
        console.log(err)
        return
      }

      res.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': data.length
      })
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}
