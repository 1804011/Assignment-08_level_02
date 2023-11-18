import express from 'express'
import { authMiddlewares } from '../auth/auth.middlewares'
import { orderControllers } from './order.controller'
import { orderValidators } from './order.validator'
const orderRoutes = express.Router()
orderRoutes.use(authMiddlewares.verifyUser('customer'))
orderRoutes.post(
  '/create-order',
  orderValidators.validateCreateOrderRequest,
  orderControllers.createOrder,
)
export default orderRoutes
