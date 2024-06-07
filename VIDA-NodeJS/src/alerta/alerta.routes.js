'use strict'

import { Router } from "express"
import { save, get, update, deleteAlert, search, getGenderCounts, getTotalCases,getNotFound, getFound, getDistributionByAge} from "./alerta.controller.js"

const api = Router()

api.post('/save', save)
api.get('/get', get)
api.get('/getGenderCounts', getGenderCounts)
api.get('/getTotalCases', getTotalCases)
api.get('/getNotFound',getNotFound)
api.get('/getFound', getFound)
api.get('/getDistributionByAge', getDistributionByAge)
api.put('/update/:id', update)
api.delete('/delete/:id', deleteAlert)
api.post('/search', search)

export default api