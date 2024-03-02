'use strict'

import { Router } from 'express'
import { validateJwt } from '../middlewares/validate-jwt.js'
import { createCategory, deleteCategory, updateCategory, viewCategories } from './category.controller.js'

const api = Router()

api.post('/createCategory', validateJwt, createCategory)
api.get('/viewCategories', validateJwt, viewCategories)
api.put('/updateCategory/:id', validateJwt, updateCategory)
api.delete('/deleteCategory/:id', validateJwt, deleteCategory)

export default api