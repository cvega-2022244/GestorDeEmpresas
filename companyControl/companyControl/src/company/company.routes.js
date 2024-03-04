'use strict'

import { Router } from 'express'
import { test, report, createCompany, orderCompanyAZ, orderCompanyZA, orderCompanyOrAge, updateCompany } from './company.controller.js'

const api = Router()

api.get('/test', test)
api.post('/create', createCompany)
api.get('/listAZ', orderCompanyAZ)
api.get('/listZA', orderCompanyZA)
api.get('/listAge', orderCompanyOrAge)
api.put('/update/:id', updateCompany)
api.get('/report',report)


export default api