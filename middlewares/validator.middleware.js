const { body, param, query, validationResult } = require('express-validator')

exports.basicUserCreeds = [
  body('email').isEmail().withMessage('email is invalid'),
  body('password')
    .isStrongPassword({minLength: 8}).withMessage('Password length must be 8 chars or more')
    .isStrongPassword({minSymbols: 1}).withMessage('Password must contain 1 symbol or more')
    .isStrongPassword({minNumbers: 1}).withMessage('Password must contain 1 number or more')
    .isStrongPassword({minUppercase: 1}).withMessage('Password must contain 1 uppercase or more')
]

exports.validEmail = [
  body('email').isEmail().withMessage('Email is invalid')
]

exports.paramUUID = [
  param('id').isUUID(4).withMessage('Email is invalid')
]

exports.paging = [
  (req, res, next) => {
    req.query.page = req.query.page || '1'
    req.query.limit = req.query.limit || '5'
    req.query.sortBy = req.query.sortBy || 'createdAt'
    req.query.searchBy = req.query.searchBy || 'email'
    req.query.search = req.query.search || ''
    req.query.reverse = req.query.reverse || '0'
    return next()
  },
  query('page').optional().toInt(),
  query('limit').optional().toInt(),
  query('reverse').optional().toBoolean(),
  query('searchBy').isIn(['email']).withMessage('Data not found'),
  query('search').optional().trim(),
  query('sortBy').isIn(['email', 'createdAt', 'updatedAt']).withMessage('Data not found')
]

exports.check = (req, res, next) => {
  const errorValidation = validationResult(req)
  if (!errorValidation.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      result: errorValidation.array()
    })
  }
  return next()
}

exports.passwordConfirmation = [
  body('newPassword').isLength({min: 8}).withMessage('Password confirmation is not good'),
  body('confirmPassword').custom((value, { req }) => {
    if(value != req.body.newPassword) {
      throw new Error('Password does not watch')
    }
    return true
  })
]
