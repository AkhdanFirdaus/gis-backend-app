const db = require('../helpers/db')

const table = 'wilayah'

exports.createWilayah = (data) => {
  const sql = `INSERT INTO ${table} (nama, area, level, luas) VALUES ($1, $2, $3, ST_GeometryFromText(POLYGON($4))) RETURNING *`
  const params = [data.nama, data.area, data.level, data.luas]
  return db.query(sql, params)
}

exports.getListWilayah = (data) => {
  const sql = `SELECT * FROM ${table} WHERE nama LIKE $1 LIMIT $2`
  const params = [data.search, data.limit]
  return db.query(sql, params)
}

exports.getWilayah = (id) => {
  const sql = `SELECT * FROM ${table} WHERE uid=$1`
  const params = [id]
  return db.query(sql, params)
}

exports.deleteWilayahById = (id) => {
  const sql = `DELETE FROM "${table}" WHERE uid = $1`
  const params = [id]
  return db.query(sql, params)
}
