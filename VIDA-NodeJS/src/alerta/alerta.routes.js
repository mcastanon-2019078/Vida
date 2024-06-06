'use strict'

import { Router } from "express"
import { save, get, update, deleteAlert, search, getGenderMale, getGenderFemale } from "./alerta.controller.js"
import upload from "../../configs/multer.js"
const api = Router()

api.post('/save', upload.single('fotoDesaparecido'), save)
api.get('/get', get)
api.put('/update/:id', update)
api.delete('/delete/:id', deleteAlert)
api.post('/search', search)
api.get('/getGenderFemale', getGenderFemale)
api.get('/getGenderMale', getGenderMale)

export default api