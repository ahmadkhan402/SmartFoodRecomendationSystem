import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { setItem } from "./AsyncStorage/AsyscStorage";

const OnbordingScreen = () => {
  const navigation = useNavigation()
const handleDone =()=>{
  navigation.navigate("Login")
  setItem('onbording','1')
}
// const doneBtn =({...props})=>{
//   return(
// <TouchableOpacity {...props}>
// <Text style={{padding:18, borderRadius:35,backgroundColor:"#FFC4DD"}}><Ionicons name="ios-checkmark-done" size={24} color="black" /></Text>
// </TouchableOpacity>
//   )
// }

  return (
    <View style={styles.container}>
      <Onboarding
      onDone={handleDone}
      onSkip={handleDone}
      // DoneButtonComponent={doneBtn}
        pages={[
          {
            backgroundColor: "#FEFBE9",
            image: (
              <LottieView
                autoPlay
                style={{
                  width: 200,
                  height: 200,
                  
                }}
                source={require("./assets/lottie/4.json")}
              />
            ),
            title: "Be the change",
            subtitle: "“Sometimes those who give the most are the ones with the least to spare.",
          },
          {
            backgroundColor: "#DBC4F0",
            image: (
              <LottieView
                autoPlay
                style={{
                  width: 200,
                  height: 200,
                  
                }}
                source={require("./assets/lottie/2.json")}
              />
            ),
            title: "Empathetic Selling",
            subtitle:  "The key to selling is not to convince people to buy, but to help them solve a problem or achieve a goal",
          },
          {
            backgroundColor: "#6E7C7C",
            image: (
              <LottieView
                autoPlay
                style={{
                  width: 200,
                  height: 200,
                  
                }}
                source={require("./assets/lottie/1.json")}
              />
            ),
            title: "Embracing Generosity in Islam",
            subtitle: "The upper hand is better than the lower hand. The upper hand is the one that gives, and the lower hand is the one that receives",
          },
         
          {
            backgroundColor: "#FFC4DD",
            image: (
              <LottieView
                autoPlay
                style={{
                  width: 200,
                  height: 200,
                  
                }}
                source={require("./assets/lottie/3.json")}
              />
            ),
            title: "Deliver to Doorstep",
            subtitle: "Bringing the world's flavors to your doorstep",
          },
        ]}
      />
    </View>
  );
};

export default OnbordingScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
   }
});
