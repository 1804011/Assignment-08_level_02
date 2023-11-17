import { body } from 'express-validator'
import validate from '../../Shared/middlewares/requestValidator'
import { sharedUtilities } from '../../Shared/shared.utils'

const createUserValidation = [
  body('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Invalid email format'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role').isIn(['admin', 'customer']).withMessage('Invalid role'),
  body('contactNo')
    .custom(sharedUtilities.isValidBangladeshiNumber)
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
const loginValidation = [
  body('email').trim().isEmail().withMessage('Invalid email format'),
  body('password').trim().notEmpty().withMessage('Password is required'),
  validate,
]

export const authValidators = { createUserValidation, loginValidation }
