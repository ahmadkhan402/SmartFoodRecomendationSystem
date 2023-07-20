import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
const OnbordingScreen = () => {
  return (
    <View style={styles.container}>
      <Onboarding
        pages={[
          {
            backgroundColor: "#fff",
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
            title: "Onboarding",
            subtitle: "Done with React Native Onboarding Swiper",
          },
          {
            backgroundColor: "#fff",
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
            title: "Onboarding",
            subtitle: "Done with React Native Onboarding Swiper",
          },
          {
            backgroundColor: "#fff",
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
            title: "Onboarding",
            subtitle: "Done with React Native Onboarding Swiper",
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
    justifyContent:"center"
  }
});
