import axios from 'axios';


const apiUrl = axios.create({
    baseURL: 'http://192.168.81.73:2880',
})

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

//////////////////////////////////////////
export const registerRequest = async (data) => {
    try {
        return await apiUrl.post('createUser', data)
    } catch (error) {
        return {
            err: true,
            error
        }
    }
}

export const loginRequest = async (data) => {
    try {
        return await apiUrl.post('login', data)
    } catch (error) {
        return {
            err: true,
            error
        }
    }
}

/////////////////////////////CLIENTE
export const saveAlertaClientRequest = async (alerta) => {
    console.log(1)
    console.log(alerta)
    console.log(2)
    try {
        const response = await apiUrl.post('/alertClient/saveAlertClient', alerta);
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
export const getAlertClientRequest = async () => {
    try {
        return await apiUrl.get('/alertClient/getC')
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const getGenderCounts = async () => {
    try {
        const response = await apiUrl.get('/alert/getGenderCounts')
        console.log('API response:', response.data)
        return response.data
    } catch (err) {
        console.error("Error fetching gender counts: ", err)
        throw err;
    }
}

export const getStatus = async () => {
    try {
        const response = await apiUrl.get('/alert/getStatus');
        console.log('API response:', response.data);
        return response.data;
    } catch (err) {
        console.error("Error fetching Status: ", err);
        throw err; // Lanza el error para manejarlo en el componente que llama a esta función
    }
}

export const desactivarAlerta = async (id) => {
    try {
        const response = await apiUrl.put(`/deactivate/${id}`)
        return response.data // Devuelve los datos de la respuesta
    } catch (error) {
        console.error('Error al desactivar la alerta:', error)
        return { error: true, message: 'Error al desactivar la alerta' }// Devuelve un objeto de error
    }
}