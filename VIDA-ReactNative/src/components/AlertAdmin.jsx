import { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
    Modal,
    Button,
    Linking
} from 'react-native';
import { useGetAlertas } from '../../hooks/useGetAlertas.jsx';
import { useAlertaClient } from '../../hooks/useAlertaClient.jsx';

const AlertAdmin = () => {
    const { alerts, isFetching, getAlerts } = useGetAlertas();
    const [selectedAlert, setSelectedAlert] = useState(null);
    const [alertList, setAlertList] = useState([]);
    const { isLoading, addAlertaClient } = useAlertaClient();

    useEffect(() => {
        getAlerts();
    }, []);

    useEffect(() => {
        if (alerts && Array.isArray(alerts.alertas)) {
            setAlertList(alerts.alertas);
        }
    }, [alerts]);

    const handleCardPress = (alert) => {
        setSelectedAlert(alert._id === selectedAlert ? null : alert);
    };

    /* const handleWhatsAppPress = async () => {
        await 
      } */

    const handleAccept = (alert) => {
        addAlertaClient(alert);
        setAlertList(alertList.filter((item) => item._id !== alert._id));
        setSelectedAlert(null);

        Linking.openURL(`https://wa.me/+502${alert.telefonoDenunciante}?text=
            Buen día ${alert.nombresDenunciante} ${alert.apellidosDenunciante},

Le informamos que su alerta de búsqueda para ${alert.nombresDesaparecido} ${alert.apellidosDesaparecido} ha sido publicada en nuestra plataforma. Agradecemos su paciencia y esperamos que la persona desaparecida pueda ser encontrada lo más pronto posible.

Atentamente,
Equipo VIDA`)
    };

    const handleReject = (alertId) => {
        setAlertList(alertList.filter((item) => item._id !== alertId));
        setSelectedAlert(null);
    };

    const renderAlerts = () => {
        if (isFetching) {
            return <ActivityIndicator size="large" color="#814EDA" />;
        } else if (alertList.length > 0) {
            return (
                <ScrollView style={styles.container}>
                    <Image
                        source={require('../../assets/img/Alerts.png')}
                        style={styles.imageTop}
                    />
                    {alertList.map((alert) => (
                        <TouchableOpacity
                            key={alert._id}
                            onPress={() => handleCardPress(alert)}
                            style={styles.card}
                        >
                            <View style={styles.headerContainer}>
                                <Text style={styles.urgentText}>URGENTE</Text>
                            </View>
                            <View style={styles.imageAndDetailsContainer}>
                                <View style={styles.imageContainer}>
                                    {alert.fotoDesaparecido && (
                                        <Image
                                            source={{ uri: alert.fotoDesaparecido }}
                                            style={styles.image}
                                        />
                                    )}
                                </View>
                                <View style={styles.detailsContainer}>
                                    <Text style={styles.name}>
                                        {alert.nombresDesaparecido} {alert.apellidosDesaparecido}
                                    </Text>
                                    <Text style={styles.infoText}>
                                        <Text style={styles.infoTitle}>LUGAR DE DESAPARICIÓN: </Text>
                                        {alert.direccionDesaparicion}
                                    </Text>
                                    <Text style={styles.infoText}>
                                        <Text style={styles.infoTitle}>FECHA DE DESAPARICIÓN: </Text>
                                        {new Date(alert.fechaDesaparicion).toLocaleDateString()}
                                    </Text>
                                    <Text style={styles.infoText}>
                                        <Text style={styles.infoTitle}>EDAD: </Text>
                                        {alert.edadDesaparecido} años
                                    </Text>
                                    <Text style={styles.infoText}>
                                        <Text style={styles.infoTitle}>GÉNERO: </Text>
                                        {alert.sexoDesaparecido}
                                    </Text>
                                    <Text style={styles.infoText}>
                                        <Text style={styles.infoTitle}>ESTATURA: </Text>
                                        {alert.estaturaDesaparecido} m
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.infoSection}>
                                <Text style={styles.infoTitle}>CARACTERÍSTICAS FÍSICAS Y VESTIMENTA</Text>
                                <View style={styles.infoTable}>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableHeader}>TEZ</Text>
                                        <Text style={styles.tableHeader}>CABELLO</Text>
                                        <Text style={styles.tableHeader}>COMPLEXIÓN</Text>
                                        <Text style={styles.tableHeader}>COLOR DE OJOS</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableCell}>
                                            {alert.tezDesaparecido || 'No indica'}
                                        </Text>
                                        <Text style={styles.tableCell}>
                                            {alert.cabelloDesaparecido || 'Lacio, negro'}
                                        </Text>
                                        <Text style={styles.tableCell}>
                                            {alert.complexionDesaparecido || 'No indica'}
                                        </Text>
                                        <Text style={styles.tableCell}>
                                            {alert.colorOjosDesaparecido || 'No indica'}
                                        </Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableHeader}>VESTIMENTA</Text>
                                        <Text style={styles.tableHeader}>SEÑAS PARTICULARES</Text>
                                    </View>
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableCell}>
                                            {alert.vestimentaDesaparecido || 'Sudadero corinto, pants azul, zapatos negros'}
                                        </Text>
                                        <Text style={styles.tableCell}>
                                            {alert.senasParticularesDesaparecido || 'No indica'}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.actionButtons}>
                                <Button title="Aceptar" onPress={() => handleAccept(alert)} />
                                <Button title="Rechazar" onPress={() => handleReject(alert._id)} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            );
        } else {
            return <Text>No se encontraron alertas.</Text>;
        }
    };

    return (
        <View style={styles.container}>
            {renderAlerts()}
            <Modal
                visible={selectedAlert !== null}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setSelectedAlert(null)}
            >
                <View style={styles.modalBackground}>
                    <TouchableOpacity
                        style={styles.modalContainer}
                        onPress={() => setSelectedAlert(null)}
                    >
                        {selectedAlert && (
                            <View style={styles.cardSelected}>
                                <View style={styles.headerContainer}>
                                    <Text style={styles.urgentText}>URGENTE</Text>
                                </View>
                                <View style={styles.imageAndDetailsContainer}>
                                    <View style={styles.imageContainer}>
                                        {selectedAlert.fotoDesaparecido && (
                                            <Image
                                                source={{ uri: selectedAlert.fotoDesaparecido }}
                                                style={styles.image}
                                            />
                                        )}
                                    </View>
                                    <View style={styles.detailsContainer}>
                                        <Text style={styles.name}>
                                            {selectedAlert.nombresDesaparecido} {selectedAlert.apellidosDesaparecido}
                                        </Text>
                                        <Text style={styles.infoText}>
                                            <Text style={styles.infoTitle}>LUGAR DE DESAPARICIÓN: </Text>
                                            {selectedAlert.direccionDesaparicion}
                                        </Text>
                                        <Text style={styles.infoText}>
                                            <Text style={styles.infoTitle}>FECHA DE DESAPARICIÓN: </Text>
                                            {new Date(selectedAlert.fechaDesaparicion).toLocaleDateString()}
                                        </Text>
                                        <Text style={styles.infoText}>
                                            <Text style={styles.infoTitle}>EDAD: </Text>
                                            {selectedAlert.edadDesaparecido} años
                                        </Text>
                                        <Text style={styles.infoText}>
                                            <Text style={styles.infoTitle}>GÉNERO: </Text>
                                            {selectedAlert.sexoDesaparecido}
                                        </Text>
                                        <Text style={styles.infoText}>
                                            <Text style={styles.infoTitle}>ESTATURA: </Text>
                                            {selectedAlert.estaturaDesaparecido} m
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.infoSection}>
                                    <Text style={styles.infoTitle}>CARACTERÍSTICAS FÍSICAS Y VESTIMENTA</Text>
                                    <View style={styles.infoTable}>
                                        <View style={styles.tableRow}>
                                            <Text style={styles.tableHeader}>TEZ</Text>
                                            <Text style={styles.tableHeader}>CABELLO</Text>
                                            <Text style={styles.tableHeader}>COMPLEXIÓN</Text>
                                            <Text style={styles.tableHeader}>COLOR DE OJOS</Text>
                                        </View>
                                        <View style={styles.tableRow}>
                                            <Text style={styles.tableCell}>
                                                {selectedAlert.tezDesaparecido || 'No indica'}
                                            </Text>
                                            <Text style={styles.tableCell}>
                                                {selectedAlert.cabelloDesaparecido || 'Lacio, negro'}
                                            </Text>
                                            <Text style={styles.tableCell}>
                                                {selectedAlert.complexionDesaparecido || 'No indica'}
                                            </Text>
                                            <Text style={styles.tableCell}>
                                                {selectedAlert.colorOjosDesaparecido || 'No indica'}
                                            </Text>
                                        </View>
                                        <View style={styles.tableRow}>
                                            <Text style={styles.tableHeader}>VESTIMENTA</Text>
                                            <Text style={styles.tableHeader}>SEÑAS PARTICULARES</Text>
                                        </View>
                                        <View style={styles.tableRow}>
                                            <Text style={styles.tableCell}>
                                                {selectedAlert.vestimentaDesaparecido || 'Sudadero corinto, pants azul, zapatos negros'}
                                            </Text>
                                            <Text style={styles.tableCell}>
                                                {selectedAlert.senasParticularesDesaparecido || 'No indica'}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.actionButtons}>
                                    <Button title="Aceptar" onPress={() => handleAccept(selectedAlert)} />
                                    <Button title="Rechazar" onPress={() => handleReject(selectedAlert._id)} />
                                </View>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </Modal>
            <View style={styles.footer}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F2E52',
    },
    imageTop: {
        width: '100%',
        height: undefined,
        aspectRatio: 17 / 12,
        resizeMode: 'contain',
        marginBottom: 35,
    },
    headerContainer: {
        backgroundColor: '#814EDA',
        padding: 10,
        marginBottom: 10,
    },
    urgentText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    imageAndDetailsContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    imageContainer: {
        marginHorizontal: 15,
        marginTop: 35,
    },
    image: {
        width: 98,
        height: 100,
        borderRadius: 10,
    },
    detailsContainer: {
        flex: 1,
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 10,
        marginBottom: 5,
    },
    infoTitle: {
        fontWeight: 'bold',
        fontSize: 10,
        marginHorizontal: 25,
    },
    infoSection: {
        marginBottom: 10,
    },
    infoTable: {
        marginBottom: 10,
        padding: 10,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableHeader: {
        flex: 1,
        fontSize: 9,
        fontWeight: 'bold',
        backgroundColor: '#814EDA',
        borderWidth: 2,
        borderColor: '#814EDA',
        textAlign: 'center',
        color: '#fff',
    },
    tableCell: {
        flex: 1,
        fontSize: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: '#814EDA',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 10,
        borderWidth: 6,
        borderColor: '#814EDA',
        marginHorizontal: 55,
        marginBottom: 20,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        padding: 20,
        borderRadius: 10,
    },
    cardSelected: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 6,
        borderColor: '#814EDA',
        padding: 10,
        marginBottom: 150,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    footer: {
        marginBottom: 90,
    }
});

export default AlertAdmin;
