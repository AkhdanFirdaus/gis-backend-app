const ruasJalanModel = require('../models/ruasJalan.model')

exports.createRuasJalan = async (req, res) => {
  try {
    const insert = await ruasJalanModel.createRuasJalan(req.body)
    const ruasJalan = insert.rows[0]
    return res.json({
      success: true,
      message: 'Create ruasJalan successfully',
      result: ruasJalan
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error : ' + err.message
    })
  }
}

exports.readAllruasJalan = async (req, res)  => {
  try {
    if (req.query['type']) {
      const geojsonRuasJalan = await ruasJalanModel.getGeoJSONRuasJalan()
      return res.json({
        success: true,
        message: 'geojson ruas jalan',
        results: geojsonRuasJalan.rows[0].jsonb_build_object
      })
    }

    if (req.query['wilayah_id']) {
      const ruasJalanWilayah = await ruasJalanModel.getRuasJalanByWilayah(req.query.wilayah_id)
      return res.json({
        success: true,
        message: `berhasil mendapatkan ruas jalan di wilayah ${req.query.wilayah_id}`,
        results: ruasJalanWilayah.rows
      })
    }

    const listRuasJalan = await ruasJalanModel.getListRuasJalan(req.query)
    
    const pageInfo = {
      page: req.query.page,
      limit: req.query.limit,
      totalPage: Math.ceil(listRuasJalan.rowCount / req.query.limit)
    }

    return res.json({
      success: true,
      message: 'List all ruas jalan',
      pageInfo,
      results: listRuasJalan.rows
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error : ' + err.message
    })
  }
}

exports.readRuasJalan = async (req, res) => {
  try {
    const ruasJalan = await ruasJalanModel.getRuasJalan(req.params.id)
    if (!ruasJalan.rows[0]) {
      throw new Error('ruas jalan not found')
    }
    return res.json({
      success: true,
      message: 'ruas jalan successfully retreived',
      result: ruasJalan.rows[0]
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error : ' + err.message
    })
  }
}

exports.deleteRuasJalan = async (req, res) => {
  try {
    const ruasJalan = await ruasJalanModel.deleteRuasJalanById(req.params.id)
    return res.json({
      success: true,
      message: 'Delete ruasJalan successfully',
      result: ruasJalan.rows[0]
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error : ' + err.message
    })
  }
}

exports.getCountruasJalan = async (req, res) => {
  try {
    const ruasJalan = await ruasJalanModel.getListRuasJalan(req.query)
    return res.json({
      success: true,
      message: 'Get count ruasJalan successfully',
      result: ruasJalan.rows.length
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error : ' + err.message,
      result: 0
    })
  }
}
