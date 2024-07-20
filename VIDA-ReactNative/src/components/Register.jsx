import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useRegister } from '../../hooks/useRegister'
import Toast from 'react-native-toast-message'

const RegisterScreen = ({ navigation }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
    })
    const { register, isLoading } = useRegister()

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value })
    }

    const resetForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
        })
    }

    const handleRegister = async () => {
        if (!formData.email.endsWith('@vida.com')) {
            Toast.show({
                type: 'error',
                text1: 'Tu registro fue rechazado',
                position: 'bottom',
            })
            resetForm()
            return
        }

        await register({
            name: formData.firstName,
            surname: formData.lastName,
            email: formData.email,
            username: formData.username,
            password: formData.password,
        })
        resetForm()
    }

    return (
        <ScrollView style={styles.container}>
            <Image
                source={require('../../assets/img/Registro.png')}
                style={styles.image}
            />
            <View style={styles.inputWrapper}>
                <Icon name="user" size={20} color="#333" style={styles.icon} />
                <TextInput
                    style={styles.textInput}
                    placeholder="Nombre"
                    value={formData.firstName}
                    onChangeText={(text) => handleChange('firstName', text)}
                />
            </View>

            <View style={styles.inputWrapper}>
                <Icon name="user" size={20} color="#333" style={styles.icon} />
                <TextInput
                    style={styles.textInput}
                    placeholder="Apellido"
                    value={formData.lastName}
                    onChangeText={(text) => handleChange('lastName', text)}
                />
            </View>
            <View style={styles.inputWrapper}>
                <Icon
                    name="envelope"
                    size={20}
                    color="#333"
                    style={styles.icon}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    value={formData.email}
                    onChangeText={(text) => handleChange('email', text)}
                />
            </View>
            <View style={styles.inputWrapper}>
                <Icon name="user" size={20} color="#333" style={styles.icon} />
                <TextInput
                    style={styles.textInput}
                    placeholder="Usuario"
                    value={formData.username}
                    onChangeText={(text) => handleChange('username', text)}
                />
            </View>
            <View style={styles.inputWrapper}>
                <Icon name="lock" size={20} color="#333" style={styles.icon} />
                <TextInput
                    style={styles.textInput}
                    placeholder="Contraseña"
                    secureTextEntry
                    value={formData.password}
                    onChangeText={(text) => handleChange('password', text)}
                />
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={handleRegister}
                disabled={isLoading}
            >
                <Text style={styles.buttonText}>
                    {isLoading ? 'Registering...' : 'Registrar'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
            <Toast />
        </ScrollView>
    )
}

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
        marginBottom: 20,
    },
    inputWrapper: {
        marginHorizontal: 30,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        elevation: 10,
        padding: 10,
        height: 55,
        paddingTop: 15,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: 'Outfit',
    },
    textInput: {
        flex: 1,
        fontFamily: 'Outfit',
    },
    icon: {
        marginRight: 10,
    },
    button: {
        marginTop: 20,
        marginHorizontal: 25,
        padding: 20,
        backgroundColor: '#814EDA',
        borderRadius: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Outfit',
    },
    error: {
        color: 'red',
        marginTop: 15,
        marginBottom: -6,
        fontFamily: 'Outfit',
    },
    errorP: {
        color: 'red',
        marginTop: 1,
        fontFamily: 'Outfit',
    },
})

export default RegisterScreen
