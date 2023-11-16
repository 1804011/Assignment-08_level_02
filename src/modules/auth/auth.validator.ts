import { RequestHandler } from 'express'
import { body, validationResult } from 'express-validator'

const isValidBangladeshiNumber = (value: string) => {
  const regex = /^\+880\d{10}$/
  return regex.test(value)
}
const validate: RequestHandler = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  // If there are validation errors, respond with a 422 Unprocessable Entity status
  return res.status(422).json({ validationErrors: errors.array() })
}
const createUserValidation = [
  body('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Invalid email format'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role').isIn(['admin', 'customer']).withMessage('Invalid role'),
  body('contactNo')
    .custom(isValidBangladeshiNumber)
    .withMessage('Invalid phone number format'),
  body('address')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Address is required'),
  body('profileImg')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Profile image URL is required'),
  validate,
]

export const authValidators = { createUserValidation }
