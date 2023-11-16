import { User } from '@prisma/client'
import prisma from '../../Shared/prisma'
const createUser = async (data: User) => {
  const result = await prisma.user.create({ data })
  return result
}
const getSingleUser = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: { id },
  })
  return result
}
export const userServices = { createUser, getSingleUser }
