const db = require('../helpers/db')

const table = 'laporan'

exports.createLaporan = (data) => {
  const sql = `INSERT INTO ${table} (pelapor_id, deskripsi, foto, alamatLokasi, koordinat) VALUES ($1, $2, $3, $4, ST_GeomFromText($5))`
  const params = [data.pelapor_id, data.deskripsi, data.foto, data.alamatLokasi, data.koordinat]
  return db.query(sql, params)
}

exports.getLaporan = (data) => {
  const sql = `SELECT * FROM ${table} WHERE alamatLokasi LIKE $1 LIMIT $2`
  const params = [data.alamatLokasi]
  return db.query(sql, params)
}

exports.getLaporanById = (id) => {
  const sql = `SELECT * FROM ${table} WHERE uid=$1`
  const params = [id]
  return db.query(sql, params)
}

exports.deleteLaporanById = (id) => {
  const sql = `DELETE ${table} WHERE uid=$1`
  const params = [id]
  return db.query(sql, params)
}
