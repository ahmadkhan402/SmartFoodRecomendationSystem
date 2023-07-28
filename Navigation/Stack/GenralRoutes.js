import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import Signup from "../../Components/FCS/Screens/Signup";
import Login from "../../Components/FCS/Screens/Login";
import MainDrawer from "../Drawer/MainDrawer";
import CreatePost from "../../Components/CreatePostScreen/CreatePost";
import ShowPost from "../../Components/CreatePostScreen/ShowPost";
import OnbordingScreen from "../../OnbordingScreen";
import { getItem } from "../../AsyncStorage/AsyscStorage";
import Splash from "../../Components/FCS/Screens/Splash";
import BuyerScreen from "../../Components/SellScreen/BuyerScreen";
import SellOptionScreen from "../../Components/SellScreen/SellOptionScreen";
import SellerScreen from "../../Components/SellScreen/SellerScreen";

const Stack = createStackNavigator();

const GenralRoutes = ({ navigation }) => {
  const [showOnbording, setShowOnboarding] = useState(null);

  useEffect(() => {
    checkifalreadyOnboarded();
  },
   []);
  const checkifalreadyOnboarded = async () => {
    let onboarded = await getItem("onbording");
    if (onboarded == 1) {
      //hide Onbording
      setShowOnboarding(false);
    } else {
      //Show Onboarding
      setShowOnboarding(true);
    }
  };

  if (showOnbording == null) {
    return null;
  }
  if (showOnbording) {
    return (
      <Stack.Navigator initialRouteName="OnbordingScreen">
        <Stack.Screen
          name="OnbordingScreen"
          component={OnbordingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Buyer"
          component={BuyerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Seller"
          component={SellOptionScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Registration_Page"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DrawerNavigator"
          component={MainDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePost}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
        name="ShowPost"
        component={ShowPost}
        options={{ headerShown: false }} /> */}
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator initialRouteName="DrawerNavigator">
       <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SellerOption"
          component={SellOptionScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Buyer"
          component={BuyerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Seller"
          component={SellerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnbordingScreen"
          component={OnbordingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registration_Page"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DrawerNavigator"
          component={MainDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePost}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="ShowPost"
          component={ShowPost}
          options={{ headerShown: false }} /> */}
      </Stack.Navigator>
    );
  }
};

export default GenralRoutes;

{
  /* <Tab.Screen
        name="Registration_Page"
        component={Signup}
        options={{
          tabBarLabel: 'Login',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color="#bae0ff" size={25} />
          ),
          headerShown: true
        }}
      /> */
}
