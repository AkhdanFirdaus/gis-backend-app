const auth = require('express').Router()

const { validEmail, check } = require('../middlewares/validator.middleware')

const authController = require('../controllers/auth.controller')

auth.post('/login', validEmail, check, authController.login)
auth.post('/register', authController.register)
auth.post('/forgot-password', authController.forgotPassword)
auth.post('/reset-password', authController.resetPassword)

module.exports = auth
