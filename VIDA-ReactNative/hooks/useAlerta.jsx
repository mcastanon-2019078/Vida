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
};
