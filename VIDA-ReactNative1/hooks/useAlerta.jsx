import React from 'react';
import { saveAlertaRequest } from '../services/api.js';
import Toast from 'react-native-toast-message';

export const useAlerta = () => {
    const [isLoading, setIsLoading] = React.useState(false);

    const addAlerta = async (alerta) => {
        setIsLoading(true);
        
        // Crear un objeto FormDatadsafsd
        const formData = new FormData();
        for (const key in alerta) {
            if (key === 'fotoDesaparecido' && alerta[key]) {
                console.log('0');
                formData.append(key, {
                    uri: alerta[key],
                    type: 'image/jpeg',
                    name: 'photo.jpg',
                });
            } else {
                formData.append(key, alerta[key]);
            }
        }

        const res = await saveAlertaRequest(formData);
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
