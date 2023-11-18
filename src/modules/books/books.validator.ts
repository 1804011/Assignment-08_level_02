import { body, param } from 'express-validator'
import validate from '../../Shared/middlewares/requestValidator'

const createBookValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('price').isFloat().withMessage('Price must be a valid float'),
  body('genre').notEmpty().withMessage('Genre is required'),
  body('publicationDate').isISO8601().withMessage('Invalid publication date'),
  body('categoryId')
    .notEmpty()
    .withMessage('Category ID is required')
    .isUUID()
    .withMessage('Invalid category ID'),
  validate,
]
const updateBookValidator = [
  param('id').isUUID().withMessage('Invalid book ID'),

  body('title').optional().notEmpty().withMessage('Title is required'),
  body('author').optional().notEmpty().withMessage('Author is required'),
  body('price').optional().isFloat().withMessage('Price must be a valid float'),
  body('genre').optional().notEmpty().withMessage('Genre is required'),
  body('publicationDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid publication date'),
  body('categoryId').optional().isUUID().withMessage('Invalid category ID'),
  validate,
]
export const bookValidators = { createBookValidator, updateBookValidator }
