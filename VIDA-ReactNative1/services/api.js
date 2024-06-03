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
        if (error.response && error.response.status === 500) {
            return {
                error: true,
                message: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.'
            };
        } else {
            return {
                error: true,
                message: 'Error en la solicitud: ' + error.message
            };
        }
    }
};
