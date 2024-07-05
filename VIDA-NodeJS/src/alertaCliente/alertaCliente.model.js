'use strict'

import { Schema, model } from "mongoose"

const alertaClienteSchema = Schema({
    nombresDesaparecido: {
        type: String,
        //required: true
    },
    apellidosDesaparecido: {
        type: String,
        //required: true
    },
    edadDesaparecido: {
        type: Number,
        //required: true
    },
    estaturaDesaparecido: {
        type: Number,
        //required: true
    },
    descripcionDesaparecido: {
        type: String,
        //required: true
    },
    direccionVivienda: {
        type: String,
        //required: true
    },
    direccionDesaparicion: {
        type: String,
        //required: true
    },
    fechaDesaparicion: {
        type: String, /* edité esto para prueba*/
        //required: true
    },
    sexoDesaparecido: {
        type: String,
        enum: ['Masculino', 'Femenino'],
        //required: true
    },
    fotoDesaparecido: {
        type: String,
        //required: true
    },

    nombresDenunciante: {
        type: String,
        //required: true
    },
    apellidosDenunciante: {
        type: String,
        //required: true
    },
    DPIDenunciante: {
        type: String,
        //required: true
    },
    telefonoDenunciante: {
        type: String,
        //required: true
    },
    emailDenunciante: {
        type: String,
        //required: true
    },
    parentescoDenunciante: {
        type: String,
        //required: true
    },
    edadDenunciante: {
        type: Number,
        //required: true
    },
    direccionViviendaDenunciante: {
        type: String,
        //required: true
    },
    sexoDenunciante: {
        type: String,
        enum: ['Masculino', 'Femenino'],
        //required: true
    },
    estadoAlerta: {
        type: String,
        enum: ['Inactiva', 'Activa'],
        //required: true
    }

})

export default model('alertaCliente', alertaClienteSchema)