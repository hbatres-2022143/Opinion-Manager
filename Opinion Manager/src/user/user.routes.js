'use strict'

import { Router } from 'express'
import { login, register, test, update, updatePassword } from './user.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()

api.get('/test', test)
api.post('/register', register)
api.post('/login', login)
api.put('/update/:id', validateJwt, update)
api.put('/updatePassword/:id', validateJwt, updatePassword)

export default api
