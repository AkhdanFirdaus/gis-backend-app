const db = require('../helpers/db')

const table = 'wilayah'

exports.getWilayah = (data) => {
  const sql = `SELECT * FROM ${table} WHERE name LIKE ${data.search}`
  return db.query(sql)
}

exports.createWilayah = (data) => {
  const sql = `INSERT INTO ${table} (nama, area, level, luas) VALUES ($1, $2, $3, $4) RETURNING *`
  const params = [data.nama, data.area, data.level, data.luas]
  return db.query(sql, params)
}

