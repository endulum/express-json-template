import express from 'express'
import asyncHandler from 'express-async-handler'
import handleValidationErrors from '../middleware/handleValidationErrors'

import { controller as account } from '../controllers/account'
import { controller as user } from '../controllers/user'

const router = express.Router()

router.route('/')
  .get(user.deserialize, asyncHandler(async (req, res) => {
    res.json(req.user); return;
  }))

router.route('/account')
  // .get(account.render)
  .post(account.validate, handleValidationErrors, account.submit)

export { router }