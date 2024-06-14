import React, { useCallback, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

const WelcomeScreen = () => {
    const [fontsLoaded] = useFonts({
        Outfit: require('../../assets/fonts/Outfit-Bold.ttf'),
    })

    const navigation = useNavigation()

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync()
        }
        prepare()
    }, [])

    const onLayout = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync()
        }
    }, [fontsLoaded])

    const handleHome = () => {
        navigation.navigate('HomeScreen')
    }

    if (!fontsLoaded) return null

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/img/Welcome.png')}
                style={styles.image}
            />
            <View style={styles.contentContainer} onLayout={onLayout}>
                <Text style={styles.description}>
                    Vida es una innovadora aplicación diseñada para facilitar la
                    búsqueda y publicación de casos de personas desaparecidas.
                    Con una interfaz intuitiva, conecta a la comunidad para
                    compartir indicios, difundir alertas y colaborar en la
                    búsqueda de seres queridos. Ofrece un espacio seguro y
                    efectivo para crear conciencia sobre casos de desapariciones
                    y promover la solidaridad entre sus usuarios.
                </Text>
                <TouchableOpacity onPress={handleHome} style={styles.button}>
                    <Text style={styles.buttonText}>Continuar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F2E52',
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 17 / 12,
        resizeMode: 'contain',
    },
    contentContainer: {
        padding: 25,
        marginTop: 10,
        height: '100%',
    },
    description: {
        fontSize: 20,
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 40,
        fontFamily: 'Outfit',
    },
    button: {
        padding: 20,
        backgroundColor: '#814EDA',
        borderRadius: 15,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Outfit',
    },
})
