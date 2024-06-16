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

const OurworkScreen = () => {
    const navigation = useNavigation()

    const handleHome = () => {
        navigation.navigate('HomeD')
    }

    return (
        <ScrollView style={styles.container}>
            <Image
                source={require('../../assets/img/OurWork.png')}
                style={styles.image}
            />
            <View style={styles.dContainer}>
                <Text style={styles.title1}>Por Qué Se Llama VIDA</Text>
                <Text style={styles.title}>
                    El nombre VIDA significa: <Text></Text>
                    <Text style={styles.number}>
                        Volver a Integrar Desaparecidos con Amor
                    </Text>
                    , se enfoca en una serie de acciones y estrategias para
                    localizar y reunir a personas desaparecidas con sus seres
                    queridos. Nuestro enfoque integral incluye:
                </Text>
                <Text style={styles.title1}>Búsqueda y Localización</Text>
                <Text style={styles.title}>
                    Utilizamos tecnologías avanzadas y métodos de investigación
                    para rastrear y localizar a personas desaparecidas.
                    Colaboramos con autoridades, organizaciones y comunidades
                    para optimizar nuestros esfuerzos y ampliar nuestro alcance.
                </Text>
                <Text style={styles.title1}>Apoyo a las Familias</Text>
                <Text style={styles.title}>
                    Ofrecemos apoyo emocional y psicológico a las familias
                    afectadas, proporcionando un espacio seguro donde pueden
                    expresar sus preocupaciones y recibir orientación
                    profesional. Nuestro equipo de expertos trabaja de cerca con
                    las familias para mantenerlas informadas y apoyadas durante
                    todo el proceso de búsqueda.
                </Text>
                <Text style={styles.title1}>Difusión y Sensibilización</Text>
                <Text style={styles.title}>
                    Utilizamos tecnologías avanzadas y métodos de investigación
                    para rastrear y localizar a personas desaparecidas.
                    Colaboramos con autoridades, organizaciones y comunidades
                    para optimizar nuestros esfuerzos y ampliar nuestro alcance.
                </Text>
                <Text style={styles.title1}>Colaboración y Alianzas</Text>
                <Text style={styles.title}>
                    Establecemos alianzas con diversas organizaciones
                    gubernamentales y no gubernamentales, así como con grupos
                    comunitarios y voluntarios, para fortalecer nuestra red de
                    apoyo y mejorar la efectividad de nuestras acciones. La
                    colaboración es clave para maximizar recursos y esfuerzos en
                    la búsqueda de personas desaparecidas.
                </Text>
                <Text style={styles.title}>
                    Nuestro compromiso es inquebrantable y nuestra misión clara:
                    Volver a Integrar Desaparecidos con Amor y brindar esperanza
                    y consuelo a quienes más lo necesitan.
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

export default OurworkScreen

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
        fontSize: 25,
        textAlign: 'Center',
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
