let procesTodo = require('../modules/proces-todo')

module.exports = (req, res) => {
  if (req.pathName === '/rev-state') {
    if (req.method === 'POST') {
      let idObjJson = ''

      req.on('data', (data) => {
        idObjJson += data
      })

      req.on('end', () => {
        let idObj = JSON.parse(idObjJson)

        if (idObj.id) {
          let todo = procesTodo.getById(idObj.id)
          let revState = ''

          if (todo.state === 'Done') {
            todo.state = 'Pending'
            revState = 'Done'
          } else if (todo.state === 'Pending') {
            todo.state = 'Done'
            revState = 'Pending'
          } else {
            throw new Error('Invalid todo state.')
          }

          procesTodo.save(todo, false)
          let stateObjJson = JSON.stringify({state: todo.state, revState: revState})

          res.writeHead(200, 'OK', {
            'Content-Type': 'text/json; charset=utf-8',
            'Content-Length': Buffer.byteLength(stateObjJson, 'utf8')
          })
          res.write(stateObjJson)
          res.end()
        }
      })
    } else {
      res.writeHead(400, 'Bad Reuest')
      res.end()
    }

    return true
  } else {
    return false
  }
}
