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

const ActiveteAlertScreen = () => {
    const navigation = useNavigation()

    const handleHome = () => {
        navigation.navigate('HomeD')
    }
    const handleCreateAlert = () => {
        navigation.navigate('CreateAlerta')
    }

    return (
        <ScrollView style={styles.container}>
            <Image
                source={require('../../../assets/img/questions/ActiveAlert.png')}
                style={styles.image}
            />
            <View style={styles.dContainer}>
                <Text style={styles.title1}>¿Cómo ACTIVAR una alerta?</Text>
                <Text style={styles.title}>
                    Cuando se tenga conocimiento de la desaparición de una
                    persona, debe presentar denuncia de manera inmediata.
                </Text>
                <Text style={styles.title1}>
                    Para colocar una denuncia puede presentarse a:
                </Text>
                <View style={styles.listItem}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.listText}>
                        Subestaciones y sedes de la Policia Nacional Civil
                    </Text>
                </View>
                <View style={styles.listItem}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.listText}>
                        Oficinas de atención permanente del Ministerio Público
                    </Text>
                </View>
                <View style={styles.listItem}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.listText}>
                        Delegaciones departamentales de la Procuraduría General
                        de la Nación
                    </Text>
                </View>
                <View style={styles.listItem}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.listText}>
                        Sede de la Unidad Operativa (Ciudad Capital)
                    </Text>
                </View>
                <View style={styles.listItem}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.listText}>
                        También puede llamar al teléfono 1546 de la Unidad
                        Operativa o al 110 de la Policía Nacional Civil.
                    </Text>
                </View>
                <Text style={styles.title2}>Reporte de desaparición</Text>
                <Text style={styles.description}>
                    Para reportar la desaparición de una persona, ingrese la
                    información solicitada en el siguiente formulario y
                    seleccione enviar. La información se enviará de manera
                    inmediata a la Unidad Operativa, desde donde se comunicarán
                    con usted si se necesita ampliación de la información o
                    confirmación de los datos de la denuncia.
                </Text>
                <TouchableOpacity
                    onPress={handleCreateAlert}
                    style={styles.button}
                >
                    <View style={styles.buttonText}>
                        <Ionicons name="id-card" size={35} color="white" />
                        <Text style={styles.buttonText}> Formulario</Text>
                    </View>
                </TouchableOpacity>
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

export default ActiveteAlertScreen

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
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
        color: '#814EDA',
        fontFamily: 'Outfit',
        marginTop: 25,
    },
    title2: {
        fontSize: 24,
        textAlign: 'center',
        marginTop: 25,
        marginBottom: 10,
        color: '#814EDA',
        fontFamily: 'Outfit',
    },
    title: {
        fontSize: 20,
        textAlign: 'justify',
        marginBottom: 15,
        color: '#FFF',
        fontFamily: 'Outfit',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    bulletPoint: {
        width: 8,
        height: '100%',
        backgroundColor: '#814EDA',
        marginRight: 10,
    },
    listText: {
        flex: 1,
        fontSize: 20,
        color: '#FFF',
        fontFamily: 'Outfit',
    },
    description: {
        fontSize: 20,
        color: '#FFF',
        textAlign: 'justify',
        marginBottom: 40,
        fontFamily: 'Outfit',
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
