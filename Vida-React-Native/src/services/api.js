import axios from "axios"

const apiClient = axios.create({
    baseURL: 'http://192.168.56.1:2880', //para telefono
    //baseURL: 'http://localhost:2880', 
    timeout: 5000
})

export const getAlertRequest = async () => {
    try {
        return await apiClient.get('/alert/get')
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const getDistributionByAge = async () => {
    try {
        return await apiClient.get('/alert/getDistributionByAge')
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}