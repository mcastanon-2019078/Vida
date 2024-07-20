import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useLogin } from '../../hooks/useLogin'

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const { login, isLoading } = useLogin()

    const resetForm = () => {
        setUsername('')
        setPassword('')
        setError(false)
    }

    const handleLogin = async () => {
        const res = await login({ username, password })
        resetForm()

        if (res && res.err) {
            setError(true)
        } else {
            navigation.navigate('Admin')
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Image
                source={require('../../assets/img/Inicio.png')}
                style={styles.image}
            />
            <View style={styles.outerContainer}>
                <View style={styles.card}>
                    <View style={styles.inputWrapper}>
                        <Icon
                            name="user"
                            size={20}
                            color="#333"
                            style={styles.icon}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <Icon
                            name="lock"
                            size={20}
                            color="#333"
                            style={styles.icon}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Password"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                    {error && (
                        <Text style={styles.errorMessage}>
                            Credenciales incorrectas
                        </Text>
                    )}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogin}
                        disabled={isLoading}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.buttonText}>Registrarse</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
        marginBottom: 90,
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
    errorMessage: {
        color: 'red',
        marginTop: 5,
        marginHorizontal: 35,
        fontFamily: 'Outfit',
    },
})

export default LoginScreen
