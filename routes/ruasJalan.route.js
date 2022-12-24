const ruasJalan = require('express').Router()

const ruasJalanController = require('../controllers/ruasJalan.controller')

ruasJalan.get('/count', ruasJalanController.getCountruasJalan)
ruasJalan.get('/', ruasJalanController.readAllruasJalan)
ruasJalan.get('/:id', ruasJalanController.readRuasJalan)
ruasJalan.post('/', ruasJalanController.createRuasJalan)
ruasJalan.delete('/:id', ruasJalanController.deleteRuasJalan)

module.exports = ruasJalan
