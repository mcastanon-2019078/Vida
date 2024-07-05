'use strict'

import { Router } from "express"
import { save, get, update, deleteAlert, search } from "./alertaCliente.controller.js"
import { upload } from "../../configs/multer.js"
const api = Router()

api.post('/saveAlertClient', upload.single('fotoDesaparecido'), save)
api.get('/getAlertClient', get)
api.put('/update/:id', update)
api.delete('/delete/:id', deleteAlert)
api.post('/search', search)



export default api