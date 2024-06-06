'use strict'
import multer from 'multer'
import Alerta from './alerta.model.js'

// Configuramos de multer para almacenamiento en memoria
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

export const save = async (req, res) => {
    try {
        // Manejara la carga de la imagen
        upload.single('fotoDesaparecido')(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                // Un error ocurrió durante la carga de la imagen
                return res.status(500).send({ msg: 'Error al cargar la imagen' })
            } else if (err) {
                // Otro tipo de error
                return res.status(500).send({ msg: 'Error desconocido' })
            }

            let data = req.body
            if (req.file) {
                // Si se cargó una imagen, adjuntar el buffer al objeto de datos
                data.fotoDesaparecido = req.file.buffer
            }

            // Crear una nueva instancia de Alerta con los datos
            let alerta = new Alerta(data)

            // Guardar la alerta en la base de datos
            await alerta.save()

            return res.send({ msg: 'Alert saved successfully' })
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ msg: 'Error saving alert' })
    }
}

export const get = async (req, res) => {
    try {
        let alertas = await Alerta.find()
        if (alertas.length === 0) {
            return res.status(404).send({ message: 'There are no alerts to see' })
        }

        // Convertir `Buffer` a base64 antes de enviar la respuesta
        /* alertas = alertas.map(alerta => ({
            ...alerta._doc,
            fotoDesaparecido: alerta.fotoDesaparecido ? alerta.fotoDesaparecido.toString('base64') : null
        }))
 */
        return res.send({ alertas })
    } catch (err) {
        console.error(err)
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