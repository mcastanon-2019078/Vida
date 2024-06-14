'use strict'

import { Router } from "express"
import { save, get, update, deleteAlert, search } from "./alerta.controller.js"

const api = Router()

api.post('/save', save)
api.get('/get', get)
api.put('/update/:id', update)
api.delete('/delete/:id', deleteAlert)
api.post('/search', search)

export default api