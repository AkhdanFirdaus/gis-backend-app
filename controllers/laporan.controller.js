const laporanModel = require('../models/laporan.model')

exports.createLaporan = async (req, res) => {
  try {
    const insert = await laporanModel.createLaporan(req.body)
    const laporan = insert.rows[0]
    return res.json({
      success: true,
      message: 'Create laporan successfully',
      results: laporan
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error : ' + err.message
    })
  }
}

exports.readAllLaporan = async (req, res) => {
  try {
    const listLaporan = await laporanModel.getLaporan(req.query)
    const pageInfo ={
      page: req.query.page,
      limit: req.query.limit,
      totalPage: Math.ceil(listLaporan.rowCount / req.query.limit)
    }
    return res.json({
      success: true,
      message: 'List all laporan',
      pageInfo,
      results: listLaporan.rows
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error : ' + err.message
    })
  }
}

exports.readLaporan = async (req, res) => {
  try {
    const laporan = await laporanModel.getLaporanById(req.params.id)
    if (!laporan.rows[0]) {
      throw new Error('laporan not found')
    }
    return res.json({
      success: true,
      message: 'laporan successfully retreived',
      results: laporan.rows[0]
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error : ' + err.message
    })
  }
}

exports.deleteLaporan = async (req, res) => {
  try {
    const laporan = await laporanModel.deleteLaporanById(req.params.id)
    return res.json({
      success: true,
      message: 'Delete laporan successfully',
      results: laporan.rows[0]
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error : ' + err.message
    })
  }
}
