import express from 'express'
import { authMiddlewares } from '../auth/auth.middlewares'
import { categoryControllers } from './category.controller'
import { categoryValidators } from './category.validator'
const categoryRoutes = express.Router()
categoryRoutes.use(authMiddlewares.verifyUser('admin'))
categoryRoutes.post(
  '/create-category',
  categoryValidators.categoryValidator,
  categoryControllers.createCategory,
)
categoryRoutes.get('/', categoryControllers.getAllCategory)
categoryRoutes.get('/:id', categoryControllers.getCategory)
categoryRoutes.delete('/:id', categoryControllers.deleteCategory)
categoryRoutes.patch(
  '/:id',
  categoryValidators.categoryValidator,
  categoryControllers.updateCategory,
)
export default categoryRoutes
