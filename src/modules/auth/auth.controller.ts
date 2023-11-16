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
const loginController: RequestHandler = async (req, res) => {
  try {
    const { email, password: plainPassword } = req.body

    const existingUser = await authServices.getUser(email)
    if (!existingUser) {
      res.status(404).json({ error: 'user not found' })
    } else {
      const { id, role, password } = existingUser as User
      if (!authUtilities.verifyPassword(plainPassword, password)) {
        return res.status(401).json({ error: 'Invalid email or password' })
      } else {
        const token = authUtilities.createToken({
          id,
          role,
          email,
        })
        res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 3600 })
        res
          .status(200)
          .json(
            new SuccessResponse(
              'user logged in successfully',
              undefined,
              token,
            ),
          )
      }
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}
export const authController = { createUserController, loginController }
