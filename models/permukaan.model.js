const db = require('../helpers/db')

const table = 'permukaan'

exports.createPermukaan = (data) => {
  const sql = `INSERT INTO ${table} (nama) VALUES ($1)`
  const params = [data.nama]
  return db.query(sql, params)
}

exports.getPermukaan = (data) => {
  const sql = `SELECT * FROM ${table} WHERE nama LIKE $1 LIMIT $2`
  const params = [data.nama]
  return db.query(sql, params)
}

exports.getPermukaanById = (id) => {
  const sql = `SELECT * FROM ${table} WHERE uid=$1`
  const params = [id]
  return db.query(sql, params)
}

exports.deletePermukaanById = (id) => {
  const sql = `DELETE ${table} WHERE uid=$1`
  const params = [id]
  return db.query(sql, params)
}
