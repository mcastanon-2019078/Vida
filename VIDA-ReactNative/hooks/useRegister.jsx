import { useState } from 'react';
import { registerRequest } from '../services/api.js';
import Toast from 'react-native-toast-message';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);

  const register = async (data) => {
    setIsLoading(true);
    const res = await registerRequest(data);
    setIsLoading(false);

    if (res.err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: res.error?.response?.data?.message || 'Error registering',
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: res.data?.message,
      });
    }
  };

  return {
    register,
    isLoading,
  };
};
