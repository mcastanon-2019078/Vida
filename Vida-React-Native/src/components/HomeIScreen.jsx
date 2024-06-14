import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Modal,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const HomeIScreen = () => {
    const [selectedImage, setSelectedImage] = useState(null)

    const images = [
        require('../../assets/img/hola.jpg'),
        require('../../assets/img/hola.jpg'),
        require('../../assets/img/hola.jpg'),
        require('../../assets/img/hola.jpg'),
        require('../../assets/img/hola.jpg'),
    ]

    const additionalImages = [
        require('../../assets/img/logos/logo-gob.png'),
        require('../../assets/img/logos/logo-pgn.png'),
        require('../../assets/img/logos/logo-mp.png'),
        require('../../assets/img/logos/footer-pnc.png'),
        require('../../assets/img/logos/logo-migracion.png'),
        require('../../assets/img/logos/icmec.png'),
        require('../../assets/img/logos/guatemalaestaunida.png'),
    ]
    const navigation = useNavigation()

    const handleHistory = () => {
        navigation.navigate('History')
    }
    const handleOurWork = () => {
        navigation.navigate('OurWork')
    }
    const handleActiveAlert = () => {
        navigation.navigate('ActiveAlert')
    }
    const handleDisableAlert = () => {
        navigation.navigate('DisableAlert')
    }
    const handleSearchAlert = () => {
        navigation.navigate('SearchAlert')
    }

    return (
        <ScrollView style={styles.container}>
            <Image
                source={require('../../assets/img/Welcome.png')}
                style={styles.image}
            />
            <View style={styles.dContainer}>
                <Text style={styles.title}>
                    Para colocar una denuncia puede llamar al
                </Text>
                <Text style={styles.number}>110 o al 1010</Text>
                <Text style={styles.titleI}>O puede presentarse a:</Text>
                <View style={styles.centeredImagesContainer}>
                    <Image
                        source={require('../../assets/img/buildings/edif-pgn.png')}
                        style={styles.centeredImage}
                    />
                    <Text style={styles.titleIm}>
                        Delegaciones Regionales PGN
                    </Text>
                    <Image
                        source={require('../../assets/img/buildings/edif-pnc.png')}
                        style={styles.centeredImage}
                    />
                    <Text style={styles.titleIm}>Policia Nacional Civil</Text>
                    <Image
                        source={require('../../assets/img/buildings/edif-mp.png')}
                        style={styles.centeredImage}
                    />
                    <Text style={styles.titleIm}>Ministerio Público</Text>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.homeText}>Boletines Recientes</Text>
                <ScrollView
                    horizontal
                    style={styles.sliderContainer}
                    showsHorizontalScrollIndicator={false}
                >
                    {images.map((image, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setSelectedImage(image)}
                        >
                            <View style={styles.imageContainer}>
                                <Image
                                    source={image}
                                    style={styles.sliderImage}
                                />
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.aboutUsContainer}>
                <Text style={styles.aboutUsText}>Sobre Nosotros</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleHistory} style={styles.button}>
                    <View style={styles.buttonTextContainer}>
                        <Ionicons
                            name="search-outline"
                            size={35}
                            color="white"
                        />
                        <Text style={styles.buttonText}> Nuestra Historia</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleOurWork} style={styles.button}>
                    <View style={styles.buttonTextContainer}>
                        <Ionicons
                            name="alert-circle-outline"
                            size={35}
                            color="white"
                        />
                        <Text style={styles.buttonText}> Nuestro Trabajo</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.aboutUsContainer}>
                <Text style={styles.questionsText}>Preguntas</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleActiveAlert}
                    style={styles.button}
                >
                    <View style={styles.buttonTextContainer}>
                        <Text style={styles.buttonText}>
                            ¿Cómo ACTIVAR una alerta?
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleDisableAlert}
                    style={styles.button}
                >
                    <View style={styles.buttonTextContainerL}>
                        <Text style={styles.buttonText}>
                            ¿Cómo DESACTIVAR una alerta?
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleSearchAlert}
                    style={styles.button}
                >
                    <View style={styles.buttonTextContainer}>
                        <Ionicons
                            name="search-outline"
                            size={35}
                            color="white"
                        />
                        <Text style={styles.buttonText}>Buscar una alerta</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.imagesContainer}>
                {additionalImages.map((image, index) => (
                    <View key={index} style={styles.additionalImageContainer}>
                        <Image source={image} style={styles.additionalImage} />
                    </View>
                ))}
            </View>
            <View style={styles.footerContainer}></View>
            <Modal
                visible={selectedImage !== null}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setSelectedImage(null)}
            >
                <View style={styles.modalBackground}>
                    <TouchableOpacity
                        style={styles.modalContainer}
                        onPress={() => setSelectedImage(null)}
                    >
                        <Image
                            source={selectedImage}
                            style={styles.fullScreenImage}
                        />
                    </TouchableOpacity>
                </View>
            </Modal>
        </ScrollView>
    )
}

export default HomeIScreen

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
        padding: 20,
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 10,
        color: '#FFF',
        fontFamily: 'Outfit',
    },
    number: {
        fontSize: 30,
        textAlign: 'center',
        color: '#814EDA',
        fontFamily: 'Outfit',
    },
    titleI: {
        fontSize: 25,
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 50,
        color: '#FFF',
        fontFamily: 'Outfit',
    },
    titleIm: {
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 30,
        color: '#FFF',
        fontFamily: 'Outfit',
    },
    centeredImagesContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredImage: {
        width: 200,
        height: 100,
        resizeMode: 'contain',
    },
    contentContainer: {
        paddingTop: 0,
        padding: 20,
    },
    homeText: {
        textAlign: 'left',
        fontSize: 20,
        color: '#FFF',
        fontFamily: 'Outfit',
    },
    sliderContainer: {
        marginTop: 20,
    },
    imageContainer: {
        paddingHorizontal: 5,
    },
    sliderImage: {
        width: 150,
        height: 200,
        resizeMode: 'cover',
        marginRight: 10,
    },
    aboutUsText: {
        fontSize: 30,
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'Outfit',
        marginTop: 40,
    },
    questionsText: {
        fontSize: 30,
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'Outfit',
    },
    buttonContainer: {
        padding: 25,
        marginTop: -30,
        marginBottom: 40,
    },
    button: {
        padding: 20,
        backgroundColor: '#814EDA',
        borderRadius: 15,
        marginTop: 30,
    },
    buttonTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Outfit',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 20,
        marginLeft: 0,
        fontFamily: 'Outfit',
        textAlign: 'center',
    },
    imagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 0,
    },
    additionalImageContainer: {
        width: '40%',
        margin: 10,
    },
    additionalImage: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    footerContainer: {
        marginBottom: 100,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        height: '80%',
    },
    fullScreenImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
})
