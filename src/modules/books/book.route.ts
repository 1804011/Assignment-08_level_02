import express from 'express'
import { authMiddlewares } from '../auth/auth.middlewares'
import { bookControllers } from './book.controller'
import { bookValidators } from './books.validator'
const bookRoutes = express.Router()
bookRoutes.use(authMiddlewares.verifyUser('admin'))
bookRoutes.post(
  '/create-book',
  bookValidators.createBookValidator,
  bookControllers.createBook,
)
bookRoutes.get('/', bookControllers.getAllBook)
bookRoutes.get('/:id', bookControllers.getBook)
bookRoutes.get('/:categoryId/category', bookControllers.getBookByCategory)
bookRoutes.patch(
  '/:id',
  bookValidators.updateBookValidator,
  bookControllers.updateBook,
)
bookRoutes.delete('/:id', bookControllers.deleteBook)
export default bookRoutes
