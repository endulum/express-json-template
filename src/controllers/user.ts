import { RequestHandler } from "express"
import asyncHandler from 'express-async-handler'
import jsonwebtoken from 'jsonwebtoken'

import prisma from "../prisma"

interface IJwtPayload extends jsonwebtoken.JwtPayload {
  id: string
}

export const controller: {
  deserialize: RequestHandler
} = {
  deserialize: asyncHandler(async (req, res, next) => {
    const bearerHeader = req.headers.authorization
    const bearerToken = bearerHeader?.split(' ')[1]
    if (bearerToken === undefined) res.sendStatus(401)
    else {
      let decoded
      try {
        if (!process.env.TOKEN_SECRET) throw new Error('Secret is not defined.')
        decoded = jsonwebtoken.verify(bearerToken, process.env.TOKEN_SECRET) as IJwtPayload
        const user = await prisma.user.findUnique({ where: { id: parseInt(decoded.id) } })
        if (!user) {
          res.sendStatus(404); return;
        } else {
          req.user = user
          return next()
        }
      } catch (err) {
        res.sendStatus(401); return;
      }
    }
  })
}