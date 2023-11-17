import { User } from '@prisma/client'
import prisma from '../../Shared/prisma'
const selectWithoutPassword = {
  id: true,
  name: true,
  email: true,
  role: true,
  contactNo: true,
  address: true,
  profileImg: true,
}

const getSingleUser = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: { id },
    select: selectWithoutPassword,
  })
  return result
}
const getAllUser = async () => {
  const result = await prisma.user.findMany({
    select: selectWithoutPassword,
  })
  return result
}
const updateUser = async (id: string, data: Partial<User>) => {
  const result = await prisma.user.update({
    where: { id },
    data,
    select: selectWithoutPassword,
  })
  return result
}
const deleteUser = async (id: string) => {
  const result = await prisma.user.delete({
    where: { id },
    select: selectWithoutPassword,
  })
  return result
}
export const userServices = {
  getSingleUser,
  getAllUser,
  updateUser,
  deleteUser,
}
