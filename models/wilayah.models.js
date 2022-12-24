const db = require('../helpers/db')

const table = 'wilayah'

exports.createWilayah = (data) => {
  const sql = `INSERT INTO ${table} (nama, deskripsi, luas, geom) VALUES ($1, $2, $3, ST_GeometryFromText(MULTIPOLYGON($4))) RETURNING *`
  const params = [data.nama, data.area, data.level, data.luas]
  return db.query(sql, params)
}

exports.getListWilayah = (data) => {
  const sql = `SELECT id, ST_asGeoJSON(geom) as geom, nama, deskripsi, luas FROM ${table} WHERE nama LIKE '%${data.nama ?? ''}%'`
  return db.query(sql)
}

exports.getWilayah = (id) => {
  const sql = `SELECT * FROM ${table} WHERE id=$1`
  const params = [id]
  return db.query(sql, params)
}

exports.deleteWilayahById = (id) => {
  const sql = `DELETE FROM "${table}" WHERE id = $1`
  const params = [id]
  return db.query(sql, params)
}
