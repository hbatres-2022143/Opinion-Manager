'use strict'

import { Router } from 'express'
import { createComment, deleteComment, updateComment, viewComments } from './comment.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()

api.post('/createComment/:pid', validateJwt, createComment)
api.get('/viewComments', viewComments)
api.put('/updateComment/:cid', validateJwt, updateComment)
api.delete('/deleteComment/:cid', validateJwt, deleteComment)

export default api