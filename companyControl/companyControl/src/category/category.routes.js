import express from 'express'
import { test, deleteCategory, createCategory, updateCategory, getCategory} from './category.controller.js';
import { validateJwt } from '../middlewares/validate-jwt.js';

const api = express.Router();

api.get('/test', test)
api.post('/create', [validateJwt],createCategory)
api.delete('/delete/:id',[validateJwt],deleteCategory)
api.get('/list', [validateJwt],getCategory)
api.put('/update/:id', [validateJwt],updateCategory)

export default api