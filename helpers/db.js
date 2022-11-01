const { Pool } = require('pg')

const username = 'sig-user'
const password = 'password'
const dbname = 'ikp'

const db = new Pool({
  connectionString: `postgresql://${username}:${password}@localhost:5432/${dbname}?schema=public`
})

module.exports = db
