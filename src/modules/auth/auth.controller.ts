import { User } from '@prisma/client'
import { RequestHandler } from 'express'
import SuccessResponse from '../../classes/SuccessResponse'
import { authServices } from './auth.service'
import { authUtilities } from './auth.utils'

const createUserController: RequestHandler = async (req, res) => {
  try {
    let { password } = req.body
    password = authUtilities.hashPassword(password)

    const result = await authServices.createUser({ ...req.body, password })
    res
      .status(200)
      .send(
        new SuccessResponse<Partial<User>>('user created successfully', result),
      )
  } catch (error) {
    res.status(500).send({
      error,
    })
  }
}

export const authController = { createUserController }
