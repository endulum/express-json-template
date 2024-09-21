import dotenv from 'dotenv';
dotenv.config({ path: '.env' })
dotenv.config({ path: '.env.' + process.env.ENV })

import './config/passport';
import express from 'express';
import asyncHandler from 'express-async-handler'

import errorHandler from './src/middleware/errorHandler';
import { router as authRouter } from './src/routes/authRouter';
import { router as mainRouter } from './src/routes/mainRouter'

const secret: string | undefined = process.env.SECRET
if (secret === undefined) throw new Error('Secret is not defined.')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(asyncHandler(async (req, res, next) => {
  if (req.user) return mainRouter(req, res, next)
  else return authRouter(req, res, next)
}))

app.use(errorHandler)

app.listen(3000)