import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, {Component} from 'react'
import { auth, db } from '../firebase/config';
import  MiCamara from '../components/MiCamara'



class NewPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            message:'',
            mostrarComponenteCamara: true,
            urlFoto:''
        }
    }

    cuandoSubaLaImagen(url){
        console.log(url)
        this.setState({
            mostrarComponenteCamara:false,
            urlFoto: url
        })
    }

    newPost(message, urlFoto){
        db.collection('posts').add({
            owner: auth.currentUser.email,
            likes:[],
            foto:urlFoto,
            createdAt: Date.now(),
            message:message,
        })
        .then(response => console.log(response))
        .catch(error => console.log(error.message))
    }



    render(){

        return (
            <View>
                {this.state.mostrarComponenteCamara ?
                <MiCamara cuandoSubaLaImagen={(url)=> this.cuandoSubaLaImagen(url)}/>
                :<>
                    <Text>Agregar un comentario</Text>
                    <TextInput 
                    style={styles.textarea}
                    onChangeText= {(text)=> this.setState({
                        message: text
                    })}
                    value={this.state.message}
                    />
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                            this.newPost(this.state.message, this.state.urlFoto)
                            this.setState({
                                message:'',
                            })
                            this.props.navigation.navigate('Home')
                        }}
                    >
                        <Text>Enviar mensaje</Text>
                    </TouchableOpacity>
                </>
                    }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textarea:{
        borderWidth:1,
        borderColor:'#c3c3c3',
        height:'auto',
        minHeight:60,
        marginTop:10
    },
    btn:{
        marginTop:16,
        borderColor:'red',
        borderWidth:1
    }
})

export default NewPost