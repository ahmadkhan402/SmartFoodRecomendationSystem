import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { getItem, setItem } from "../../../AsyncStorage/AsyscStorage";
import { auth } from "../../../firebase";
import { getAuth } from "firebase/auth";

const Splash = () => {
   const navigation = useNavigation();
  //const [showLogin, setshowlogin] = useState("");

  const checkifalreadyLogin = async () => {
    let getuid = await getItem("onLogin");
    console.log(getuid)
    if (getuid) {
      //hide login
      navigation.navigate('DrawerNavigator')
    } else {
      //Show login
      navigation.navigate("Login")
    }
  };
const auth = getAuth();
useEffect(() => {
  
  const unsubsribe = auth.onAuthStateChanged((user) => {
      setTimeout(() => {
        checkifalreadyLogin();
      }, 3000);
  }
   )
    
  return unsubsribe;
}, []);
  useEffect(() => {
   
  }, []);

  return (
    <View style={styles.Container}>
      <LottieView
        autoPlay
        style={{
          width: 350,
          height: 350,
        }}
        source={require("../../../assets/lottie/s3.json")}
      />

      <Text style={styles.text}>SR-Donation</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#2c2c6c",
    opacity: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: 900,
    color: "#1D5D9B",
  },
});
