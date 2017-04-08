let http = require('http')
let url = require('url')
let cluster = require('cluster')
let cpus = require('os').cpus().length
let port = 1338
let handlers = require('./handlers/index')

if (cluster.isMaster) {
  for (let i = 0; i < cpus; i++) {
    cluster.fork()

    cluster.on('close', (worker) => {
      worker.fork()
    })
  }
} else {
  http
    .createServer((req, res) => {
      let urlObj = url.parse(req.url, true)
      req.pathName = urlObj.pathname
      req.GET = urlObj.query
      let notFound = true

      for (let handler of handlers) {
        let isHandled = handler(req, res)

        if (isHandled) {
          notFound = false
          break
        }
      }

      if (notFound) {
        res.writeHead(404, 'Not Found')
        res.write('Not Found')
        res.end()
      }
    })
    .listen(port)

  console.log(`Server listening on port ${port}`)
}
