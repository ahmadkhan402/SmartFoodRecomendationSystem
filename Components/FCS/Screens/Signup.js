import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";


export default function Signup({navigation}) {
    const [DisplayName, setDisplayName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [Fulname, setFullName] = useState("");

    const handleSetup = ()=>{
        createUserWithEmailAndPassword(auth , email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          const users = userCredential.user;
            console.log('u', user.email)
            console.log('u', user.displayName)
           

            // The user object has basic properties such as display name, email, e
            
        
          
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage)
          // ..
        });
    //     auth
    //     .createUserWithEmailAndPassword(email, password)
    //     .then((userCredential) => {
    //       const user = userCredential.user;
    //       console.log("Registered With User :" ,user.email)
    //       navigation.navigate("Home")
    //     })
    //     .catch((error) => {
    //       const errorCode = error.code;
    //       const errorMessage = error.message;
          
    //     });
    // }
    }
    return (
        
         <ImageBackground  style={styles.container} source={require("./../../../assets/bg3.gif")}>
       <View style={styles.miniContainer}>
        {/* <Text style={{ color:"rgba(255,255,255,0.6)",fontWeight:"bold", fontSize:25, marginBottom:10,  fontFamily: 'serif'}}>Wellcome Back</Text> */}
            <Image style={styles.image} source={require("../../../assets/logo2p.png")} />
            <StatusBar style="auto" />
           
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Username" 
                    color= "#4db5ff"
                    placeholderTextColor="#4db5ff"
                    onChangeText={(username) => setDisplayName(username)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Full name"
                    color= "#4db5ff"
                    placeholderTextColor="#4db5ff"
                    onChangeText={(fullname) => setFullName(fullname)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email"
                    color= "#4db5ff"
                    placeholderTextColor="#4db5ff"
                    secureTextEntry={false}
                    onChangeText={(Email) => setEmail(Email)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password"
                    color= "#4db5ff"
                    placeholderTextColor="#4db5ff"
                    secureTextEntry={true}
                    onChangeText={(Password) => setPassword(Password)}
                />
            </View>
            
            <TouchableOpacity style={styles.loginBtn}  onPress={handleSetup }>
                <Text style={styles.loginText}>Register</Text>
            </TouchableOpacity>
            <View style={{ display: "flex",flexDirection: "row", justifyContent: "center", marginVertical: 8 }}>
               
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Login');
                    }}>
                <Text style={styles.already_button}> I'm already a user?  </Text>
                </TouchableOpacity>
            </View>
            </View>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    miniContainer: {
        width: "80%",
        height:"100%",
        marginTop:80,
        marginBottom:-40,
        justifyContent: "flex-start",
        paddingTop:20,
        alignSelf:"flex-end",
        alignItems: "center",
        borderTopLeftRadius: 100,
        backgroundColor: "#2c2c6c",
        opacity:0.8
       
        
    },
    image: {
        marginBottom: 5,
        width: "50%",
        height: "25%"

    },
    inputView: {
        backgroundColor: "transparent",
        borderColor:"#4db5ff",
        borderWidth:1,
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
        elevation:40,
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
        
    },
    already_button: {
        height: 30,
        
        marginTop: 10,
        color:"#4db5ff",
        fontWeight:"bold",
        
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#4db5ff",
        elevation:40,
    },
})