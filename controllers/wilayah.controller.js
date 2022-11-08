const wilayahModel = require('../models/wilayah.models')

exports.createWilayah = async (req, res) => {
  try {
    const insert = await wilayahModel.createWilayah(req.body)
    const wilayah = insert.rows[0]
    return res.json({
      success: true,
      message: 'Create wilayah successfully',
      results: wilayah
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error : ' + err.message
    })
  }
}

exports.readAllWilayah = async (req, res)  => {
  try {
    const listWilayah = await wilayahModel.getListWilayah(req.query)
    
    const pageInfo = {
      page: req.query.page,
      limit: req.query.limit,
      totalPage: Math.ceil(listWilayah.rowCount / req.query.limit)
    }

    return res.json({
      success: true,
      message: 'List all wilayah',
      pageInfo,
      result: listWilayah.rows
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error : ' + err.message
    })
  }
}

exports.readWilayah = async (req, res) => {
  try {
    const wilayah = await wilayahModel.getWilayah(req.params.id)
    if (!wilayah.rows[0]) {
      throw new Error('Wilayah not found')
    }
    return res.json({
      success: true,
      message: 'Wilayah successfully retreived',
      results: wilayah.rows[0]
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error : ' + err.message
    })
  }
}

exports.deleteWilayah = async (req, res) => {
  try {
    const wilayah = await wilayahModel.deleteWilayahById(req.params.id)
    return res.json({
      success: true,
      message: 'Delete wilayah successfully',
      results: wilayah.rows[0]
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error : ' + err.message
    })
  }
}
