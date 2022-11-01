require('dotenv').config({path: './.env'})

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'assets', 'uploads')))

app.use('/', require('./routes'))

app.listen(8888, () => {
  console.log('App Listening on port 8888')
})

