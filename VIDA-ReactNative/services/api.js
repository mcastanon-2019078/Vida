import axios from 'axios';

// Crear una instancia de Axios con la configuración básica
const apiUrl = axios.create({
    baseURL: 'http://localhost:2880/',
    timeout: 5000
});

/// CRUD ALERTA
// Agregar alerta
export const saveAlertaRequest = async (alerta) => {
    try {
        const response = await apiUrl.post('/save', alerta);
        return response.data;
    } catch (error) {
        return {
            error: true,
            message: error.message,
            response: error.response
        };
    }
};
