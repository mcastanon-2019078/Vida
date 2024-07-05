import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

const OurhistoryScreen = () => {
    const navigation = useNavigation()

    const handleHome = () => {
        navigation.navigate('HomeD')
    }

    return (
        <ScrollView style={styles.container}>
            <Image
                source={require('../../assets/img/ourhistory.png')}
                style={styles.image}
            />
            <View style={styles.dContainer}>
                <Text style={styles.title1}>Nuestra Historia</Text>
                <Text style={styles.title}>
                    Es un proyecto dedicado a ayudar en la búsqueda y
                    localización de personas desaparecidas. Nuestro compromiso
                    surge de la necesidad imperante de brindar apoyo y esperanza
                    a las familias afectadas por la desaparición de sus seres
                    queridos.
                </Text>
                <Text style={styles.title1}>Cómo Surge</Text>
                <Text style={styles.title}>
                    El proyecto VIDA nace del reconocimiento de una problemática
                    social que afecta a miles de personas y familias. La
                    desaparición de un ser querido es una experiencia
                    devastadora que requiere una respuesta rápida y eficaz.
                    Inspirados por la solidaridad y el deseo de ayudar a quienes
                    enfrentan esta difícil situación, un grupo de profesionales
                    y voluntarios decidimos unir esfuerzos para crear una
                    iniciativa que haga la diferencia.
                </Text>
                <Text style={styles.title1}>Por Qué Se Llama VIDA</Text>
                <Text style={styles.title}>
                    El nombre VIDA significa: <Text></Text>
                    <Text style={styles.number}>
                        Volver a Integrar Desaparecidos con Amor
                    </Text>
                    , encapsulando la esencia y el propósito de nuestro
                    proyecto. Cada letra representa nuestro objetivo principal:
                    devolver la vida y la esperanza a las familias, reintegrando
                    a los desaparecidos con el cariño y el apoyo que merecen. La
                    elección de este nombre refleja nuestro compromiso de
                    trabajar con amor y dedicación en la búsqueda y
                    reunificación de las personas desaparecidas.
                </Text>
                <TouchableOpacity onPress={handleHome} style={styles.button}>
                    <View style={styles.buttonText}>
                        <Ionicons
                            name="return-down-back-outline"
                            size={35}
                            color="white"
                        />
                        <Text style={styles.buttonText}> Regresar</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default OurhistoryScreen

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
    dContainer: {
        padding: 25,
    },
    title1: {
        fontSize: 30,
        textAlign: 'justify',
        marginBottom: 10,
        color: '#814EDA',
        fontFamily: 'Outfit',
    },
    title: {
        fontSize: 20,
        textAlign: 'justify',
        marginBottom: 35,
        color: '#FFF',
        fontFamily: 'Outfit',
    },
    number: {
        paddingLeft: 25,
        fontSize: 20,
        textAlign: 'justify',
        color: '#814EDA',
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Outfit',
    },
})
