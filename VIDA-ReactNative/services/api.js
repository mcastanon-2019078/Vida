import axios from 'axios';


const apiUrl = axios.create({
    baseURL: 'http://192.168.100.5:2880',
});


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
        return await apiUrl.get('/alertClient/getAlertClient')
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}