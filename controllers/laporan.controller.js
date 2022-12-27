const laporanModel = require('../models/laporan.model')
const userModel = require('../models/users.model')

exports.createLaporan = async (req, res) => {
  try {
    const findUser = await userModel.selectUserByEmail(req.body.email)
    if (!findUser.rows[0]) {
      const user = await userModel.insertUser(req.body)
      console.log(user.rows[0])
      req.body.pelapor_uid = user.rows[0].uid
    } else {
      console.log(findUser.rows[0])
      req.body.pelapor_uid = findUser.rows[0].uid
    }
    console.log(req.body)
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
    const pageInfo = {
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

exports.getCountLaporan = async (req, res) => {
  try {
    const laporan = await laporanModel.getLaporan(req.query)
    return res.json({
      success: true,
      message: 'Get count laporan successfully',
      result: laporan.rows.length
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error : ' + err.message,
      result: 0
    })
  }
}
