'uae strict'

import { Router } from 'express'

import { test, register, login } from './user.controller.js'

const api = Router();

api.post('/register', register)
api.post('/login', login)
api.get('/test', test)

export default api