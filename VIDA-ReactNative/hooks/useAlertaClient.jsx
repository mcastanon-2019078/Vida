import { useState } from 'react';
import { saveAlertaClientRequest } from '../services/api.js';
import Toast from 'react-native-toast-message';

export const useAlertaClient = () => {
    const [isLoading, setIsLoading] = useState(false);

    const addAlertaClient = async (alerta) => {
        setIsLoading(true);
        const res = await saveAlertaClientRequest(alerta);
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
        addAlertaClient,
    };
};
