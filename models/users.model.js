const db = require('../helpers/db')

const table = 'users'

exports.insertUser = (data)  => {
  const sql = `INSERT INTO "${table}" ("photo", "name", "email", "password", "phone", "role") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`
  const params = [data.photo, data.name, data.email, data.password, data.phone, data.role]
  return db.query(sql, params)
}

exports.selectAllUser = (data) => {
  const sql = `SELECT * FROM "${table}" WHERE "${data.searchBy}" LIKE '%${data.search}%' ORDER BY "${data.sortBy}" ${data.reverse ? 'DESC' : 'ASC'} LIMIT $1 OFFSET $2`
  const params = [data.limit, data.offset]
  return db.query(sql, params)
}

exports.selectAll = (data) => {
  const sql = `SELECT * FROM "${table}" WHERE "${data.searchBy}" LIKE '${data.search}'`
  return db.query(sql)
}

exports.selectUserById = (id) => {
  const sql = `SELECT * FROM "${table}" WHERE id=$1`
  const params = [id]
  return db.query(sql, params)
}

exports.selectUserByEmail = (email) => {
  const sql = `SELECT * FROM "${table}" WHERE email=$1`
  const params = [email]
  return db.query(sql, params)
}

exports.updateUserById = (id, data) => {
  const sql = `UPDATE "${table}" SET email=$2, password=$3, photo=$4, name=$5, phone=$6, role=$7 WHERE id=$1 RETURNING *`
  const params = [id, data.email, data.password, data.photo, data.name, data.phone, data.role]
  return db.query(sql, params)
}

exports.deleteUserById = (id) => {
  const sql = `DELETE FROM "${table}" WHERE id = $1`
  const params = [id]
  return db.query(sql, params)
}
