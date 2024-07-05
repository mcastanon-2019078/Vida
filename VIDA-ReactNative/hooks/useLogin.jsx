import { useState } from 'react';
import { loginRequest } from '../services/api.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const login = async (data) => {
    setIsLoading(true);
    try {
      const res = await loginRequest(data);
      setIsLoading(false);

      if (res.error) {
        Toast.show({
          type: 'error',
          text1: res.error?.response?.data?.message || 'Error login',
          position: 'bottom',
        });
        return { err: true };
      }

      Toast.show({
        type: 'success',
        text1: res.data?.message || 'Login successful',
        position: 'bottom',
      });


      await AsyncStorage.setItem('token', res.data.token);

      return { err: false };
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      return { err: true };
    }
  };

  return {
    login,
    isLoading
  };
};
