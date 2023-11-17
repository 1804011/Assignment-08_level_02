console.clear()
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application } from 'express'
import authRoutes from './modules/auth/auth.route'
import categoryRoutes from './modules/category/category.route'
import userRoutes from './modules/user/user.route'
const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/categories', categoryRoutes)
app.get('/', (req, res) => res.send('welcome'))
export default app
