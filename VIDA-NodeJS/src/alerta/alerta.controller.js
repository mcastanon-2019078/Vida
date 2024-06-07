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
        if (alertas.length === 0) return res.status(404).send({ message: 'There are not animals to see' })
        return res.send({ alertas })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error getting alerts' })
    }
}

//Total de personas desaparecias por genero
export const getGenderCounts = async (req, res) => {
    try {
        const femaleCount = await Alerta.countDocuments({ sexoDesaparecido: 'Femenino' })
        const maleCount = await Alerta.countDocuments({ sexoDesaparecido: 'Masculino' })
        const totalCount = femaleCount + maleCount
        const femalePercentage = totalCount > 0 ? (femaleCount / totalCount) * 100 : 0
        const malePercentage = totalCount > 0 ? (maleCount / totalCount) * 100 : 0
        return res.status(200).send({
            msg: `Cantidad de mujeres reportadas es de: ${femaleCount} (${femalePercentage.toFixed(2)}%),
                 y la cantidad de hombres reportados es de: ${maleCount} (${malePercentage.toFixed(2)}%)`,
        });
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: "Error getting gender counts" })
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


//Personas desaparecidas actualmente
export const getNotFound = async (req, res) => {
    try {
        const notFound = await Alerta.find({ estadoAlerta: 'Desaparecido' })
            .select('nombresDesaparecido apellidosDesaparecido -_id'); 
        if (notFound.length === 0) {
            return res.status(404).send({ message: 'No se encontraron personas desaparecidas' });
        }

        return res.send({ msg: 'Las personas no encontradas son:',cantidad: notFound.length , notFound });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ msg: 'Error al querer obtener las personas no encontradas' });
    }
};

//Personas encontradas
export const getFound = async (req, res) => {
    try {
        let peopleFound = await Alerta.find({ estadoAlerta: 'Encontrado' })
            .select('nombresDesaparecido apellidosDesaparecido')
        if (peopleFound.length === 0) {
            return res.status(404).send({ msg: 'No se aun no se han encontrado personas' })
        }
        return res.status(200).send({ msg: 'Las tareas completas son: ',cantidad: peopleFound.length, peopleFound })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ msg: 'Error al querer obtner las tareas completas' })
    }
}

export const getDistributionByAge = async (req, res) => {
    try {
        const alertas = await Alerta.find().select('edadDesaparecido') 
        if (alertas.length === 0) {
            return res.status(404).send({ message: 'No se encontraron alertas' })
        }
        const ageGroups = {
            '0-5': 10,
            '6-10': 0,
            '11-15': 0,
            '16-20': 0,
            '21-25': 0,
        }
        alertas.forEach(alerta => {
            const edad = alerta.edad
            if (edad >= 0 && edad <= 5) ageGroups['0-5']++
            else if (edad >= 6 && edad <= 10) ageGroups['6-10']++
            else if (edad >= 11 && edad <= 15) ageGroups['11-15']++
            else if (edad >= 16 && edad <= 20) ageGroups['16-20']++
            else if (edad >= 21 && edad <= 25) ageGroups['21-25']++
        })

        return res.status(200).send({ ageGroups })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error al obtener la distribución por edad' })
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