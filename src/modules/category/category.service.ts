import { Category } from '@prisma/client'
import prisma from '../../Shared/prisma'

const createCategory = async (category: Category) => {
  const result = await prisma.category.create({ data: category })
  return result
}

const updateCategory = async (id: string, data: Partial<Category>) => {
  const result = await prisma.category.update({ where: { id }, data })
  return result
}
const deleteCategory = async (id: string) => {
  const result = await prisma.category.delete({ where: { id } })
  return result
}
const getAllCategory = async () => {
  const result = await prisma.category.findMany({})
  return result
}
const getCategory = async (id: string) => {
  const result = await prisma.category.findUnique({
    where: { id },
    include: {
      Book: true,
    },
  })
  console.log(result)
  return result
}
export const categoryServices = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
}
