import { body } from 'express-validator'
import validate from '../../Shared/middlewares/requestValidator'
import { sharedUtilities } from '../../Shared/shared.utils'

const updateUserValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Name is required'),
  body('email').optional().trim().isEmail().withMessage('Invalid email format'),
  body('role')
    .optional()
    .isIn(['admin', 'customer'])
    .withMessage('Invalid role'),
  body('contactNo')
    .optional()
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
export const userValidators = { updateUserValidation }
