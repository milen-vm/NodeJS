let http = require('http')
let port = 1337
let handlers = require('./handlers/index')
let url = require('url')

http
  .createServer((req, res) => {
    let urlObj = url.parse(req.url, true)
    req.pathName = urlObj.pathname
    req.GET = urlObj.query

    for (let handler of handlers) {
      let next = handler(req, res)

      if (!next) {
        break
      }
    }
  })
  .listen(port)

console.log(`Server listening on port ${port}`)
