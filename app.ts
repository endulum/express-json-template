import dotenv from 'dotenv';
dotenv.config({ path: '.env' })
dotenv.config({ path: '.env.' + process.env.ENV })

import express from 'express';
import asyncHandler from 'express-async-handler'

import errorHandler from './src/middleware/errorHandler';
import { router as authRouter } from './src/routes/authRouter';
import { router as mainRouter } from './src/routes/mainRouter'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', asyncHandler(async (req, res) => {
  res.sendStatus(200); return;
}))

app.use(authRouter)

app.get('/error-route', asyncHandler(async (req, res) => {
  throw new Error('owo')
}))

app.use('*', asyncHandler(async (req, res) => {
  res.sendStatus(404); return;
}))

app.use(errorHandler)

app.listen(3000)