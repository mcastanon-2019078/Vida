import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import axios from 'axios'
import { getAlertRequest } from '../../services/api.js'

export const Maps = () => {
    const [alerts, setAlerts] = useState([])
    const [markers, setMarkers] = useState([])

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                console.log('Haciendo solicitud para obtener alertas...')
                const response = await getAlertRequest()
                console.log('Respuesta recibida:', response)
                if (
                    response &&
                    response.data &&
                    Array.isArray(response.data.alertas)
                ) {
                    console.log(
                        'Datos de alerta recibidos:',
                        response.data.alertas
                    )
                    setAlerts(response.data.alertas)
                } else {
                    console.log('La respuesta no contiene datos de alerta.')
                }
            } catch (error) {
                console.error('Error fetching alerts:', error)
            }
        }

        fetchAlerts()
    }, [])

    useEffect(() => {
        const fetchCoordinates = async () => {
            const newMarkers = await Promise.all(
                alerts.map(async (alerta) => {
                    try {
                        const response = await axios.get(
                            'https://maps.googleapis.com/maps/api/geocode/json',
                            {
                                params: {
                                    address: alerta.direccionDesaparicion,
                                    key: 'AIzaSyBs2lOkc7xTfnd5Yf7c5UNm3i4ztaQgSPo',
                                },
                            }
                        )

                        if (response.data.status === 'OK') {
                            const { lat, lng } =
                                response.data.results[0].geometry.location
                            return {
                                latitude: lat,
                                longitude: lng,
                                text: alerta.nombresDesaparecido,
                            }
                        } else {
                            console.error(
                                `Geocoding error for address ${alerta.direccionDesaparicion}: ${response.data.status}`
                            )
                            return null
                        }
                    } catch (error) {
                        console.error(
                            `Error fetching coordinates for address ${alerta.direccionDesaparicion}:`,
                            error
                        )
                        return null
                    }
                })
            )

            setMarkers(newMarkers.filter((marker) => marker !== null))
        }

        if (alerts.length > 0) {
            fetchCoordinates()
        }
    }, [alerts])

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 14.625836,
                    longitude: -90.535862,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.04,
                }}
            >
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                        }}
                    >
                        <Callout>
                            <View>
                                <Text>{marker.text}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
})

/* export default Maps; */
