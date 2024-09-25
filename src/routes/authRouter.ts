import express from 'express'
import handleValidationErrors from '../middleware/handleValidationErrors'

import { controller as login } from '../controllers/login'
import { controller as signup } from '../controllers/signup'

const router = express.Router()

router.route('/login')
  .post(login.validate, handleValidationErrors, login.submit)

router.route('/signup')
  .post(signup.validate, handleValidationErrors, signup.submit)

export { router }