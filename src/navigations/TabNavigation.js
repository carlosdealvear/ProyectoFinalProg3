import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Home from '../screens/Home'
import NewPost from '../screens/NewPost'
import Profile from '../screens/Profile'
const Tab = createBottomTabNavigator()

export default function TabNavigation(props) {
  const{logout} = props.route.params
  
    return (
    <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='NewPost' component={NewPost} />
        <Tab.Screen 
        name='Profile' 
        component={Profile} 
        initialParams={{
            logout: () => logout()
        }}
        />
    </Tab.Navigator>
  )
}