import axios from "axios"

const apiClient = axios.create({
    //baseURL: 'http://192.168.1.28:2880', para telefono
    baseURL: 'http://localhost:2880',
    timeout: 5000
})

export const getAlertRequest = async() => {
    try{
        return await apiClient.get('/alert/get')
    }catch(err){
        return{
            error: true,
            err
        }
    }
}