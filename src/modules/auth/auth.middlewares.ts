import { RequestHandler } from 'express'
import jwt, { JwtPayload, VerifyCallback } from 'jsonwebtoken'
import config from '../../config'
import { authServices } from './auth.service'
const checkLoginMiddleware: RequestHandler = async (req, res, next) => {
  const token = req.cookies?.token
  const jwtCallback: VerifyCallback<JwtPayload | string> = async (
    err,
    decoded,
  ) => {
    if (err) {
      next()
    } else {
      const { email } = decoded as JwtPayload
      const existingUser = await authServices.getUser(email)
      if (existingUser?.email === email) {
        res.send({
          error: 'already logged in',
        })
      } else {
        next()
      }
    }
  }
  if (token) {
    jwt.verify(token, config.jwt_secret as jwt.Secret, jwtCallback)
  } else {
    next()
  }
}
export const authMiddlewares = { checkLoginMiddleware }
