'use strict'
import Alerta from './alerta.model.js'

export const save = async (req, res) => {
    try {
        let data = req.body
        let alerta = new Alerta(data)
        await alerta.save()
        return res.send({ message: 'Alert saved successfully' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error saving alert' })
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