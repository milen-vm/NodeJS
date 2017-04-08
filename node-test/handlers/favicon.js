let fs = require('fs')

module.exports = (req, res) => {
  if (req.pathName === '/favicon.ico') {
    fs.readFile('./content/favicon.ico', (err, data) => {
      if (err) {
        console.log(err)
        return
      }

      res.writeHead(200)
      res.write(data)
      res.end()
    })
  } else {
    return true
  }
}
