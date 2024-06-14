import axios from 'axios';

// Suponiendo que apiUrl ya está configurado con la URL base de tu API
const apiUrl = axios.create({
    baseURL: 'http://192.168.1.4:2880',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
});

export const saveAlertaRequest = async (alerta) => {
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

export const getAlertRequest = async () => {
    try {
        const response = await apiUrl.get('/alert/get');
        return response.data;
    } catch (error) {
        return {
            error: true,
            message: error.message,
            response: error.response
        };
    }
}
