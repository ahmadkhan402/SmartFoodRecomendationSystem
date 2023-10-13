import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome5"
import DashBoard from '../../Components/DashBoard';
import ShowPost from '../../Components/CreatePostScreen/ShowPost';
import Login from "../../Components/FCS/Screens/Login"
import DonateScreen from '../../Components/DonateScreen/DonateScreen';
import { Entypo,FontAwesome5 } from '@expo/vector-icons'; 
import Sharia from '../../Components/MasjidDonation/Sharia';
import SellOptionScreen from '../../Components/SellScreen/SellOptionScreen';
import ChatScreen from '../../Components/Chat/ChatScreen';
SellOptionScreen
const Tab = createMaterialBottomTabNavigator();


 export default function MainTabScreens() {
    

  return (
    <Tab.Navigator
     initialRouteName='Home'
    activeColor="#fff"
    inactiveColor='#2c2c6c'
        barStyle={{ backgroundColor: '#4db5ff' }}>
        
      <Tab.Screen
         name="DashBoard"
        component={DashBoard}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color="#bae0ff" size={25} />
          ),
          headerShown: true
        }}
      />
     
      <Tab.Screen
        name="Sell"
        component={SellOptionScreen}
        options={{
          tabBarColor:"Black",
          tabBarLabel: 'Sell',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="sellsy" size={25} color="#bae0ff" />
            
          ),
          headerShown: true
        }}
      />
        <Tab.Screen
        name="Donate"
        component={DonateScreen}
        options={{
          tabBarColor:"Black",
          tabBarLabel: 'Donate',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="hands-helping" size={24} color="#bae0ff" />
            
          ),
          headerShown: true
        }}
      />
      
      
      {/* <Tab.Screen
        name="Donate"
        component={DonateScreen}
        options={{
          tabBarColor:"Black",
          tabBarLabel: 'Donate',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="hands-helping" size={24} color="#bae0ff" />
            
          ),
          headerShown: true
        }}
      />
       */}
       <Tab.Screen
        name="chat"
        component={ChatScreen}
        options={{
          tabBarColor:"Black",
          tabBarLabel: 'chat',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="chat" size={24} color="#bae0ff" />
            
          ),
          headerShown: true
        }}
      />
      {/* <Tab.Screen
        name="Masjid"
        component={Sharia}
        options={{
          tabBarLabel: 'Sharia',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="mosque"  color="#bae0ff" size={25} />
          ),
          headerShown: true
        }}
      /> */}
      <Tab.Screen
        name="ShowPost"
        component={ShowPost}
        options={{
          tabBarLabel: 'Post',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color="#bae0ff" size={25} />
          ),
          headerShown: true
        }}
      />
    </Tab.Navigator>
  )
 }