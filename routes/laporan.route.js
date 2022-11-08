const laporan = require('express').Router()
const laporanController = require('../controllers/laporan.controller')

laporan.get('/', laporanController.readAllLaporan)
laporan.get('/:id', laporanController.readLaporan)
laporan.post('/', laporanController.createLaporan)
laporan.delete('/:id', laporanController.deleteLaporan)

module.exports = laporan
