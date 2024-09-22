import { ValidationChain, body } from "express-validator";
import asyncHandler from 'express-async-handler'
import { RequestHandler } from "express";
import bcrypt from 'bcryptjs'

import usernameValidation from '../common/usernameValidation'
import prisma from "../prisma";

export const controller: {
  validate: ValidationChain[],
  submit: RequestHandler
} = {
  validate: [
    usernameValidation,
    body('password')
      .trim()
      .notEmpty().withMessage('Please enter a password.').bail()
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
      .escape(),

    body('confirmPassword')
      .trim()
      .notEmpty().withMessage('Please confirm your password.').bail()
      .custom(async (value, { req }) => {
        if (value !== req.body.password) throw new Error('Both passwords do not match.')
      })
      .escape(),

    body('deleteAfter')
      .trim()
      .isBoolean()
      .escape()
  ],

  submit: asyncHandler(async (req, res, next) => {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) throw new Error(err.message)
      const newUser = await prisma.user.create({
        data: {
          username: req.body.username,
          password: hashedPassword
        }
      })
      if ('deleteAfter' in req.body && req.body.deleteAfter === 'true') {
        await prisma.user.delete({
          where: { id: newUser.id }
        })
      }
      res.status(200).json(newUser); return;
    })
  })
}

export default controller