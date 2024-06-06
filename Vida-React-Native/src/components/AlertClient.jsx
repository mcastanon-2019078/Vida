import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native'
import { getAlertRequest } from '../services/api.js'

export const AlertClient = () => {
    const [alerts, setAlerts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const response = await getAlertRequest()
                if (response.error) {
                    console.error("Error al obtener Alertas:", response.error)
                } else {
                    console.log(response.data) // Verifica la respuesta de la API
                    if (Array.isArray(response.data.alertas)) {
                        setAlerts(response.data.alertas)
                    } else {
                        console.error("El formato de los datos de alertas no es válido:", response.data)
                    }
                }
            } catch (err) {
                console.error("Error al obtener Alertas:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchAlerts()
    }, [])

    const renderAlerts = () => {
        if (loading) {
            return <ActivityIndicator size="large" color="#0000ff" />
        } else {
            return (
                <ScrollView>
                    {alerts.map((alert) => (
                        <View key={alert._id} style={styles.card}>
                            <View>
                                <Text style={styles.title2}>Datos del Desaparecido:</Text>
                            </View>
                            {alert.fotoDesaparecido && (
                                <Image
                                    source={{ uri: `data:image/jpeg;base64,${alert.fotoDesaparecido}` }}
                                    style={styles.image}
                                />
                            )}
                            <View>
                                <Text style={styles.text}>Desaparecido: {alert.nombresDesaparecido} {alert.apellidosDesaparecido}</Text>
                                <Text style={styles.text}>Edad: {alert.edadDesaparecido}</Text>
                                <Text style={styles.text}>Estatura: {alert.estaturaDesaparecido} m</Text>
                                <Text style={styles.text}>Descripción: {alert.descripcionDesaparecido}</Text>
                                <Text style={styles.text}>Dirección de vivienda: {alert.direccionVivienda}</Text>
                                <Text style={styles.text}>Dirección de desaparición: {alert.direccionDesaparicion}</Text>
                                <Text style={styles.text}>Fecha de desaparición: {new Date(alert.fechaDesaparicion).toLocaleDateString()}</Text>
                                <Text style={styles.text}>Sexo: {alert.sexoDesaparecido}</Text>
                                <Text style={styles.text}>Estado de la alerta: {alert.estadoAlerta}</Text>
                            </View>
                            <View>
                                <View>
                                    <Text style={styles.title2}>Datos del Denunciante:</Text>
                                </View>
                                <Text style={styles.text}>Denunciante: {alert.nombresDenunciante} {alert.apellidosDenunciante}</Text>
                                <Text style={styles.text}>DPI del denunciante: {alert.DPIDenunciente}</Text>
                                <Text style={styles.text}>Teléfono del denunciante: {alert.telefonoDenunciante}</Text>
                                <Text style={styles.text}>Email del denunciante: {alert.emailDenunciante}</Text>
                                <Text style={styles.text}>Parentesco del denunciante: {alert.parentescoDenunciante}</Text>
                                <Text style={styles.text}>Edad del denunciante: {alert.edadDenunciante}</Text>
                                <Text style={styles.text}>Dirección de vivienda del denunciante: {alert.direccionViviendaDenunciante}</Text>
                                <Text style={styles.text}>Sexo del denunciante: {alert.sexoDenunciante}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            )
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
    },
    title1: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    title2: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
})
