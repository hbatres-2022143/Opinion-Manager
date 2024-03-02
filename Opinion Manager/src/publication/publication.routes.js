'use strict'

import { Router } from 'express'
import { validateJwt } from '../middlewares/validate-jwt.js'
import { createPublication, deletePublication, viewPublications, updatePublication } from './publication.controller.js'


const api = Router()

api.post('/createPublication', validateJwt, createPublication)
api.put('/updatePublication/:id', validateJwt, updatePublication)
api.get('/viewPublications', viewPublications)
api.delete('/deletePublication/:id', validateJwt, deletePublication)

export default api
