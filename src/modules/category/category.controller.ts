import { Category } from '@prisma/client'
import { RequestHandler } from 'express'
import SuccessResponse from '../../classes/SuccessResponse'
import { categoryServices } from './category.service'

const createCategory: RequestHandler = async (req, res) => {
  try {
    const data = await categoryServices.createCategory(req.body)
    res
      .status(200)
      .json(
        new SuccessResponse<Category>('category created successfully', data),
      )
  } catch (error) {
    res.status(400).json({ error })
  }
}
const updateCategory: RequestHandler = async (req, res) => {
  try {
    const { id: categoryId } = req.params
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, title } = req.body
    const data = await categoryServices.updateCategory(categoryId, { title })
    res
      .status(200)
      .json(
        new SuccessResponse<Category>('category updated successfully', data),
      )
  } catch (error) {
    res.status(400).json({ error })
  }
}
const deleteCategory: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params
    const data = await categoryServices.deleteCategory(id)
    res
      .status(200)
      .json(
        new SuccessResponse<Category>('category deleted successfully', data),
      )
  } catch (error) {
    res.status(400).json({ error })
  }
}
const getAllCategory: RequestHandler = async (req, res) => {
  try {
    const data = await categoryServices.getAllCategory()
    res
      .status(200)
      .json(
        new SuccessResponse<Category[]>('category found successfully', data),
      )
  } catch (error) {
    res.status(400).json({ error })
  }
}

export const categoryControllers = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
}
