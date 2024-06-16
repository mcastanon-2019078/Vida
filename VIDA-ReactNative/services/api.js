import axios from 'axios';

// Suponiendo que apiUrl ya está configurado con la URL base de tu API
const apiUrl = axios.create({
    baseURL: 'http://192.168.1.4:2880',

    /* baseURL: 'http://localhost:2880', */
    /*headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }*/
});

/*export const saveAlertaRequest = async (alerta) => {
    try {
        const formData = new FormData();
        
        // Añadir los otros campos de alerta al FormData
        Object.keys(alerta).forEach(key => {
            if (key !== 'fotoDesaparecido') {
                formData.append(key, alerta[key]);
            }
        });

        // Añadir la imagen al FormData
        if (alerta.fotoDesaparecido) {
            formData.append('file', {
                uri: alerta.fotoDesaparecido.uri,
                name: alerta.fotoDesaparecido.name,
                type: alerta.fotoDesaparecido.type || 'image/jpg' // Ajusta el tipo MIME según sea necesario
            });
        }

        const response = await apiUrl.post('/save', formData);
        return response.data;
    } catch (error) {
        return {
            error: true,
            message: error.message,
            response: error.response
        };
    }
};*/



export const saveAlertaRequest = async (alerta) => {
    console.log(alerta)
    try {
        const response = await apiUrl.post('/alert/save', alerta);
        return response.data;

    } catch (error) {
        return {
            error: true,
            message: error.message,
            response: error.response
        };
    }
}


//MISAEL
export const getAlertRequest = async () => {
    try {
        return await apiUrl.get('/alert/get')
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}