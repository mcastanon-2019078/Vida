'use strict'
import Alerta from './alertaCliente.model.js' 
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

// Convierte import.meta.url a una ruta de archivo
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const uploadDir = path.join(__dirname, '../public/uploads')

// Recibe todos los campos y la imagen
export const save = async (req, res) => {
    try {
        // Extrae los datos del cuerpo de la solicitud
        let data = req.body

        // Si se ha subido una imagen, adjunta su nombre al objeto de datos
        if (req.file) {
            data.fotoDesaparecido = req.file.filename // Guarda el nombre del archivo subido en los datos
        }

        // Crea una nueva instancia del modelo Alerta con los datos recibidos
        let alerta = new Alerta(data)

        // Guarda la alerta en la base de datos
        await alerta.save()

        // Envía una respuesta de éxito al cliente
        return res.send({ message: 'Alert saved successfully', alerta })
    } catch (error) {
        // Si ocurre un error, registra el error en la consola y envía una respuesta de error al cliente
        console.error(error)
        return res.status(500).send({ message: 'Error saving alert' })
    }
}


export const save5 = async (req, res) => {
    try {
        console.log('Starting save process...')
        console.log('Request headers:', req.headers)
        let data = req.body;
        console.log('Received data:', data)
        const validacion = validar(req.file, 'Y')
        console.log('Validation result:', validacion)
        if (validacion == '') {
            if (req.file) {
                data.fotoDesaparecido = req.file.filename
            }
            const imagen = new Imagen({
                nombresDesaparecido: data.nombresDesaparecido,
                apellidosDesaparecido: data.apellidosDesaparecido,
                edadDesaparecido: data.edadDesaparecido,
                estaturaDesaparecido: data.estaturaDesaparecido,
                descripcionDesaparecido: data.descripcionDesaparecido,
                direccionVivienda: data.direccionVivienda,
                direccionDesaparicion: data.direccionDesaparicion,
                fechaDesaparicion: data.fechaDesaparicion,
                sexoDesaparecido: data.sexoDesaparecido,
                fotoDesaparecido: data.fotoDesaparecido,
                nombresDenunciante: data.nombresDenunciante,
                apellidosDenunciante: data.apellidosDenunciante,
                DPIDenunciente: data.DPIDenunciente,
                telefonoDenunciante: data.telefonoDenunciante,
                emailDenunciante: data.emailDenunciante,
                parentescoDenunciante: data.parentescoDenunciante,
                edadDenunciante: data.edadDenunciante,
                direccionViviendaDenunciante: data.direccionViviendaDenunciante,
                sexoDenunciante: data.sexoDenunciante,
                estadoAlerta: data.estadoAlerta
            })
            console.log('Created new Imagen:', imagen)
            await imagen.save()
            console.log('Saved Imagen successfully')
            return res.send({ message: 'Alert saved successfully', imagen })
        }
        console.log('Error in validation');
        return res.status(400).send({ message: 'Error saving alert' })
    } catch (error) {
        console.error('Error in save process:', error)
        return res.status(500).send({ message: 'Error server', validacion })
    }
}



export const getC = async (req, res) => {
    try {
        let alertas = await Alerta.find({ estadoAlerta: { $ne: 'Inactiva' } }) // Filtrar por estado activo

        if (alertas.length === 0) {
            return res.status(404).send({ message: 'No hay alertas activas para mostrar' })
        }

        return res.send({ alertas })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error al obtener las alertas' })
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



const validar = (imagen, sevsalida) => {
    var errors = []
    if (sevsalida === 'Y' && !imagen) {
        errors.push('Selecciona una imagen en formato jpg o png')
    } else {
        if (errors.length === 0) {
            let filePath = path.join(uploadDir, imagen.filename)
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath)
                return ''
            }
        }
    }
    return errors
}


//Total de personas desaparecias por genero
export const getGenderCounts = async (req, res) => {
    try {
        const femaleCount = await Alerta.countDocuments({ sexoDesaparecido: 'Femenino' })
        const maleCount = await Alerta.countDocuments({ sexoDesaparecido: 'Masculino' })
        const totalCount = femaleCount + maleCount;
        const femalePercentage = totalCount > 0 ? (femaleCount / totalCount) * 100 : 0
        const malePercentage = totalCount > 0 ? (maleCount / totalCount) * 100 : 0

        console.log({
            femalePercentage: femalePercentage.toFixed(2),
            malePercentage: malePercentage.toFixed(2),
        })

        return res.status(200).json({
            femalePercentage: femalePercentage.toFixed(2),
            malePercentage: malePercentage.toFixed(2),
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Error getting gender counts" });
    }
}

//Total de personas desaparecidas en total
export const getTotalCases = async(req,res)=>{
    try {
        const femaleCount = await Alerta.countDocuments({ sexoDesaparecido: 'Femenino' })
        const maleCount = await Alerta.countDocuments({ sexoDesaparecido: 'Masculino' })
        const total = femaleCount + maleCount
        return res.status(200).send({
            msg: `Cantidad de casos reportados es de: ${total}`,
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error getting gender'})
    }
}

export const getStatus = async (req, res) => {
    try {
        // Obtener personas desaparecidas
        const notFound = await Alerta.find({ estadoAlerta: 'Activa' })
            .select('nombresDesaparecido apellidosDesaparecido -_id');
        
        // Obtener personas encontradas
        const peopleFound = await Alerta.find({ estadoAlerta: 'Inactiva' })
            .select('nombresDesaparecido apellidosDesaparecido -_id');
        
        // Condición para manejar cuando no hay personas desaparecidas ni encontradas
        if (notFound.length === 0 && peopleFound.length === 0) {
            return res.status(404).send({ message: 'No se encontraron personas desaparecidas ni encontradas' })
        }

        // Crear la respuesta con las personas desaparecidas y encontradas
        const response = {
            cantidadDesaparecidos: notFound.length,
            cantidadEncontrados: peopleFound.length
        };

        return res.status(200).send({ msg: 'Estado de personas:', ...response });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ msg: 'Error al intentar obtener el estado de las personas' })
    }
}
export const getDistributionByAge = async (req, res) => {
    try {
        const alertas = await Alerta.find().select('edadDesaparecido') 
        if (alertas.length === 0) {
            return res.status(404).send({ message: 'No se encontraron alertas' })
        }
        const ageGroups = {
            '0-5': [],
            '6-10': [],
            '11-15': 0,
            '16-20': 0,
            '21-25': 0,
        }
        alertas.forEach(alerta => {
            const edadDesaparecido = alerta.edadDesaparecido
            if (edadDesaparecido >= 0 && edadDesaparecido <= 5) ageGroups['0-5']++
            else if (edadDesaparecido >= 6 && edadDesaparecido <= 10) ageGroups['6-10']++
            else if (edadDesaparecido >= 11 && edadDesaparecido <= 15) ageGroups['11-15']++
            else if (edadDesaparecido >= 16 && edadDesaparecido <= 20) ageGroups['16-20']++
            else if (edadDesaparecido >= 21 && edadDesaparecido <= 25) ageGroups['21-25']++
        })

        return res.status(200).send({ ageGroups })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error al obtener la distribución por edad' })
    }
}

