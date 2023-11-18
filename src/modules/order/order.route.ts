import express from 'express'
import { authMiddlewares } from '../auth/auth.middlewares'
import { orderControllers } from './order.controller'
import { orderValidators } from './order.validator'
const orderRoutes = express.Router()
orderRoutes.post(
  '/create-order',
  authMiddlewares.verifyUser('customer'),
  orderValidators.validateCreateOrderRequest,
  orderControllers.createOrder,
)
orderRoutes.get(
  '/',
  authMiddlewares.verifyUser('admin', 'customer'),
  orderControllers.getOrders,
)
orderRoutes.get(
  '/:orderId',
  authMiddlewares.verifyUser('admin', 'customer'),
  orderControllers.getAnOrder,
)
export default orderRoutes
