import { RequestHandler } from 'express'
import jwt, { JwtPayload, Secret, VerifyCallback } from 'jsonwebtoken'
import prisma from '../../Shared/prisma'
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
const verifyUser = (...users: string[]) => {
  const middleware: RequestHandler = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    const jwtCallback: VerifyCallback<JwtPayload | string> = async (
      err,
      decoded,
    ) => {
      if (err) {
        res.status(401).json({ error: 'invalid token' })
      } else {
        const { role, id } = decoded as JwtPayload
        const existingUser = await prisma.user.findUnique({
          where: { id },
        })
        if (!existingUser) {
          res.status(400).json({ error: 'user not found' })
        } else if (users.includes(role)) {
          req.user = decoded
          next()
        } else {
          res.status(401).json({ error: 'unauthorized user' })
        }
      }
    }
    if (!token) {
      res.status(400).json({ error: 'token not found' })
    } else {
      jwt.verify(token, config.jwt_secret as Secret, jwtCallback)
    }
  }
  return middleware
}
export const authMiddlewares = { checkLoginMiddleware, verifyUser }
