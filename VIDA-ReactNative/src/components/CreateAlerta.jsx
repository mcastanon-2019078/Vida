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
import { useAlerta } from '../../hooks/useAlerta.jsx'
import DateTimePicker from '@react-native-community/datetimepicker'
import * as ImagePicker from 'expo-image-picker'
import { saveAlertaRequest } from '../../services/api.js'

const CreateAlerta = () => {
    const { addAlerta, isLoading } = useAlerta()
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
        DPIDenunciante: '',
        telefonoDenunciante: '',
        emailDenunciante: '',
        parentescoDenunciante: '',
        edadDenunciante: '',
        direccionViviendaDenunciante: '',
        sexoDenunciante: '',
        estadoAlerta: '',
    })

    const [error, setError] = useState({})
    const [previewUri, setPreviewUri] = useState('')
    const [fileName, setFileName] = useState('')
    const [image, setImage] = useState(null)

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        if (!result.canceled) {
            setAlerta({ ...alerta, fotoDesaparecido: result.assets[0] })
        }
    }

    const handleTextEdadDesaparecido = (text) => {
        const numericText = text.replace(/[^0-9]/g, '')
        setAlerta({ ...alerta, edadDesaparecido: numericText })
    }

    const handleTextEdadDenunciante = (text) => {
        const numericText = text.replace(/[^0-9]/g, '')
        setAlerta({ ...alerta, edadDenunciante: numericText })
    }

    const handleTextEstaturaDesaparecido = (text) => {
        const numericText = text.replace(/[^0-9.]/g, '')
        setAlerta({ ...alerta, estaturaDesaparecido: numericText })
    }

    const handleTextChangeDpi = (text) => {
        const numericText = text.replace(/[^0-9]/g, '')
        setAlerta({ ...alerta, DPIDenunciante: numericText })
    }

    const handleTextChangeTelefono = (text) => {
        const numericText = text.replace(/[^0-9]/g, '')
        setAlerta({ ...alerta, telefonoDenunciante: numericText })
    }

    const handleBlur = (field) => {
        if (!alerta[field]) {
            setError((prevError) => ({
                ...prevError,
                [field]: `Este es un campo requerido`,
            }))
        } else {
            setError((prevError) => ({
                ...prevError,
                [field]: '',
            }))
        }

        if (field === 'DPIDenunciante' && alerta.DPIDenunciante.length !== 13) {
            setError((prevError) => ({
                ...prevError,
                DPIDenunciante: 'El DPI debe contener exactamente 13 números.',
            }))
        } else if (
            field === 'telefonoDenunciante' &&
            alerta.telefonoDenunciante.length !== 8
        ) {
            setError((prevError) => ({
                ...prevError,
                telefonoDenunciante:
                    'El teléfono debe contener exactamente 8 números.',
            }))
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
            DPIDenunciante: '',
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
                        onBlur={() => handleBlur('nombresDesaparecido')}
                    />
                    {error.nombresDesaparecido ? (
                        <Text style={styles.error}>
                            {error.nombresDesaparecido}
                        </Text>
                    ) : null}
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
                        onBlur={() => handleBlur('apellidosDesaparecido')}
                    />
                    {error.apellidosDesaparecido ? (
                        <Text style={styles.error}>
                            {error.apellidosDesaparecido}
                        </Text>
                    ) : null}
                </View>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Edad Desaparecido</Text>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.textInput}
                        value={alerta.edadDesaparecido}
                        keyboardType="numeric"
                        onChangeText={handleTextEdadDesaparecido}
                        onBlur={() => handleBlur('edadDesaparecido')}
                        selectionColor="#814EDA"
                    />
                    {error.edadDesaparecido ? (
                        <Text style={styles.error}>
                            {error.edadDesaparecido}
                        </Text>
                    ) : null}
                </View>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Estatura Desaparecido</Text>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.textInput}
                        value={alerta.estaturaDesaparecido}
                        keyboardType="numeric"
                        onChangeText={handleTextEstaturaDesaparecido}
                        onBlur={() => handleBlur('estaturaDesaparecido')}
                        selectionColor="#814EDA"
                    />
                    {error.estaturaDesaparecido ? (
                        <Text style={styles.error}>
                            {error.estaturaDesaparecido}
                        </Text>
                    ) : null}
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
                        onBlur={() => handleBlur('descripcionDesaparecido')}
                    />
                    {error.descripcionDesaparecido ? (
                        <Text style={styles.error}>
                            {error.descripcionDesaparecido}
                        </Text>
                    ) : null}
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
                        onBlur={() => handleBlur('direccionVivienda')}
                        selectionColor="#814EDA"
                    />
                    {error.direccionVivienda ? (
                        <Text style={styles.error}>
                            {error.direccionVivienda}
                        </Text>
                    ) : null}
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
                        onBlur={() => handleBlur('direccionDesaparicion')}
                        selectionColor="#814EDA"
                    />
                    {error.direccionDesaparicion ? (
                        <Text style={styles.error}>
                            {error.direccionDesaparicion}
                        </Text>
                    ) : null}
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
                        onBlur={() => handleBlur('fechaDesaparicion')}
                        selectionColor="#814EDA"
                    />
                    {error.fechaDesaparicion ? (
                        <Text style={styles.error}>
                            {error.fechaDesaparicion}
                        </Text>
                    ) : null}
                </View>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Sexo Desaparecido</Text>
                <View style={styles.inputGroup}>
                    <Picker
                        selectedValue={alerta.sexoDesaparecido}
                        onValueChange={(itemValue) =>
                            setAlerta({
                                ...alerta,
                                sexoDesaparecido: itemValue,
                            })
                        }
                        onBlur={() => handleBlur('sexoDesaparecido')}
                        style={styles.picker}
                    >
                        <Picker.Item label="Seleccionar Sexo" value="" />
                        <Picker.Item label="Masculino" value="Masculino" />
                        <Picker.Item label="Femenino" value="Femenino" />
                    </Picker>
                    {error.sexoDesaparecido ? (
                        <Text style={styles.errorP}>
                            {error.sexoDesaparecido}
                        </Text>
                    ) : null}
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

                    {alerta.fotoDesaparecido ? (
                        <Image
                            source={{ uri: alerta.fotoDesaparecido.uri }}
                            style={styles.imagePreview}
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
                        onBlur={() => handleBlur('nombresDenunciante')}
                        selectionColor="#814EDA"
                    />
                    {error.nombresDenunciante ? (
                        <Text style={styles.error}>
                            {error.nombresDenunciante}
                        </Text>
                    ) : null}
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
                        onBlur={() => handleBlur('apellidosDenunciante')}
                        selectionColor="#814EDA"
                    />
                    {error.apellidosDenunciante ? (
                        <Text style={styles.error}>
                            {error.apellidosDenunciante}
                        </Text>
                    ) : null}
                </View>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>DPI Denunciante</Text>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.textInput}
                        value={alerta.DPIDenunciante}
                        keyboardType="numeric"
                        onChangeText={handleTextChangeDpi}
                        onBlur={() => handleBlur('DPIDenunciante')}
                    />
                    {error.DPIDenunciante ? (
                        <Text style={styles.error}>{error.DPIDenunciante}</Text>
                    ) : null}
                </View>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Teléfono Denunciante</Text>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.textInput}
                        value={alerta.telefonoDenunciante}
                        keyboardType="numeric"
                        onChangeText={handleTextChangeTelefono}
                        onBlur={() => handleBlur('telefonoDenunciante')}
                        selectionColor="#814EDA"
                    />
                    {error.telefonoDenunciante ? (
                        <Text style={styles.error}>
                            {error.telefonoDenunciante}
                        </Text>
                    ) : null}
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
                        onBlur={() => handleBlur('emailDenunciante')}
                        selectionColor="#814EDA"
                    />
                    {error.emailDenunciante ? (
                        <Text style={styles.error}>
                            {error.emailDenunciante}
                        </Text>
                    ) : null}
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
                        onBlur={() => handleBlur('parentescoDenunciante')}
                        selectionColor="#814EDA"
                    />
                    {error.parentescoDenunciante ? (
                        <Text style={styles.error}>
                            {error.parentescoDenunciante}
                        </Text>
                    ) : null}
                </View>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Edad Denunciante</Text>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.textInput}
                        value={alerta.edadDenunciante}
                        keyboardType="numeric"
                        onChangeText={handleTextEdadDenunciante}
                        onBlur={() => handleBlur('edadDenunciante')}
                        selectionColor="#814EDA"
                    />
                    {error.edadDenunciante ? (
                        <Text style={styles.error}>
                            {error.edadDenunciante}
                        </Text>
                    ) : null}
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
                        onBlur={() =>
                            handleBlur('direccionViviendaDenunciante')
                        }
                        selectionColor="#814EDA"
                    />
                    {error.direccionViviendaDenunciante ? (
                        <Text style={styles.error}>
                            {error.direccionViviendaDenunciante}
                        </Text>
                    ) : null}
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
                        onBlur={() => handleBlur('sexoDenunciante')}
                    >
                        <Picker.Item label="Seleccionar Sexo" value="" />
                        <Picker.Item label="Masculino" value="Masculino" />
                        <Picker.Item label="Femenino" value="Femenino" />
                    </Picker>
                    {error.sexoDenunciante ? (
                        <Text style={styles.errorP}>
                            {error.sexoDenunciante}
                        </Text>
                    ) : null}
                </View>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Estado Alerta</Text>
                <View style={styles.inputGroup}>
                    <Picker
                        selectedValue={alerta.estadoAlerta}
                        onValueChange={(itemValue) =>
                            setAlerta({ ...alerta, estadoAlerta: itemValue })
                        }
                        onBlur={() => handleBlur('estadoAlerta')}
                        style={styles.picker}
                    >
                        <Picker.Item label="Seleccionar Estado" value="" />
                        <Picker.Item label="Activa" value="Activa" />
                        <Picker.Item label="Inactiva" value="Inactiva" />
                    </Picker>
                    {error.estadoAlerta ? (
                        <Text style={styles.errorP}>{error.estadoAlerta}</Text>
                    ) : null}
                </View>
            </View>

            <TouchableOpacity
                onPress={handleSubmit}
                style={styles.button}
                disabled={isLoading}
            >
                <Text style={styles.buttonText}>
                    {isLoading ? 'Agregando...' : 'Agregar Alerta'}
                </Text>
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
        marginBottom: 10, // Agrega margen inferior para separar los inputs
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
    error: {
        color: 'red',
        marginTop: 15,
        marginBottom: -6,
        fontFamily: 'Outfit',
    },
    errorP: {
        color: 'red',
        marginTop: 1,
        fontFamily: 'Outfit',
    },
})

export default CreateAlerta
