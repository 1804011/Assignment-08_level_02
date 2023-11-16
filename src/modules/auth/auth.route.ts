import express from 'express'
import { authController } from './auth.controller'
import { authMiddlewares } from './auth.middlewares'
import { authValidators } from './auth.validator'
const authRoutes = express.Router()
authRoutes.post(
  '/signup',
  authValidators.createUserValidation,
  authController.createUserController,
)
authRoutes.post(
  '/login',
  authMiddlewares.checkLoginMiddleware,
  authValidators.loginValidation,
  authController.loginController,
)
export default authRoutes
