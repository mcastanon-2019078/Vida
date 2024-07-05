import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Dimensions, Keyboard } from 'react-native'
import HomeScreen from '../HomeScreen.jsx'
import AlertClient from '../AlertClient.jsx'
import { Maps } from '../Maps.jsx'
import { Ionicons } from '@expo/vector-icons'
import CreateAlert from '../CreateAlerta.jsx'
import HomeIScreen from '../HomeIScreen.jsx'

const Tab = createBottomTabNavigator()

const TabNavigation = () => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false)

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true)
            }
        )
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false)
            }
        )

        return () => {
            keyboardDidHideListener.remove()
            keyboardDidShowListener.remove()
        }
    }, [])

    return (
        <View style={styles.container}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarActiveTintColor: '#814EDA',
                    tabBarStyle: {
                        position: 'absolute',
                        backgroundColor: 'transparent',
                        borderTopWidth: 0,
                        height: isKeyboardVisible ? 0 : 105,
                        elevation: 0,
                        zIndex: 2,
                    },
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName
                        if (route.name === 'Inicio') {
                            iconName = focused ? 'home' : 'home-outline'
                        } else if (route.name === 'CreateAlerts') {
                            iconName = focused ? 'id-card' : 'id-card-outline'
                        } else if (route.name === 'SearchAlert') {
                            iconName = focused ? 'alert' : 'alert-outline'
                        } else if (route.name === 'Maps') {
                            iconName = focused ? 'location' : 'location-outline'
                        }

                        return (
                            <Ionicons
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        )
                    },
                    tabBarLabel: () => null,
                })}
            >
                <Tab.Screen name="Inicio" component={HomeIScreen} />
                <Tab.Screen name="CreateAlerts" component={CreateAlert} />
                <Tab.Screen name="SearchAlert" component={AlertClient} />
                <Tab.Screen name="Maps" component={Maps} />
            </Tab.Navigator>
            {!isKeyboardVisible && (
                <View style={styles.tabBarBackground} pointerEvents="none" />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBarBackground: {
        position: 'absolute',
        bottom: 20,
        left: 10,
        right: 10,
        height: 70,
        backgroundColor: 'white',
        borderRadius: 50,
        elevation: 5,
        zIndex: 1,
    },
    iconContainer: {
        zIndex: 2,
    },
})

export default TabNavigation
