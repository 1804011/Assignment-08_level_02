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
export const orderControllers = { createOrder }
