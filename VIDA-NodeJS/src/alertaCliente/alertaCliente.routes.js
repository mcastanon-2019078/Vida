'use strict'

import { Router } from "express"
import { 
    save, 
    getC, 
    update, 
    deleteAlert, 
    search,  
    getGenderCounts, 
    getTotalCases,
    getStatus, 
    getDistributionByAge,  
} from "./alertaCliente.controller.js"

import { upload } from "../../configs/multer.js"
//import { deactivateAlert } from '../alerta/alerta.controller.js' 
const api = Router()

api.post('/saveAlertClient',  upload.single('fotoDesaparecido'), save)
api.get('/getC', getC)
api.put('/update/:id', update)
api.delete('/delete/:id', deleteAlert)
api.post('/search', search)
api.get('/getGenderCounts', getGenderCounts)
api.get('/getTotalCases', getTotalCases)
api.get('/getStatus', getStatus)
api.get('/getDistributionByAge', getDistributionByAge)
//api.put('/deactivateAlert/:id', deactivateAlert)



export default api