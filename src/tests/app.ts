import express from 'express'

import { router as authRouter } from '../routes/authRouter'
import errorHandler from '../middleware/errorHandler'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(authRouter)
app.use(errorHandler)

export default app