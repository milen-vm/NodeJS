let queryString = require('querystring')
let procesTodo = require('../modules/proces-todo')

module.exports = (req, res) => {
  let match = /^\/details\/(\d+)\/comment$/.exec(req.pathName)

  if (match !== null) {
    if (req.method === 'POST') {
      let id = parseInt(match[1])
      let body = ''

      req.on('data', (data) => {
        body += data

        if (body.length > 1e6) {
          req.connection.destroy()
        }
      })

      req.on('end', () => {
        let post = queryString.parse(body)
        let comment = post['comment'] ? post['comment'].trim() : ''

        if (comment) {
          procesTodo.addComment(id, comment)

          res.writeHead(302, 'Found', {
            'Location': `/details/${id}?comment=1`
          })
          res.end()
        } else {
          res.writeHead(302, 'Found', {
            'Location': `/details/${id}?comment=-1`
          })
          res.end()
        }
      })
    } else {
      // TODO
    }

    return true
  } else {
    return false
  }
}
