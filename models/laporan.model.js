const db = require('../helpers/db')

const table = 'laporan'

exports.createLaporan = (data) => {
  const kor = String(data.koordinat).split(',')
  const koord = `${kor[0]} ${kor[1]}`
  const sql = `INSERT INTO ${table} (pelapor_uid, deskripsi, foto, alamatLokasi, koordinat) VALUES ('${data.pelapor_uid}', '${data.deskripsi}', '${data.foto}', '${data.alamatLokasi}', ST_GeomFromText('POINT(${koord})', 4326))`
  return db.query(sql)
}

exports.getLaporan = () => {
  const sql = `SELECT uid, deskripsi, foto, alamatLokasi, ST_asGeoJSON(koordinat) AS koordinat FROM ${table}`
  return db.query(sql)
}

exports.getLaporanById = (id) => {
  const sql = `SELECT uid, deskripsi, foto, alamatLokasi, ST_asGeoJSON(koordinat) AS koordinat FROM ${table} WHERE uid=$1`
  const params = [id]
  return db.query(sql, params)
}

exports.deleteLaporanById = (id) => {
  const sql = `DELETE ${table} WHERE uid=$1`
  const params = [id]
  return db.query(sql, params)
}

exports.getGeoJSONLaporan = () => {
  const sql = `
    SELECT JSONB_BUILD_OBJECT(
      'type', 'FeatureCollection',
      'features', JSON_AGG(features.feature)
    ) 
    FROM (
      SELECT row_to_json(inputs) As feature 
        FROM (SELECT 'Feature' As type 
        , ST_AsGeoJSON(l.koordinat)::json As geometry 
        , row_to_json((SELECT l FROM (SELECT uid, deskripsi, foto, alamatLokasi, tanggal) As l)) As properties 
        FROM public.laporan as l) As inputs
    ) features
  `
  return db.query(sql)
}
