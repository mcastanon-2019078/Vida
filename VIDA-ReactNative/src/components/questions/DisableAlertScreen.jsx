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

const DisableAlertScreen = () => {
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
                source={require('../../../assets/img/questions/DisableAlert.png')}
                style={styles.image}
            />
            <View style={styles.dContainer}>
                <Text style={styles.title1}>¿Cómo DESACTIVAR una alerta?</Text>
                <Text style={styles.title}>
                    Tan pronto se tenga conocimiento de la localización o
                    ubicación del niño, niña o adolescente, debe informar
                    inmediatamente a las autoridades que tomaron la denuncia o
                    hacerlo del conocimiento de la Unidad Operativa del Sistema
                    de VIDA.
                </Text>
                <Text style={styles.title2}>Debe presentar:</Text>
                <View style={styles.listItem}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.listText}>
                        Ala persona ante la autoridad que tomó la denuncia o
                        ante la Unidad Operativa del Sistema de Alerta VIDA.
                    </Text>
                </View>
                <View style={styles.listItem}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.listText}>
                        Documento Personal de Identificación del adulto
                        responsable.
                    </Text>
                </View>
                <View style={styles.listItem}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.listText}>
                        Certificación de nacimiento del niño, niña o
                        adolescente.
                    </Text>
                </View>
                <View style={styles.listItem}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.listText}>
                        Documentos judiciales que acrediten la guarda y custodia
                        si correspondiere.
                    </Text>
                </View>
                <Text style={styles.title2}>Reporte de localización</Text>
                <Text style={styles.description}>
                    Para reportar la localización o ubicación de la persona,
                    ingrese la información solicitada en el siguiente formulario
                    y seleccione enviar. La información se enviará de manera
                    inmediata a la Unidad Operativa, desde donde se comunicarán
                    con usted.
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

export default DisableAlertScreen

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
        fontSize: 30,
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
