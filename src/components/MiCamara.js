import React, { Component } from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image, TextInput} from 'react-native'
import {Camera} from 'expo-camera'
import { storage } from '../firebase/config'

class MiCamara extends Component {
    constructor(props){
        super(props)
        this.state={
            permisos: false,
            urlFoto:'',
            mostrarCamara: true
        }
        this.metodosDeCamara = undefined
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(()=>{
            this.setState({permisos: true})
        })
        .catch(error => console.log(error))
        console.log(Camera)
    }

    tomarLaFoto(){
        console.log('say cheese')
        this.metodosDeCamara.takePictureAsync()
        .then(dataFoto => {
            console.log(dataFoto)
            this.setState({
                urlFoto: dataFoto.uri,
                mostrarCamara:false
            })
            console.log(dataFoto)
        })
        .catch(error => console.log(error))
    }
    guardarFoto(){
        fetch(this.state.urlFoto)
        .then(response => {
            return response.blob()
        })
        .then(foto => {
            const referenciaDelStorage = storage.ref(`photos/${Date.now()}.jpg`)
            console.log("Photo")
            referenciaDelStorage.put(foto)
            .then(()=>{
                referenciaDelStorage.getDownloadURL()
                .then( url => {
                    console.log(url)
                    this.props.cuandoSubaLaImagen(url);
                    this.setState({photo:''})
                })
            })
        })
        .catch(error => console.log(error))
    }

    descartarFoto(){
        console.log('Foto descartada')
    }


  render() {
    return (
        <View style={styles.container}>
                {
                    this.state.permisos
                    ?
                        this.state.mostrarCamara === false
                        ?
                        <>
                            <Text>Aqui vamos a mostrar la imagen y el aceptar y rechazar</Text>
                            <Image
                            style={styles.camara}
                            source={{uri: this.state.urlFoto}}
                            />
                            <View style={styles.buttons}>
                                <TouchableOpacity onPress={()=> this.guardarFoto()}>
                                    <Text>Aceptar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> this.descartarFoto()}>
                                    <Text>Rechazar</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                        :
                        <>
                            <Camera
                            style={styles.CameraBody}
                            type={Camera.Constants.Type.back}
                            ref={metodos => this.metodosDeCamara = metodos}
                            />
                            <View style={styles.buttons}>
                                <TouchableOpacity onPress={()=> this.tomarLaFoto()}>
                                    <Text>Tomar la foto</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    :
                    <Text>No tenes permiso para usar la Camara</Text>
                }
            </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    camara:{
      flex:7  
    },
    button:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center'
    },
    CameraBody:{
        flex:7,
    },
})

export default MiCamara