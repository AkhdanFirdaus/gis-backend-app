const db = require('../helpers/db')

const table = 'ruas_jalan'

exports.createRuasJalan = (data) => {
  const sql = `INSERT INTO ${table} (nama, deskripsi, awal, akhir, ketinggian, panjang, lebarrata, luas, geom) VALUES ($1, $2, $3, $4, $5, $6, $6, $8, ST_GeometryFromText(MULTILINESTRING($9))) RETURNING *`
  const params = [data.nama, data.deskripsi, data.awal, data.akhir, data.ketinggian, data.panjang, data.lebarrata, data.luas, data.geom]
  return db.query(sql, params)
}

exports.getListRuasJalan = (data) => {
  const sql = `SELECT id, ST_asGeoJSON(geom) as geom, nama, deskripsi, awal, akhir, ketinggian, panjang, lebarrata, luas FROM ${table} WHERE nama LIKE '%${data.nama ?? ''}%'`
  return db.query(sql)
}

exports.getGeoJSONRuasJalan = () => {
  const sql = `
    SELECT JSONB_BUILD_OBJECT(
      'type', 'FeatureCollection',
      'features', JSON_AGG(features.feature)
    ) 
    FROM (
      SELECT row_to_json(inputs) As feature 
        FROM (SELECT 'Feature' As type 
        , ST_AsGeoJSON(l.geom)::json As geometry 
        , row_to_json((SELECT l FROM (SELECT id, nama, deskripsi, awal, akhir, ketinggian, panjang, lebarrata, luas) As l)) As properties 
        FROM public.ruas_jalan as l) As inputs
    ) features
  `
  return db.query(sql)
}

exports.getRuasJalan = (id) => {
  const sql = `SELECT id, ST_asGeoJSON(geom) as geom, nama, deskripsi, awal, akhir, ketinggian, panjang, lebarrata, luas FROM ${table} WHERE id=$1`
  const params = [id]
  return db.query(sql, params)
}

exports.deleteRuasJalanById = (id) => {
  const sql = `DELETE FROM "${table}" WHERE id = $1`
  const params = [id]
  return db.query(sql, params)
}


