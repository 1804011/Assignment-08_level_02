import { Book } from '@prisma/client'
import prisma from '../../Shared/prisma'

const createBook = async (book: Book) => {
  const result = await prisma.book.create({ data: book })
  return result
}
const updateBook = async (id: string, book: Partial<Book>) => {
  const result = await prisma.book.update({ where: { id }, data: book })
  return result
}
const deleteBook = async (id: string) => {
  const result = await prisma.book.delete({ where: { id } })
  return result
}
const getAllBook = async () => {
  const result = await prisma.book.findMany({})
  return result
}
const getBook = async (id: string) => {
  const result = await prisma.book.findUnique({ where: { id } })
  return result
}
export const bookServices = {
  createBook,
  updateBook,
  getAllBook,
  getBook,
  deleteBook,
}
