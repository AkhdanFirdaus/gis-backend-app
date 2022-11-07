const routes = require('express').Router()

routes.use('/users', require('./users.route'))
routes.use('/auth', require('./auth.route'))
routes.use('/wilayah', require('./wilayah.route'))

module.exports = routes
