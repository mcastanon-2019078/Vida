/*import { useState } from 'react'
import { saveAlertaRequest } from '../services/api.js'
import Toast from 'react-native-toast-message'
import axios from 'axios'

export const useAlerta = () => {
    const [isLoading, setIsLoading] = useState(false)

    const addAlerta = async (alerta) => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:2880/save', alerta, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error saving alert:', error);
        } finally {
            setIsLoading(true);
        }
    };

    return {
        isLoading,
        addAlerta,
    }
}*/
    

import { useState } from 'react';
import { saveAlertaRequest } from '../services/api.js';
import Toast from 'react-native-toast-message';

export const useAlerta = () => {
    const [isLoading, setIsLoading] = useState(false);

    const addAlerta = async (alerta) => {
        setIsLoading(true);
        const res = await saveAlertaRequest(alerta);
        setIsLoading(false);
        if (res.error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: res.error?.response?.data?.message || 'Error adding alerta'
            });
        } else {
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Alerta added'
            });
        }
    };

    return {
        isLoading,
        addAlerta,
    };
}