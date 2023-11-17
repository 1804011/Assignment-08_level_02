import express from 'express'
import { authMiddlewares } from '../auth/auth.middlewares'
import { userControllers } from './user.controller'
import { userValidators } from './user.validator'
const userRoutes = express.Router()
userRoutes.use(authMiddlewares.verifyUser('admin'))
userRoutes.get('/', userControllers.getAllUsers)
userRoutes.get('/:id', userControllers.getSingleUser)
userRoutes.patch(
  '/:id',
  userValidators.updateUserValidation,
  userControllers.updateUser,
)
userRoutes.delete('/:id', userControllers.deleteUser)
export default userRoutes
