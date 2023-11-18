import { RequestHandler } from 'express'
import SuccessResponse from '../../classes/SuccessResponse'
import { orderServices } from './order.service'
const createOrder: RequestHandler = async (req, res) => {
  try {
    const { orderedBooks } = req.body
    const { id } = req.user
    console.log({ id })
    const result = await orderServices.createOrder(orderedBooks, id)
    res
      .status(200)
      .json(
        new SuccessResponse<typeof result>(
          'order created successfully',
          result,
        ),
      )
  } catch (error) {
    res.status(400).json({ error })
  }
}
const getOrders: RequestHandler = async (req, res) => {
  try {
    const { role, id } = req.user

    if (role === 'admin') {
      const data = await orderServices.getAllOrders()
      res
        .status(200)
        .json(
          new SuccessResponse<typeof data>('orders found successfully', data),
        )
    } else if (role === 'customer') {
      const data = await orderServices.getCustomerOrders(id)
      res
        .status(200)
        .json(
          new SuccessResponse<typeof data>('orders found successfully', data),
        )
    }
  } catch (error) {
    res.status(400).json({ error })
  }
}
const getAnOrder: RequestHandler = async (req, res) => {
  try {
    const { orderId } = req.params
    const { role, id } = req.user
    if (role === 'admin') {
      const data = await orderServices.getAnOrderForAdmin(orderId)
      res
        .status(200)
        .json(new SuccessResponse('order retreived successfully', data))
    } else if (role === 'customer') {
      const data = await orderServices.getAnOrderForCustomer(orderId, id)
      res
        .status(200)
        .json(new SuccessResponse('order retreived successfully', data))
    }
  } catch (error) {
    res.status(400).json({ error })
  }
}

export const orderControllers = { createOrder, getOrders, getAnOrder }
