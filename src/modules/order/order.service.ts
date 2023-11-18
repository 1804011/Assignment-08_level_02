import prisma from '../../Shared/prisma'
import { CreateOrderRequest } from './order.interface'

const createOrder = async (
  orderedBooksData: CreateOrderRequest,
  userId: string,
) => {
  const order = prisma.$transaction(async tx => {
    const order = await tx.order.create({
      data: { userId },
    })
    const orderedBooks = orderedBooksData.map(async book => {
      const orderedBook = await tx.orderedBook.create({
        data: {
          bookId: book.bookId,
          quantity: book.quantity,
          orderId: order.id,
        },
      })
      //   console.log(orderedBook)
      return orderedBook
    })
    await Promise.all(orderedBooks)
    const result = await tx.order.findUnique({
      where: { id: order.id },
      include: { orderedBooks: true },
    })
    return result
  })

  return order
}
const getAllOrders = async () => {
  const result = await prisma.order.findMany({
    include: { orderedBooks: true },
  })
  return result
}
const getCustomerOrders = async (customerId: string) => {
  const result = await prisma.order.findMany({
    where: { userId: customerId },
    include: { orderedBooks: true },
  })
  return result
}
const getAnOrderForAdmin = async (orderId: string) => {
  const result = await prisma.order.findUnique({
    where: { id: orderId },
    include: { orderedBooks: true },
  })
  return result
}
const getAnOrderForCustomer = async (orderId: string, userId: string) => {
  const result = await prisma.order.findUnique({
    where: { id: orderId, userId },
    include: { orderedBooks: true },
  })
  return result
}
export const orderServices = {
  createOrder,
  getAllOrders,
  getCustomerOrders,
  getAnOrderForAdmin,
  getAnOrderForCustomer,
}
