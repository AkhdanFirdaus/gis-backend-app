const wilayah = require('express').Router()

const wilayahController = require('../controllers/wilayah.controller')

wilayah.use('/:id', wilayahController.readWilayah)
wilayah.use('/', wilayahController.readAllWilayah)

module.exports = wilayah
