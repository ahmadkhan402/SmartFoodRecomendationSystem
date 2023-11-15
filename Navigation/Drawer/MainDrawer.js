import * as React from 'react';
import { Text, View, TouchableOpacity, Button, useWindowDimensions, StyleSheet, Image } from 'react-native';

import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Icons from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import { Linking } from 'react-native';
import MainTabScreens from "../Tab/MainTabScreens"
import { getAuth, signOut } from "firebase/auth";
import { auth, db } from '../../firebase';
import DrawerProfile from './DrawerProfile';
import { removeItem } from '../../AsyncStorage/AsyscStorage';
import RNRestart from 'react-native-restart'
import { Alert } from 'react-native';
import ProfileScreen from './ProfileScreen';
import EditProfile from './EditProfile';
import { useCallback } from 'react';
import { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();



function Screen(){
    return(
        <Stack.Navigator>
             <Stack.Screen
        name="Tabs"
        component={MainTabScreens}
        options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function CustomDrawerContent(props) {
  const [email, setEmail] = useState("")
  const [data,setData] = useState("")

  async function getMostRecentData(){
    const UserRef = doc(db, "users", auth.currentUser.uid)
    const docSnap = await getDoc(UserRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setData(docSnap.data())
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    
  }
  useFocusEffect(
    useCallback(() => {
      getMostRecentData();
      setEmail(auth.currentUser.email);
    },[]) // Empty dependency array means this will run when the screen gains focus
  );

  const navigation =  useNavigation()
  const Handlelogout=()=>{

    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
       removeItem('onLogin')
      alert('Sign-out successful')
      navigation.navigate('Login')
    }).catch((error) => {
      // An error happened.
      alert('An error happened')
    });
    
  }
 
  return (
  
    <DrawerContentScrollView {...props} style={{flex:1,backgroundColor:"rgba(77,181,255,0.4)" }}>
    <View style={{ flex:1}}>
      <View style={{justifyContent:"center",alignItems:"center", backgroundColor: '#2c2c6c', height: 150}}>
        <View style={{ flexDirection: 'row' }}>
         {data.ImageUrl ? (
          <Image
            source={{uri: data.ImageUrl}}
            style={{ width: 60, height: 60, borderRadius: 25 , resizeMode:"cover"}}
          />
         ):(
          <Image source={require("./../../assets/svg.png")}  style={{ width: 60, height: 60, borderRadius: 25 , resizeMode:"cover"}}/>
         )
         }
          <View style={{ marginLeft: 15, flexDirection: 'column' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>{data? data.Fulname: "Your Name"}</Text>
            <Text style={{ fontSize: 12, color: 'white' }}>{email? email : "your email"}</Text>
          </View>
        </View>
      </View>
      <DrawerItem
        icon={({ color, size }) => <AntDesign name="home" size={size} color={color} />}
        label="Home"
        onPress={() => props.navigation.navigate('Home')}
      />
      <DrawerItem
        icon={({ color, size }) => <Ionicons name="ios-person" size={size} color={color} />}
        label="Profile"
        onPress={() => props.navigation.navigate('Profile')}
      />
      <DrawerItem
        icon={({ color, size }) => <Ionicons name="ios-aperture" size={size} color={color} />}
        label="APK Version 1.0"
      />
       <DrawerItem
      icon={({ color, size }) => <Entypo name="help-with-circle" size={size} color={color} />}
      label="Help"
        onPress={() => Linking.openURL('https://mywebsite.com/help')}
      />
      <DrawerItem
        icon={({ color, size }) => <AntDesign name="sharealt" size={size} color={color} />}
        label="Share"
        onPress={() => alert('Link generated!')}
      />
       <DrawerItem
        icon={({ color, size }) => <MaterialCommunityIcons name="restart" size={24} color="black" />}
        label="Restart App"
        onPress={ async ()=>{
    await removeItem('onbording');
    Alert.alert('Restart Application', 'Click ok to restart Application', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () =>   navigation.push('OnbordingScreen')},
    ]);

 
      }}
      />
     <View style={{ flex:1, justifyContent:"flex-end",marginTop:"120%" ,paddingBottom: 20,marginLeft:15 }}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={Handlelogout}>
          <AntDesign name="logout" size={24} color="#FFA07A" />
          <Text style={{ marginLeft: 15, fontSize: 16, color: '#FFA07A' }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
    
      
    </DrawerContentScrollView>
    
    
  );
}


const LogoTitle = ({ navigation }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={require('../../assets/money.png')}
        style={{ width: 30, height: 30 }}
      />
      <Text style={{ marginLeft: 10, fontWeight: 'bold', color: "#fff" }}>SR-Donation</Text>
      {/* style={{justifyContent:"flex-end",marginLeft:"56%",paddingRight:20, width: 30, height: 30 }} */}
    </View>
  );
};

export default function DrawerNavigator() {

  return (
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{

              headerTitleAlign: 'left',
              headerTitle: props => <LogoTitle {...props} />,
              headerStyle: {
                  backgroundColor: '#4db5ff',
              },
              headerTintColor: 'pink',
              headerTitleStyle: {
                  fontWeight: 'bold',
              },
          }}>
      <Drawer.Screen name="Home" component={Screen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="EditProfile" component={EditProfile} />
    </Drawer.Navigator>
  )
}