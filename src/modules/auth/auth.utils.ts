import bcrypt from 'bcrypt'
import config from '../../config'
const hashPassword = (password: string) => {
  const hashedPassword = bcrypt.hashSync(password, Number(config.salt_round))
  return hashedPassword
}
const verifyPassword = (plainPassword: string, hashedPassword: string) => {
  const verifiedPassword = bcrypt.compareSync(plainPassword, hashedPassword)
  return verifiedPassword
}
export const authUtilities = { hashPassword, verifyPassword }
