const userModel = require('../models/users.model')
const forgotPasswordModel = require('../models/forgotPassword.model')

const argon = require('argon2')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
  try {
    const user = await userModel.selectUserByEmail(req.body.email)
    if (user.rowCount) {
      const selectedUser = user.rows[0]
      const valid = await argon.verify(user.rows[0].password, req.body.password)
      if (valid) {
        const { id } = selectedUser
        const payload = { id }
        const token =jwt.sign(payload, process.env.APP_SECRET || 'default-key')
        return res.json({
          success: true,
          message: 'Login successfully',
          results: {
            token
          }
        })
      }
    }
    return res.status(401).json({
      success: false,
      message: 'Wrong email or password'
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error : ' + err.message
    })
  }
}

exports.register = async (req, res) => {
  try {
    const find = await userModel.selectUserByEmail(req.body.email)
    if (find.rows[0]) {
      throw new Error('Email already taken')
    }
    req.body.password = await argon.hash(req.body.password)
    const user = await userModel.insertUser(req.body)
    const createdUser = user.rows[0]
    return res.json({
      success: true,
      message: 'Register successfully',
      results: createdUser
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error : ' + err.message
    })    
  }
}

exports.forgotPassword = async (req, res) => {
  try {
    const { customAlphabet } = await import('nanoid')
    const nanoid = customAlphabet('012345678', 6)
    req.body.code = nanoid()

    const user = await userModel.selectUserByEmail(req.body.email)
    const selectedUser = user.rows[0]

    if (!selectedUser) {
      return res.status(400).json({
        success: false,
        message: 'Email not found!'
      })
    }

    req.body.userId = selectedUser.id
    await forgotPasswordModel.insertForgotPassword(req.body)

    // mailer handler

    return res.json({
      success: true,
      message: 'Forgot password request has been sent!'
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error : ' + err.message
    })    
  }
}

exports.resetPassword = async (req, res) => {
  try {
    const user = await forgotPasswordModel.selectForgotPassword(req.body)
    if (user.rowCount) {
      const selectedUser = user.rows[0]
      req.body.password = await argon.hash(req.body.newPassword)
      
      const updatePassword = await userModel.updateUserById(selectedUser.userId, req.body)
      if (updatePassword.rowCount) {
        return res.json({
          success: true,
          message: 'Reset password success!'
        })
      }
      return res.status(500).json({
        success: true,
        message: 'Unexpected error on updating data!'
      })
    }
    return res.status(400).json({
      success: false,
      message: 'Email or code cannot be identified!'
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error : ' + err.message
    }) 
  }
}
