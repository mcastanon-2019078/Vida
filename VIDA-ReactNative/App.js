import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button } from 'react-native';
import Toast from 'react-native-toast-message';
import CreateAlerta from './src/components/CreateAlerta.jsx';

const Stack = createNativeStackNavigator();

export default function App() {
  console.log("Hola")

  return <CreateAlerta />

}

