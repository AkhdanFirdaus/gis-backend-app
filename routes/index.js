const routes = require('express').Router()

routes.use('/users', require('./users.route'))
routes.use('/auth', require('./auth.route'))
routes.use('/wilayah', require('./wilayah.route'))
routes.use('/ruas-jalan', require('./ruasJalan.route'))
routes.use('/permukaan', require('./permukaan.route'))
routes.use('/laporan', require('./laporan.route'))

module.exports = routes
