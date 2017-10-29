const controllers = require('../controllers')
const auth = require('../confing/auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/about', controllers.home.about)

  app.get('/users/register', controllers.users.register)
  app.get('/users/login', controllers.users.login)
  app.post('/users/create', controllers.users.create)
  app.post('/users/authenticate', controllers.users.authenticate)
  app.post('/users/logout', controllers.users.logout)

  app.get('/articles/create', auth.isAuthenticated, controllers.articles.create)
  // app.use(auth.isInRole('Admin'))   // use middleware for several routes
  // app.get('/articles/create', auth.isInRole('Admin'), controllers.articles.create)   // role authorisation

  app.all('*', (req, res) => {
    res.status(404)
    res.send('Not Found')
    res.end()
  })
}
