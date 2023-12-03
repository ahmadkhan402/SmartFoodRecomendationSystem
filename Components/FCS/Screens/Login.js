import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { auth, db } from "../../../firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,createCustomToken
} from "firebase/auth";
import { setItem } from "../../../AsyncStorage/AsyscStorage";
import { getItem } from "../../../AsyncStorage/AsyscStorage";
import { isEmpty } from "@firebase/util";
import { useNavigation } from "@react-navigation/native";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { COLOURS } from "../../../Database";

export default function Login({ navigation }) {
  //Hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  // const goToNext = async (email, userId) => {
  //   await AsyncStorage.setItem('NAME', name);
  //   await AsyncStorage.setItem('EMAIL', email);
  //   await AsyncStorage.setItem('USERID', userId);
  //   navigation.navigate('Main');
  // };

  const handleLogin = async () => {
   // checkifalreadyLogin();
    const auth = getAuth();
   
    signInWithEmailAndPassword(auth, email, password)
      .then( async(userCredential)  => {
        // Signed in
        const user = userCredential.user;
        navigation.navigate("DrawerNavigator")
    //     const q = query(collection(db, "users"), where("uid", "==", user.uid));
    //  const docs = await getDocs(q);
    // if (docs.docs.length === 0) {
    //   await addDoc(collection(db, "users"), {
    //     uid: user.uid,
    //     name: user.displayName,
    //     authProvider: "google",
    //     email: user.email,
    //   });
    // }
      setItem('ShowEmail', user.email.toString())
        setItem('onLogin', user.uid.toString() )
        // console.log(user);
        // 
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
    //     auth
    //     .signInWithEmailAndPassword(email,password)
    //     .then((userCredential) => {
    //            const user = userCredential.user;
    //
    //
    //     }).catch(error => alert(error.message))
    //    }
  };
  const handleForgetPassword = () => {
    if (email) {
      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Email has been send Successfully");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
    } else {
      alert("Plz enter Valid Email");
    }
  };
  return (
      <View style={styles.miniContainer}>
        {/* <Text style={{ color:"rgba(255,255,255,0.6)",fontWeight:"bold", fontSize:25, marginBottom:10,  fontFamily: 'serif'}}>Wellcome Back</Text> */}
       
        <Image
          style={styles.image}
          source={require("../../../assets/logo2p.png")}
        />
        
        <StatusBar style="auto" />

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            color="#4db5ff"
            placeholderTextColor="#4db5ff"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            color="#4db5ff"
            placeholderTextColor="#4db5ff"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />

        </View>
        <View style={{alignItems:"center"}}>
        <TouchableOpacity onPress={() => handleForgetPassword()}>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>
        </View>
        <View style={{alignItems:"center"}}>
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 8,
          }}
        >
          <Text style={{ color: "rgba(255,255,255,0.6)" }}>
            {" "}
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Registration_Page")}
          >
            <Text style={{ fontWeight: "bold", color: "#4db5ff" }}>Signup</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
     
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  miniContainer: {
   flex:1,
   justifyContent: "center",
    
    backgroundColor: "#2c2c6c",
    opacity: 1,
  },
  image: {
    alignItems:"center",
    alignSelf:"center",
    marginBottom: 5,
    width: "50%",
    height: "25%",
  },
  inputView: {
    borderColor: "#4db5ff",
    borderWidth: 1,
    borderRadius: 30,
    height: 45,
    marginBottom: 20,
    marginHorizontal:50
  },
  TextInput: {
    textAlign:"center",
    flex: 1,
    padding: 10,
   
  },
  forgot_button: {
    
    height: 30,
    marginBottom: 30,
    color: "#4db5ff",
    fontWeight: "bold",
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#4db5ff",
    elevation: 40,
  },
});
