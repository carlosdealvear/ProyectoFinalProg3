import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, {Component} from 'react'
import { auth } from '../firebase/config';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      username:'',
      password:'',
      logedIn:false,
      error:null,
      message:''
    }
  }
  
  render(){

    return (
      <View>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({email: text})}
          keyboardType='email-address'
          placeholder='email'
        />
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({username: text})}
          keyboardType='default'
          placeholder='Nombre de Usuario'
          />
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({password: text})}
          keyboardType='default'
          placeholder='password'
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.btn} onPress={
          () => {
            this.props.route.params.signUp(this.state.email, this.state.password, this.state.username)
          }}>
          <Text>
            Register
          </Text>
        </TouchableOpacity>

        <Text>
          Ya tienes una cuenta?
        </Text>
        <TouchableOpacity style={styles.btn} onPress={()=>this.props.navigation.navigate('Login')}>
        <Text>
          Ir al login
        </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles =  StyleSheet.create({
    input:{
      borderWidth:1,
      borderColor:'red',
      marginTop:16
    },
    btn:{
      flex:1,
      marginVertical:16,
      padding:16,
      borderWidth:1,
      borderColor:'blue'
    }
  })
  
  export default Register