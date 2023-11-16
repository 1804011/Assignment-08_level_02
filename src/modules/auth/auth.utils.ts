import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
const hashPassword = (password: string) => {
  const hashedPassword = bcrypt.hashSync(password, Number(config.salt_round))
  return hashedPassword
}
const verifyPassword = (plainPassword: string, hashedPassword: string) => {
  const verifiedPassword = bcrypt.compareSync(plainPassword, hashedPassword)
  return verifiedPassword
}
const createToken = (payload: JwtPayload) => {
  const token = jwt.sign(payload, config.jwt_secret as string, {
    expiresIn: '1y',
  })
  return token
}
const verifyToken = (token: string) => {
  const verifiedToken = jwt.verify(token, config.jwt_secret as string)
  return verifiedToken
}
export const authUtilities = {
  hashPassword,
  verifyPassword,
  createToken,
  verifyToken,
}
