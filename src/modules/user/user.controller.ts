import { User } from '@prisma/client'
import { RequestHandler } from 'express'
import SuccessResponse from '../../classes/SuccessResponse'
import { userServices } from './user.service'
const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const data = await userServices.getAllUser()
    res
      .status(200)
      .json(
        new SuccessResponse<Partial<User>[]>('user found successfully', data),
      )
  } catch (error) {
    res.status(400).json({ error })
  }
}
const getSingleUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params
    const data = await userServices.getSingleUser(id)
    res
      .status(200)
      .json(
        new SuccessResponse<Partial<User> | null>(
          'user found successfully',
          data,
        ),
      )
  } catch (error) {
    res.status(400).json({ error })
  }
}
const updateUser: RequestHandler = async (req, res) => {
  try {
    const { id: userId } = req.params
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, email, id, ...others } = req.body
    const data = await userServices.updateUser(userId, others)
    res
      .status(200)
      .json(
        new SuccessResponse<Partial<User>>('user updated successfully', data),
      )
  } catch (error) {
    res.status(400).json({ error })
  }
}
const deleteUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params
    const data = await userServices.deleteUser(id)
    res
      .status(200)
      .json(
        new SuccessResponse<Partial<User>>('user deleted successfully', data),
      )
  } catch (error) {
    res.status(400).json({ error })
  }
}
export const userControllers = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
}
