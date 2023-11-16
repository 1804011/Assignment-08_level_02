import express from 'express'
import { authController } from './auth.controller'
import { authValidators } from './auth.validator'
const authRoutes = express.Router()
authRoutes.post(
  '/signup',
  authValidators.createUserValidation,
  authController.createUserController,
)
export default authRoutes
