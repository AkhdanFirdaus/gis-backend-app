const permukaan = require('express').Router()

const permukaanController = require('../controllers/permukaan.controller')

permukaan.get('/', permukaanController.readAllPermukaan)
permukaan.get('/:id', permukaanController.readPermukaan)
permukaan.post('/', permukaanController.createPermukaan)
permukaan.delete('/:id', permukaanController.deletePermukaan)

module.exports = permukaan
