'use strict'

import { Router } from "express"
import { save, get, update, deleteAlert, search } from "./alerta.controller.js"
import upload from "../../configs/multer.js"
const api = Router()

api.post('/save', upload.single('fotoDesaparecido'), save)
api.get('/get', get)
api.put('/update/:id', update)
api.delete('/delete/:id', deleteAlert)
api.post('/search', search)

export default api