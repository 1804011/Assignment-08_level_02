import { body } from 'express-validator'
import validate from '../../Shared/middlewares/requestValidator'

const categoryValidator = [
  body('title')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string'),
  validate,
]

export const categoryValidators = {
  categoryValidator,
}
