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

exports.getGeoJSONWilayah = () => {
  const sql = `
    SELECT JSONB_BUILD_OBJECT(
      'type', 'FeatureCollection',
      'features', JSON_AGG(features.feature)
    ) 
    FROM (
      SELECT row_to_json(inputs) As feature 
        FROM (SELECT 'Feature' As type 
        , ST_AsGeoJSON(l.geom)::json As geometry 
        , row_to_json((SELECT l FROM (SELECT id, nama, deskripsi) As l)) As properties 
        FROM public.wilayah as l) As inputs
    ) features
  `
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
