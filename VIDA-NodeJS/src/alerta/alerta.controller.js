'use strict'
import Alerta from './alerta.model.js'
import path from 'path'
import Imagen from './alerta.model.js'
import { fileURLToPath } from 'url'
import fs from 'fs'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const uploadDir = path.join(__dirname, '../public/uploads')



export const save = async (req, res) => {
    try {
        let data = req.body;
        const validacion = validar(req.file, 'Y')
        if (validacion == '') {
            const imagen = new Imagen({
                nombresDesaparecido: data.nombresDesaparecido,
                apellidosDesaparecido: data.apellidosDesaparecido,
                edadDesaparecido : data.edadDesaparecido,
                estaturaDesaparecido : data.estaturaDesaparecido,
                descripcionDesaparecido : data.descripcionDesaparecido,
                direccionVivienda : data.direccionVivienda,
                direccionDesaparicion : data.direccionDesaparicion,
                fechaDesaparicion : data.fechaDesaparicion,
                sexoDesaparecido : data.sexoDesaparecido,
                fotoDesaparecido : req.file.filename,
                nombresDenunciante: data.nombresDenunciante,
                apellidosDenunciante : data.apellidosDenunciante,
                DPIDenunciente : data.DPIDenunciente,
                telefonoDenunciante : data.telefonoDenunciante,
                emailDenunciante : data.emailDenunciante,
                parentescoDenunciante : data.parentescoDenunciante,
                edadDenunciante : data.edadDenunciante,
                direccionViviendaDenunciante : data.direccionViviendaDenunciante,
                sexoDenunciante : data.sexoDenunciante,
                estadoAlerta : data.estadoAlerta




            })
            await imagen.save()
            return res.send({message: 'Alert saved successfully'})
        }
        return res.status(400).send({message: 'Error saving alert'})
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error server' });
    }


}



export const get = async (req, res) => {
    try {
        let alertas = await Alerta.find()
        if (alertas.length === 0) return res.status(404).send({ message: 'There are not animals to see' })
        return res.send({ alertas })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error getting alerts' })
    }
}

export const update = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body

        let updatedAlert = await Alerta.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )

        if (!updatedAlert) return res.status(404).send({ message: 'Alert not found and not updated' })
        return res.send({ message: 'Alert updated successfully', updatedAlert })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error updating alerts' })
    }
}


export const deleteAlert = async (req, res) => {
    try {
        let { id } = req.params
        let deletedAlert = await Alerta.deleteOne({ _id: id })
        if (deletedAlert.deleteCount == 0) return res.status(404).send({ message: 'Alert not found and not deleted' })
        return res.send({ message: 'Deleted alert successfully' })
    } catch (error) {
        console.error(error)
        return res.send({ message: 'Error deleting alert' })
    }
}

export const search = async (req, res) => {
    try {
        let { search } = req.body
        let alerta = await Alerta.find(
            { nombresDesaparecido: search }
        )

        if (alerta.length == 0) return res.status(404).send({ message: 'Alert not found' })
        return res.send({ message: 'Alert found', alerta })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error gettin alert' })
    }
}



const validar = (imagen,sevsalida) =>{
    var errors = []
    if(sevsalida === 'Y' && !imagen){
        errors.push('Selecciona una imagen en formato jpg o png')
    }else{
        if (errors.length === 0) {
            let filePath = path.join(uploadDir, imagen.filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                return ''
            }
        }
    }
    return errors
}