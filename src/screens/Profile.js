import { View, Text, TouchableOpacity } from 'react-native'
import React, {Component} from 'react'

class Profile extends Component {
    render(){
        return (
            <View>
              <Text>Profile</Text>
              <TouchableOpacity onPress={()=> this.props.route.params.logout()}>
                  <Text>
                      Cerrar sesion
                  </Text>
              </TouchableOpacity>
            </View>
          )
    }
  
}
export default Profile