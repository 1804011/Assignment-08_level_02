import { Book } from '@prisma/client'
import { RequestHandler } from 'express'
import SuccessResponse from '../../classes/SuccessResponse'
import { bookServices } from './book.service'

const createBook: RequestHandler = async (req, res) => {
  try {
    const result = await bookServices.createBook(req.body)
    res
      .status(200)
      .json(new SuccessResponse<Book>('book created successfully', result))
  } catch (error) {
    res.status(500).json({ error })
  }
}
const updateBook: RequestHandler = async (req, res) => {
  try {
    const { id: bookId } = req.params
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...others } = req.body
    const result = await bookServices.updateBook(bookId, others)
    res
      .status(200)
      .json(new SuccessResponse<Book>('book updated successfully', result))
  } catch (error) {
    res.status(500).json({ error })
  }
}
const deleteBook: RequestHandler = async (req, res) => {
  try {
    const { id: bookId } = req.params
    const result = await bookServices.deleteBook(bookId)
    res
      .status(200)
      .json(new SuccessResponse<Book>('book deleted successfully', result))
  } catch (error) {
    res.status(500).json({ error })
  }
}
const getAllBook: RequestHandler = async (req, res) => {
  try {
    const result = await bookServices.getAllBook()
    res
      .status(200)
      .json(new SuccessResponse<Book[]>('book found successfully', result))
  } catch (error) {
    res.status(400).json({ error })
  }
}
const getBook: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params
    const result = await bookServices.getBook(id)
    res
      .status(200)
      .json(new SuccessResponse<Book | null>('book found successfully', result))
  } catch (error) {
    res.status(400).json({ error })
  }
}
export const bookControllers = {
  createBook,
  updateBook,
  deleteBook,
  getAllBook,
  getBook,
}
