import { ValidationChain, body } from "express-validator";
import asyncHandler from 'express-async-handler'
import { RequestHandler } from "express";
import bcrypt from 'bcryptjs'

import prisma from "../prisma";

export const controller: {
  validate: ValidationChain[],
  submit: RequestHandler
} = {
  validate: [
    body('username')
      .trim()
      .notEmpty().withMessage('Please enter a username.')
      .escape(),
    body('password')
      .trim()
      .notEmpty().withMessage('Please enter a password.').bail()
      .custom(async (value, { req }) => {
        if (req.body.username === '') return;
        const user = await prisma.user.findUnique({
          where: { username: req.body.username }
        })
        if (!user) throw new Error('Incorrect username or password.');
        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) throw new Error('Incorrect username or password.');
      })
      .escape()
  ],

  submit: asyncHandler(async (req, res, next) => {
    res.sendStatus(200); return;
  })
}