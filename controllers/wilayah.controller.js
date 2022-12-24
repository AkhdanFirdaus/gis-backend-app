const wilayahModel = require('../models/wilayah.models')

exports.createWilayah = async (req, res) => {
  try {
    const insert = await wilayahModel.createWilayah(req.body)
    const wilayah = insert.rows[0]
    return res.json({
      success: true,
      message: 'Create wilayah successfully',
      result: wilayah
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
    if (req.query['type']) {
      const geojsonWilayah = await wilayahModel.getGeoJSONWilayah()
      return res.json({
        success: true,
        message: 'geojson wilayah',
        results: geojsonWilayah.rows[0].jsonb_build_object
      })
    }

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
      results: listWilayah.rows
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
      result: wilayah.rows[0]
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
      result: wilayah.rows[0]
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error : ' + err.message
    })
  }
}

exports.getCountWilayah = async (req, res) => {
  try {
    const wilayah = await wilayahModel.getListWilayah(req.query)
    return res.json({
      success: true,
      message: 'Get count wilayah successfully',
      result: wilayah.rows.length
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error : ' + err.message,
      result: 0
    })
  }
}
