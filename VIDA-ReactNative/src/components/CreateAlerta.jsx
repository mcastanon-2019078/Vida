import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Picker, StyleSheet, ScrollView, Image } from 'react-native';
import { useAlerta } from '../../hooks/useAlerta';
import * as ImagePicker from 'expo-image-picker';

const CreateAlerta = () => {
    const { addAlerta, isLoading } = useAlerta();
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
        fotoDesaparecido: null,
        nombresDenunciante: '',
        apellidosDenunciante: '',
        DPIDenunciente: '',
        telefonoDenunciante: '',
        emailDenunciante: '',
        parentescoDenunciante: '',
        edadDenunciante: '',
        direccionViviendaDenunciante: '',
        sexoDenunciante: '',
        estadoAlerta: ''
    });

    const [previewUri, setPreviewUri] = useState('');
    const [fileName, setFileName] = useState('');

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        })

        if (!result.cancelled && result.uri) {
            setAlerta({ ...alerta, fotoDesaparecido: result.base64 })
            setPreviewUri(result.uri)
            console.log(result)
            const fileName = result.uri.split('/').pop()
            setFileName(fileName)
        }
    };

    const handleSubmit = async () => {
        await addAlerta(alerta);
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
            fotoDesaparecido: null,
            nombresDenunciante: '',
            apellidosDenunciante: '',
            DPIDenunciente: '',
            telefonoDenunciante: '',
            emailDenunciante: '',
            parentescoDenunciante: '',
            edadDenunciante: '',
            direccionViviendaDenunciante: '',
            sexoDenunciante: '',
            estadoAlerta: ''
        });
        setPreviewUri('')
        setFileName('')
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Nombres Desaparecido</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombres Desaparecido"
                    value={alerta.nombresDesaparecido}
                    onChangeText={(text) => setAlerta({ ...alerta, nombresDesaparecido: text })}
                />
            </View>
            {/* Resto de campos del formulario */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Foto Desaparecido</Text>
                <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                    <Text style={styles.imagePickerText}>Seleccionar Imagen</Text>
                </TouchableOpacity>
                {fileName ? (
                    <Text style={styles.fileName}>{fileName}</Text>
                ) : null}
                {previewUri ? (
                    <Image source={{ uri: previewUri }} style={styles.image} />
                ) : null}
            </View>
            {/* Resto de campos del formulario */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isLoading}>
                <Text style={styles.buttonText}>{isLoading ? 'Agregando...' : 'Agregar Alerta'}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    picker: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    imagePicker: {
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    imagePickerText: {
        color: '#fff',
        textAlign: 'center',
    },
    fileName: {
        marginTop: 10,
        fontStyle: 'italic',
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 10,
    }
});

export default CreateAlerta; 

