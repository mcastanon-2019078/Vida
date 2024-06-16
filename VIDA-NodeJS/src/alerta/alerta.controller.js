'use strict'
import Alerta from './alerta.model.js'
import path from 'path'
import Imagen from './alerta.model.js'
import { fileURLToPath } from 'url'
import fs from 'fs'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const uploadDir = path.join(__dirname, '../public/uploads')


 

//Recibe todos los campos menos la imagen
export const save = async (req, res) => {
    //console.log(req.body)
   // return res.send({ message: req.body });
    
    
        try {
            let data = req.body;
           if (data) {
                data.fotoDesaparecido = req.body.fotoDesaparecido.uri
            }
            console.log(data)
        let alerta = new Alerta(data)
        await alerta.save();
        return res.send({ message: 'Alert saved successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error saving alert' });
    }
}

export const save5 = async (req, res) => {
    try {
        console.log('Starting save process...')
        console.log('Request headers:', req.headers);
        let data = req.body;
        console.log('Received data:', data);
        const validacion = validar(req.file, 'Y')
        console.log('Validation result:', validacion);
        if (validacion == '') {
            if (req.file) {
                data.fotoDesaparecido = req.file.filename;
            }
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
                fotoDesaparecido : data.fotoDesaparecido,
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
            console.log('Created new Imagen:', imagen);
            await imagen.save()
            console.log('Saved Imagen successfully');
            return res.send({message: 'Alert saved successfully', imagen})
        }
        console.log('Error in validation');
        return res.status(400).send({message: 'Error saving alert'})
    } catch (error) {
        console.error('Error in save process:', error);
        return res.status(500).send({ message: 'Error server', validacion });
    }
}



export const get = async (req, res) => {
    try {
        let alertas = await Alerta.find()
        if (alertas.length === 0) return res.status(404).send({ message: 'There are not alerts to see' })
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