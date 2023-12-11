import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Entypo,Ionicons } from '@expo/vector-icons';
import DashBoard from '../../Components/DashBoard';
import ShowPost from '../../Components/CreatePostScreen/ShowPost';
import Login from "../../Components/FCS/Screens/Login"
import Sharia from '../../Components/MasjidDonation/Sharia';
import SellOptionScreen from '../../Components/SellScreen/SellOptionScreen';
import ChatScreen from '../../Components/Chat/ChatScreen';
import User from '../../Components/Chat/User';
import MasjidPortal from '../../Components/MasjidDonation/MasjidPortal';
import DonationForm from '../../Components/MasjidDonation/DonationForm';
import { COLOURS } from '../../Database';
import { StyleSheet } from 'react-native';
import { getFocusedRouteNameFromRoute, useIsFocused } from '@react-navigation/native';

import RecomendationOptionScreen from '../../Components/FoodRecomendation/RecomendationOptionScreen';

const Tab = createMaterialBottomTabNavigator();

export default function MainTabScreens({ route }) {

  const focusedRoute = getFocusedRouteNameFromRoute(route) || 'DashBoard';
  // Define a custom tab bar icon component
 
  return (
    <Tab.Navigator
      initialRouteName="DashBoard"
      shifting={true}
      sceneAnimationEnabled={false}
      barStyle={{ backgroundColor: '#2c2c6c' }}
      screenOptions={{
        tabBarLabelStyle: {
          color: focusedRoute === 'DashBoard' ? '#fff' : COLOURS.labelInactiveColor,
        },
      }}
    >
      <Tab.Screen
        name="DashBoard"
        component={DashBoard}
        options={{
          tabBarLabel: "Home",
          tabBarColor: "#fff",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color="#fff" size={25} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Recomendation"
        component={RecomendationOptionScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="fast-food"  color="#fff" size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Sell"
        component={SellOptionScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="sellsy" color="#fff" size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Donate"
        component={ShowPost}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="hands-helping" color="#fff" size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="chats"
        component={User}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="chat" color="#fff" size={25} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Masjid"
        component={MasjidPortal}
        options={{
          tabBarLabel: "Mosque",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="mosque" color="#fff" size={25} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarIconStyle: {
    width: 24,
    height: 24,
  },
  tabBarLabelStyle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
