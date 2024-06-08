import React, { useState } from 'react';
import { Alert, View, Text, TextInput, TouchableOpacity, Picker, StyleSheet, ScrollView, Image } from 'react-native';
import { useAlerta } from '../../hooks/useAlerta.jsx';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { saveAlertaRequest } from '../../services/api.js';


//const forData
/*
 const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    descripcion: '',
    imagen: '',
    categoria: '',
    favorito: []
  })

*/
const CreateAlerta = () => {
    const { addAlerta, isLoading } = useAlerta();
    const [previewUri, setPreviewUri] = useState('');
const [fileName, setFileName] = useState('');
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


        
    })


 
   





    

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });



        if (!result.canceled && result.uri) {
            setAlerta({ ...alerta, fotoDesaparecido: result.base64 })
            setPreviewUri(result.uri)
            console.log(result)
            const fileName = result.uri.split('/').pop()
           // uploadImage(result.base64)

           await uploadImage(result.uri);
            
        }
    
       /* if (! result.uri) {
            setPreviewUri(result.uri);
            // Llamar a la función para subir la imagen
            uploadImage(result.base64);
        }*/




        const uploadImage = async (uri) => {
            let filename = uri.split('/').pop();
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
        
            let formData = new FormData();
            formData.append('fotoDesaparecido', { uri, name: filename, type });
        
            try {
                const response = await fetch('http://localhost:2880/save',  {
                    method: 'POST',formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData,
                });
        
                if (!response.ok) {
                    throw new Error('Error en la carga de la imagen');
                }
        
                const data = await response.json();
                console.log('Imagen subida con éxito:', data);
            } catch (error) {
                console.error('Error al subir la imagen:', error);
            }
        };
        
        
    }


    
  
      //
    const handleFileChange = (e)=>{
        setFormData((prevData)=>({
          ...prevData,
          [e.target.name]: e.target.files[0]
        }))
      }

    





    const handleSubmit = async (e) => {
        e.preventDefault()
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
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Apellidos Desaparecido</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Apellidos Desaparecido"
                    value={alerta.apellidosDesaparecido}
                    onChangeText={(text) => setAlerta({ ...alerta, apellidosDesaparecido: text })}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Edad Desaparecido</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Edad Desaparecido"
                    value={alerta.edadDesaparecido}
                    onChangeText={(text) => setAlerta({ ...alerta, edadDesaparecido: text })}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Estatura Desaparecido</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Estatura Desaparecido"
                    value={alerta.estaturaDesaparecido}
                    onChangeText={(text) => setAlerta({ ...alerta, estaturaDesaparecido: text })}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Descripción Desaparecido</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Descripción Desaparecido"
                    value={alerta.descripcionDesaparecido}
                    onChangeText={(text) => setAlerta({ ...alerta, descripcionDesaparecido: text })}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Dirección Vivienda</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Dirección Vivienda"
                    value={alerta.direccionVivienda}
                    onChangeText={(text) => setAlerta({ ...alerta, direccionVivienda: text })}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Dirección Desaparición</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Dirección Desaparición"
                    value={alerta.direccionDesaparicion}
                    onChangeText={(text) => setAlerta({ ...alerta, direccionDesaparicion: text })}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Fecha Desaparición</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Fecha Desaparición"
                    value={alerta.fechaDesaparicion}
                    onChangeText={(text) => setAlerta({ ...alerta, fechaDesaparicion: text })}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Sexo Desaparecido</Text>
                <Picker
                    selectedValue={alerta.sexoDesaparecido}
                    style={styles.picker}
                    onValueChange={(itemValue) => setAlerta({ ...alerta, sexoDesaparecido: itemValue })}
                >
                    <Picker.Item label="Seleccione..." value="" />
                    <Picker.Item label="Masculino" value="Masculino" />
                    <Picker.Item label="Femenino" value="Femenino" />
                </Picker>
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Foto Desaparecido</Text>
          
                <TouchableOpacity 
                    onPress={pickImage} 
                    style={styles.imagePicker} 
                    value={alerta.fotoDesaparecido}
                    name='imagen'
                >
                
                    <Text style={styles.imagePickerText }>Seleccionar Imagen</Text>
                </TouchableOpacity>
                
                {fileName ? (
                    <Text style={styles.fileName}>{fileName}</Text>
                ) : null}
                {previewUri ? (
                    <Image source={{ uri: previewUri }} style={styles.image} />
                ) : null}
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Nombres Denunciante</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombres Denunciante"
                    value={alerta.nombresDenunciante}
                    onChangeText={(text) => setAlerta({ ...alerta, nombresDenunciante: text })}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Apellidos Denunciante</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Apellidos Denunciante"
                    value={alerta.apellidosDenunciante}
                    onChangeText={(text) => setAlerta({ ...alerta, apellidosDenunciante: text })}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>DPI Denunciante</Text>
                <TextInput
                    style={styles.input}
                    placeholder="DPI Denunciante"
                    value={alerta.DPIDenunciente}
                    onChangeText={(text) => setAlerta({ ...alerta, DPIDenunciente: text })}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Teléfono Denunciante</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Teléfono Denunciante"
                    value={alerta.telefonoDenunciante}
                    onChangeText={(text) => setAlerta({ ...alerta, telefonoDenunciante: text })}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Denunciante</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email Denunciante"
                    value={alerta.emailDenunciante}
                    onChangeText={(text) => setAlerta({ ...alerta, emailDenunciante: text })}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Parentesco Denunciante</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Parentesco Denunciante"
                    value={alerta.parentescoDenunciante}
                    onChangeText={(text) => setAlerta({ ...alerta, parentescoDenunciante: text })}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Edad Denunciante</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Edad Denunciante"
                    value={alerta.edadDenunciante}
                    onChangeText={(text) => setAlerta({ ...alerta, edadDenunciante: text })}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Dirección Vivienda Denunciante</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Dirección Vivienda Denunciante"
                    value={alerta.direccionViviendaDenunciante}
                    onChangeText={(text) => setAlerta({ ...alerta, direccionViviendaDenunciante: text })}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Sexo Denunciante</Text>
                <Picker
                    selectedValue={alerta.sexoDenunciante}
                    style={styles.picker}
                    onValueChange={(itemValue) => setAlerta({ ...alerta, sexoDenunciante: itemValue })}
                >
                    <Picker.Item label="Seleccione..." value="" />
                    <Picker.Item label="Masculino" value="Masculino" />
                    <Picker.Item label="Femenino" value="Femenino" />
                </Picker>
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Estado Alerta</Text>
                <Picker
                    selectedValue={alerta.estadoAlerta}
                    style={styles.picker}
                    onValueChange={(itemValue) => setAlerta({ ...alerta, estadoAlerta: itemValue })}
                >
                    <Picker.Item label="Seleccione..." value="" />
                    <Picker.Item label="Encontrado" value="Encontrado" />
                    <Picker.Item label="Desaparecido" value="Desaparecido" />
                </Picker>
            </View>
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