import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useAlert } from '../shared/hooks/alerta/useAlert.jsx'
import * as ImagePicker from 'expo-image-picker'
import { saveAlertaRequest } from '../services/api.js'

const CreateAlert = () => {
    const { addAlerta, isLoading } = useAlert()
    const [alerta, setAlerta] = useState({
        nombresDesaparecido: '',
        apellidosDesaparecido: '',
        edadDesaparecido: '',
        estaturaDesaparecido: '',
        descripcionDesaparecido: '',
        direccionVivienda: '',
        direccionDesaparicion: '',
        fechaDesaparicion: '',
        sexoDesaparecido: '',
        fotoDesaparecido: '',
        nombresDenunciante: '',
        apellidosDenunciante: '',
        DPIDenunciente: '',
        telefonoDenunciante: '',
        emailDenunciante: '',
        parentescoDenunciante: '',
        edadDenunciante: '',
        direccionViviendaDenunciante: '',
        sexoDenunciante: '',
        estadoAlerta: '',
    })

    const [previewUri, setPreviewUri] = useState('')
    const [fileName, setFileName] = useState('')
    const [image, setImage] = useState(null)

    const pickImage = async () => {
        console.log('llego')
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        console.log(result)
        if (!result.canceled) {
            setAlerta({ ...alerta, fotoDesaparecido: result.assets[0] })
        }
    }

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    const pickImage6 = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.canceled) {
            console.log(result.assets[0])
        } else {
            alert('You did not select any image.')
        }
    }

    const handleSubmit = async () => {
        const response = await saveAlertaRequest(alerta)
        setAlerta({
            nombresDesaparecido: '',
            apellidosDesaparecido: '',
            edadDesaparecido: '',
            estaturaDesaparecido: '',
            descripcionDesaparecido: '',
            direccionVivienda: '',
            direccionDesaparicion: '',
            fechaDesaparicion: '',
            sexoDesaparecido: '',
            fotoDesaparecido: '',
            nombresDenunciante: '',
            apellidosDenunciante: '',
            DPIDenunciente: '',
            telefonoDenunciante: '',
            emailDenunciante: '',
            parentescoDenunciante: '',
            edadDenunciante: '',
            direccionViviendaDenunciante: '',
            sexoDenunciante: '',
            estadoAlerta: '',
        })
        setPreviewUri('')
        setFileName('')
    }

    return (
        <ScrollView style={styles.container}>
            <Image
                source={require('../../assets/img/CreateAlert.png')}
                style={styles.imageTop}
            />

            <View style={styles.inputWrapper}>
                <Text style={styles.title1}>Datos del Desaparecido</Text>
                <Text style={styles.label}>Nombres Desaparecido</Text>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.textInput}
                        value={alerta.nombresDesaparecido}
                        onChangeText={(text) =>
                            setAlerta({ ...alerta, nombresDesaparecido: text })
                        }
                        selectionColor="#814EDA"
                    />
                </View>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Apellidos Desaparecido</Text>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.textInput}
                        value={alerta.apellidosDesaparecido}
                        onChangeText={(text) =>
                            setAlerta({
                                ...alerta,
                                apellidosDesaparecido: text,
                            })
                        }
                        selectionColor="#814EDA"
                    />
                </View>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Edad Desaparecido</Text>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.textInput}
                        value={alerta.edadDesaparecido}
                        onChangeText={(text) =>
                            setAlerta({ ...alerta, edadDesaparecido: text })
                        }
                        selectionColor="#814EDA"
                    />
                </View>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Estatura Desaparecido</Text>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.textInput}
                        value={alerta.estaturaDesaparecido}
                        onChangeText={(text) =>
                            setAlerta({ ...alerta, estaturaDesaparecido: text })
                        }
                        selectionColor="#814EDA"
                    />
                </View>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Descripción Desaparecido</Text>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.textInput}
                        value={alerta.descripcionDesaparecido}
                        onChangeText={(text) =>
                            setAlerta({
                                ...alerta,
                                descripcionDesaparecido: text,
                            })
                        }
                        selectionColor="#814EDA"
                    />
                </View>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Dirección Vivienda</Text>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.textInput}
                        value={alerta.direccionVivienda}
                        onChangeText={(text) =>
                            setAlerta({ ...alerta, direccionVivienda: text })
                        }
                        selectionColor="#814EDA"
                    />
                </View>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Dirección Desaparición</Text>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.textInput}
                        value={alerta.direccionDesaparicion}
                        onChangeText={(text) =>
                            setAlerta({
                                ...alerta,
                                direccionDesaparicion: text,
                            })
                        }
                        selectionColor="#814EDA"
                    />
                </View>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Fecha Desaparición</Text>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.textInput}
                        value={alerta.fechaDesaparicion}
                        onChangeText={(text) =>
                            setAlerta({ ...alerta, fechaDesaparicion: text })
                        }
                        selectionColor="#814EDA"
                    />
                </View>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Sexo Desaparecido</Text>
                <View style={styles.inputGroup}>
                    <Picker
                        selectedValue={alerta.sexoDesaparecido}
                        style={styles.picker}
                        onValueChange={(itemValue) =>
                            setAlerta({
                                ...alerta,
                                sexoDesaparecido: itemValue,
                            })
                        }
                    >
                        <Picker.Item label="Seleccione..." value="" />
                        <Picker.Item label="Masculino" value="Masculino" />
                        <Picker.Item label="Femenino" value="Femenino" />
                        <Picker.Item label="Machete" value="Machete" />
                        <Picker.Item label="Alejandro" value="Alejandro" />
                        <Picker.Item label="No binario" value="No binario" />
                        <Picker.Item
                            label="Prefiero no decirlo"
                            value="Prefiero no decirlo"
                        />
                    </Picker>
                </View>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Foto Desaparecido</Text>
                <View style={styles.inputViewImg}>
                    <TouchableOpacity
                        onPress={pickImage}
                        style={styles.imagePicker}
                    >
                        <Text style={styles.imagePickerText}>
                            Seleccionar Imagen
                        </Text>
                    </TouchableOpacity>
                    {fileName ? (
                        <Text style={styles.fileName}>{fileName}</Text>
                    ) : null}
                    {previewUri ? (
                        <Image
                            source={{ uri: previewUri }}
                            style={styles.image}
                        />
                    ) : null}
                </View>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.title2}>Datos del Denunciante</Text>
                <Text style={styles.label}>Nombres Denunciante</Text>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.textInput}
                        value={alerta.nombresDenunciante}
                        onChangeText={(text) =>
                            setAlerta({ ...alerta, nombresDenunciante: text })
                        }
                        selectionColor="#814EDA"
                    />
                </View>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Apellidos Denunciante</Text>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.textInput}
                        value={alerta.apellidosDenunciante}
                        onChangeText={(text) =>
                            setAlerta({ ...alerta, apellidosDenunciante: text })
                        }
                        selectionColor="#814EDA"
                    />
                </View>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>DPI Denunciante</Text>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.textInput}
                        value={alerta.DPIDenunciente}
                        onChangeText={(text) =>
                            setAlerta({ ...alerta, DPIDenunciente: text })
                        }
                        selectionColor="#814EDA"
                    />
                </View>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Teléfono Denunciante</Text>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.textInput}
                        value={alerta.telefonoDenunciante}
                        onChangeText={(text) =>
                            setAlerta({ ...alerta, telefonoDenunciante: text })
                        }
                        selectionColor="#814EDA"
                    />
                </View>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Email Denunciante</Text>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.textInput}
                        value={alerta.emailDenunciante}
                        onChangeText={(text) =>
                            setAlerta({ ...alerta, emailDenunciante: text })
                        }
                        selectionColor="#814EDA"
                    />
                </View>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Parentesco Denunciante</Text>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.textInput}
                        value={alerta.parentescoDenunciante}
                        onChangeText={(text) =>
                            setAlerta({
                                ...alerta,
                                parentescoDenunciante: text,
                            })
                        }
                        selectionColor="#814EDA"
                    />
                </View>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Edad Denunciante</Text>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.textInput}
                        value={alerta.edadDenunciante}
                        onChangeText={(text) =>
                            setAlerta({ ...alerta, edadDenunciante: text })
                        }
                        selectionColor="#814EDA"
                    />
                </View>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Dirección Vivienda Denunciante</Text>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.textInput}
                        value={alerta.direccionViviendaDenunciante}
                        onChangeText={(text) =>
                            setAlerta({
                                ...alerta,
                                direccionViviendaDenunciante: text,
                            })
                        }
                        selectionColor="#814EDA"
                    />
                </View>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Sexo Denunciante</Text>
                <View style={styles.inputGroup}>
                    <Picker
                        selectedValue={alerta.sexoDenunciante}
                        style={styles.picker}
                        onValueChange={(itemValue) =>
                            setAlerta({ ...alerta, sexoDenunciante: itemValue })
                        }
                    >
                        <Picker.Item label="Seleccione..." value="" />
                        <Picker.Item label="Masculino" value="Masculino" />
                        <Picker.Item label="Femenino" value="Femenino" />
                        <Picker.Item label="Machete" value="Machete" />
                        <Picker.Item label="Alejandro" value="Alejandro" />
                        <Picker.Item label="No binario" value="No binario" />
                        <Picker.Item
                            label="Prefiero no decirlo"
                            value="Prefiero no decirlo"
                        />
                    </Picker>
                </View>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Estado Alerta</Text>
                <View style={styles.inputGroup}>
                    <Picker
                        selectedValue={alerta.estadoAlerta}
                        style={styles.picker}
                        onValueChange={(itemValue) =>
                            setAlerta({ ...alerta, estadoAlerta: itemValue })
                        }
                    >
                        <Picker.Item label="Seleccione..." value="" />
                        <Picker.Item label="Encontrado" value="Encontrado" />
                        <Picker.Item
                            label="Desaparecido"
                            value="Desaparecido"
                        />
                    </Picker>
                </View>
            </View>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

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
    },
    inputWrapper: {
        marginHorizontal: 30,
        marginBottom: 10,
        fontFamily: 'Outfit',
    },
    inputGroup: {
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
        fontFamily: 'Outfit',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#999',
        fontFamily: 'Outfit',
    },
    title1: {
        fontSize: 28,
        textAlign: 'Center',
        marginBottom: 10,
        marginTop: 30,
        color: '#814EDA',
        fontFamily: 'Outfit',
    },
    title2: {
        fontSize: 28,
        textAlign: 'Center',
        marginBottom: 10,
        marginTop: 40,
        color: '#814EDA',
        fontFamily: 'Outfit',
    },
    picker: {
        marginTop: -15,
        marginHorizontal: -15,
        fontFamily: 'Outfit',
    },
    button: {
        marginTop: 25,
        marginHorizontal: 25,
        padding: 20,
        backgroundColor: '#814EDA',
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 120,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Outfit',
    },
    inputViewImg: {
        alignItems: 'center',
    },
    imagePicker: {
        backgroundColor: '#814EDA',
        width: '100%',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        paddingHorizontal: 20,
    },
    imagePickerText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Outfit',
    },
    fileName: {
        marginTop: 10,
        fontFamily: 'Outfit',
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 10,
    },
})

export default CreateAlert
