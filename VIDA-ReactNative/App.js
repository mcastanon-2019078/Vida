import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import WelcomeScreen from './src/components/WelcomeScreen.jsx'
import AlertClient from './src/components/AlertClient.jsx';
import { Maps } from './src/components/Maps.jsx'
import TabNavigation from './src/components/navigations/TabNavigation.jsx'
import HomeScreen from './src/components/HomeScreen.jsx'
import CreateAlert from './src/components/CreateAlerta.jsx'
import Ourhistory from './src/components/OurhistoryScreen.jsx'
import OurWork from './src/components/OurworkScreen.jsx'
import ActiveAlert from './src/components/questions/ActiveteAlertScreen.jsx'
import DisableAlert from './src/components/questions/DisableAlertScreen.jsx'


import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/components/Login';
import Toast from 'react-native-toast-message';
import HomeAdmin from './src/components/Home';
import RegisterScreen from './src/components/Register';
import AlertAdmin from './src/components/AlertAdmin.jsx'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Vistas del Home */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="HomeD" component={TabNavigation} />
        {/* Vistas del funcionalidades */}
        <Stack.Screen name="CreateAlert" component={TabNavigation} />
        <Stack.Screen name="CreateAlerta" component={CreateAlert} />
        <Stack.Screen name="AlertClient" component={AlertClient} />
        <Stack.Screen name="Maps" component={Maps} />
        {/* Sobre Nosotros */}
        <Stack.Screen name="History" component={Ourhistory} />
        <Stack.Screen name="OurWork" component={OurWork} />
        {/* Preguntas */}
        <Stack.Screen name="ActiveAlert" component={ActiveAlert} />
        <Stack.Screen name="DisableAlert" component={DisableAlert} />
        {/* Register / Login  */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Admin" component={AlertAdmin} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
