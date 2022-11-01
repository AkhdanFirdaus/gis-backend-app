const routes = require('express').Router()

routes.use('/users', require('./users.route'))
routes.use('/auth', require('./auth.route'))

module.exports = routes
