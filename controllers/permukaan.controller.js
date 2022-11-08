const permukaanModel = require('../models/permukaan.model')

exports.createPermukaan = async (req, res) => {
  try {
    const insert = await permukaanModel.createPermukaan(req.body)
    const permukaan = insert.rows[0]
    return res.json({
      success: true,
      message: 'Create permukaan successfully',
      results: permukaan
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error : ' + err.message
    })
  }
}

exports.readAllPermukaan = async (req, res) => {
  try {
    const listPermukaan = await permukaanModel.getPermukaan(req.query)
    const pageInfo ={
      page: req.query.page,
      limit: req.query.limit,
      totalPage: Math.ceil(listPermukaan.rowCount / req.query.limit)
    }
    return res.json({
      success: true,
      message: 'List all permukaan',
      pageInfo,
      results: listPermukaan.rows
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error : ' + err.message
    })
  }
}

exports.readPermukaan = async (req, res) => {
  try {
    const permukaan = await permukaanModel.getPermukaanById(req.params.id)
    if (!permukaan.rows[0]) {
      throw new Error('Permukaan not found')
    }
    return res.json({
      success: true,
      message: 'Permukaan successfully retreived',
      results: permukaan.rows[0]
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error : ' + err.message
    })
  }
}

exports.deletePermukaan = async (req, res) => {
  try {
    const permukaan = await permukaanModel.deletePermukaanById(req.params.id)
    return res.json({
      success: true,
      message: 'Delete permukaan successfully',
      results: permukaan.rows[0]
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error : ' + err.message
    })
  }
}
