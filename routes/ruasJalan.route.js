const ruasJalan = require('express').Router()

const ruasJalanController = require('../controllers/ruasJalan.controller')

ruasJalan.get('/', ruasJalanController.readAllruasJalan)
ruasJalan.get('/:id', ruasJalanController.readRuasJalan)
ruasJalan.get('/count', ruasJalanController.getCountruasJalan)
ruasJalan.post('/', ruasJalanController.createRuasJalan)
ruasJalan.delete('/:id', ruasJalanController.deleteRuasJalan)

module.exports = ruasJalan
