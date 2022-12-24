const wilayah = require('express').Router()

const wilayahController = require('../controllers/wilayah.controller')

wilayah.get('/count', wilayahController.getCountWilayah)
wilayah.get('/', wilayahController.readAllWilayah)
wilayah.get('/:id', wilayahController.readWilayah)
wilayah.post('/', wilayahController.createWilayah)
wilayah.delete('/:id', wilayahController.deleteWilayah)

module.exports = wilayah
