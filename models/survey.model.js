const db = require('../helpers/db')

const table = 'survey'

exports.createSurvey = (data) => {
  const sql = `INSERT INTO ${table} (petugas_id, laporan_id, ruas_id, catatan) VALUES ($1, $2, $3, $4)`
  const params = [data.petugas_id, data.laporan_id, data.ruas_id, data.catatan]
  return db.query(sql, params)
}

exports.getSurvey = (data) => {
  const sql = `SELECT * FROM ${table} WHERE laporan_id LIKE $1 LIMIT $2`
  const params = [data.alamatLokasi]
  return db.query(sql, params)
}

exports.getSurveyById = (id) => {
  const sql = `SELECT * FROM ${table} WHERE uid=$1`
  const params = [id]
  return db.query(sql, params)
}

exports.deleteSurveyById = (id) => {
  const sql = `DELETE ${table} WHERE uid=$1`
  const params = [id]
  return db.query(sql, params)
}
