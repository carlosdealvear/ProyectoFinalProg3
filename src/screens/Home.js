import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import React, {Component} from 'react'
import {db} from '../firebase/config'
import Post from '../components/Post'

class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      info:[],
      loading:true,
      
    }
  }

  componentDidMount(){
    db.collection('posts').orderBy("createdAt","desc").onSnapshot(
      (docs)=>{
        let posts = []
        docs.forEach(
          doc => {
            posts.push({
              id:doc.id,
              data: doc.data()
            })
          }
        )
        this.setState({
          info:posts,
          loading:false
        })

      }
    )

  }

  render(){
    return (
      <View style={styles.container}>
       <Text>Estos son los posteos recientes:</Text>

        {
         this.state.loading ?
         <ActivityIndicator size={32} color='red'/>
         : 
         this.state.info.length == 0?
         <Text> No hay posteos </Text>
            :
         <FlatList
         data={this.state.info}
         keyExtractor={item => item.id.toString()}
         renderItem={({ item }) => <Post info={item} navigation={this.props.navigation}/>}
         />
         }



        <TouchableOpacity style={styles.btn} onPress={()=> this.props.navigation.navigate('NewPost')}>
          <Text style={styles.textBtn}>Enviar posteo</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:16,
    paddingBottom:32
  },
  btn:{
    borderWidth:1,
    borderRadius:5,
    backgroundColor:'#192A51',
    paddingVertical:16,
    paddingHorizontal:8,
    marginHorizontal:'auto',
    marginBottom:16,
  },
  textBtn:{
    color:'white'
  }
})

export default Home