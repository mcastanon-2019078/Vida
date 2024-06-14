import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const HomeScreen = () => {
    const navigation = useNavigation()

    const handleHome = () => {
        navigation.navigate('CreateAlert')
    }
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/img/Welcome.png')}
                style={styles.image}
            />

            <View style={styles.contentContainer}>
                <TouchableOpacity onPress={handleHome} style={styles.button}>
                    <View style={styles.buttonText}>
                        <Ionicons name="home" size={35} color="white" />
                        <Text style={styles.buttonText}> Inicio</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleHome} style={styles.button}>
                    <View style={styles.buttonText}>
                        <Ionicons name="search" size={35} color="white" />
                        <Text style={styles.buttonText}>Buscar Alertas</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleHome} style={styles.button}>
                    <View style={styles.buttonText}>
                        <Ionicons name="alert-circle" size={35} color="white" />
                        <Text style={styles.buttonText}> Activar Alerta</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomeScreen

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
        marginTop: 30,
        height: '100%',
    },
    button: {
        padding: 20,
        backgroundColor: '#814EDA',
        borderRadius: 15,
        marginTop: 30,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Outfit',
    },
})
