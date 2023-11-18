import { body } from 'express-validator'
import validate from '../../Shared/middlewares/requestValidator'

const validateCreateOrderRequest = [
  body('orderedBooks')
    .isArray({ min: 1 })
    .withMessage('orderedBooks must be an array with at least one item'),

  body('orderedBooks.*.bookId')
    .isUUID()
    .withMessage('Each ordered book must have a valid bookId'),

  body('orderedBooks.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive integer'),
  validate,
]
export const orderValidators = { validateCreateOrderRequest }
