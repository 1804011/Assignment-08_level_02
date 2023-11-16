import { User } from '@prisma/client'
import prisma from '../../Shared/prisma'

const createUser = async (data: User) => {
  const result = await prisma.user.create({
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  })
  return result
}
export const authServices = { createUser }
