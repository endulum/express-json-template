import express from 'express'
import asyncHandler from 'express-async-handler'
import handleValidationErrors from '../middleware/handleValidationErrors'

import { controller as account } from '../controllers/account'

const router = express.Router()

router.route('/')
  .get(asyncHandler(async (req, res) => {
    // return res.render('layout', {
    //   page: 'index',
    //   title: 'Index'
    // })
  }))

router.route('/account')
  // .get(account.render)
  .post(account.validate, handleValidationErrors, account.submit)

export { router }