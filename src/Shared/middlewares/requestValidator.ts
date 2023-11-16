import { RequestHandler } from 'express'
import { validationResult } from 'express-validator'

const validate: RequestHandler = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  // If there are validation errors, respond with a 422 Unprocessable Entity status
  return res.status(422).json({ validationErrors: errors.array() })
}
export default validate
