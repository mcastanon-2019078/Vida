import { useEffect } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
} from 'react-native'
import { useGetAlertas } from '../shared/hooks/alerta/useGetAlertas'

export const AlertClient = () => {
    const { alerts, isFetching, getAlerts } = useGetAlertas()

    useEffect(() => {
        getAlerts()
    }, [])

    const renderAlerts = () => {
        if (isFetching) {
            return <ActivityIndicator size="large" color="#0000ff" />
        } else if (alerts && Array.isArray(alerts.alertas)) {
            return (
                <ScrollView>
                    {alerts.alertas.map((alert) => (
                        <View key={alert._id} style={styles.card}>
                            <Text style={styles.title2}>
                                Datos del Desaparecido
                            </Text>
                            <View style={styles.imageAndDataContainer}>
                                {alert.fotoDesaparecido && (
                                    <Image
                                        source={{
                                            uri: `data:image/jpeg;base64,${alert.fotoDesaparecido}`,
                                        }}
                                        style={styles.image}
                                    />
                                )}
                                <View style={styles.textContainer}>
                                    <Text style={styles.textName}>
                                        {alert.nombresDesaparecido}{' '}
                                        {alert.apellidosDesaparecido}
                                    </Text>
                                    <Text style={styles.text}>
                                        Edad: {alert.edadDesaparecido} años
                                    </Text>
                                    <Text style={styles.text}>
                                        Estatura: {alert.estaturaDesaparecido} m
                                    </Text>
                                    <Text style={styles.text}>
                                        Descripción:{' '}
                                        {alert.descripcionDesaparecido}
                                    </Text>
                                    <Text style={styles.text}>
                                        Dirección de vivienda:{' '}
                                        {alert.direccionVivienda}
                                    </Text>
                                    <Text style={styles.text}>
                                        Dirección de desaparición:{' '}
                                        {alert.direccionDesaparicion}
                                    </Text>
                                    <Text style={styles.text}>
                                        Fecha de desaparición:{' '}
                                        {new Date(
                                            alert.fechaDesaparicion
                                        ).toLocaleDateString()}
                                    </Text>
                                    <Text style={styles.text}>
                                        Sexo: {alert.sexoDesaparecido}
                                    </Text>
                                    <Text style={styles.text}>
                                        Estado de la alerta:{' '}
                                        {alert.estadoAlerta}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            )
        } else {
            return <Text>No se encontraron alertas.</Text>
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title1}>Alertas</Text>
            {renderAlerts()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
    },
    title1: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'white',
    },
    title2: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
    },
    imageAndDataContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    image: {
        width: 150,
        height: 200,
        marginBottom: 5,
        marginRight: 5,
    },
    textContainer: {
        flex: 2,
    },
    text: {
        fontSize: 13,
        marginBottom: 5,
    },
    textName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
})
