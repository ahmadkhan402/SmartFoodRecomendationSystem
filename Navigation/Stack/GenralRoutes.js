import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button } from 'react-native';
import Signup from '../../Components/FCS/Screens/Signup';
import Login from '../../Components/FCS/Screens/Login';
import MainDrawer from "../Drawer/MainDrawer"
import CreatePost from "../../Components/CreatePostScreen/CreatePost"
import ShowPost from '../../Components/CreatePostScreen/ShowPost';

const Stack = createStackNavigator();


const GenralRoutes = ({navigation}) => {
  return (
    
      <Stack.Navigator initialRouteName='DrawerNavigator'>
      <Stack.Screen
        name="Registration_Page"
        component={Signup}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }} />
        <Stack.Screen
        name="DrawerNavigator"
        component={MainDrawer}
        options={{ headerShown: false }} />
        <Stack.Screen
        name="CreatePost"
        component={CreatePost}
        options={{ headerShown: false }} />
        <Stack.Screen
        name="ShowPost"
        component={ShowPost}
        options={{ headerShown: false }} />
       
      </Stack.Navigator>
   
  
  )
}

export default GenralRoutes


 {/* <Tab.Screen
        name="Registration_Page"
        component={Signup}
        options={{
          tabBarLabel: 'Login',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color="#bae0ff" size={25} />
          ),
          headerShown: true
        }}
      /> */}