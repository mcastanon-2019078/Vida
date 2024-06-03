'use strict'

import { Router } from "express"
import { save, get, update, deleteAlert, search } from "./alerta.controller.js"
import multer from 'multer'

const api = Router()

// Configura Multer para manejar archivos de imagen
const storage = multer.memoryStorage()
const upload = multer({ storage })

// Rutas
api.post('/save', upload.single('fotoDesaparecido'), save)
api.get('/get', get)
api.put('/update/:id', upload.single('fotoDesaparecido'), update)
api.delete('/delete/:id', deleteAlert)
api.post('/search', search)

export default api
