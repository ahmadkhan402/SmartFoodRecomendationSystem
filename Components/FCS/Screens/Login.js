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
import { auth } from "../../../firebase";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { isEmpty } from "@firebase/util";

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubsribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate('DrawerNavigator')
            }
        })
        return unsubsribe
    }, [])


    const handleLogin = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                alert("Logged with user", user.email)
                navigation.navigate("DrawerNavigator")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
            });
        //     auth
        //     .signInWithEmailAndPassword(email,password)
        //     .then((userCredential) => {
        //            const user = userCredential.user;
        //           
        //           
        //     }).catch(error => alert(error.message))
        //    }
    }
    const handleForgetPassword = () => {
        if (email) {
            const auth = getAuth();
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert("Email has been send Successfully")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage)
                });

        } else {
            alert("Plz enter Valid Email")
            
        }
    }
    return (

        <ImageBackground style={styles.container} source={require("./../../../assets/bg4.gif")}>
            <View style={styles.miniContainer}>
                {/* <Text style={{ color:"rgba(255,255,255,0.6)",fontWeight:"bold", fontSize:25, marginBottom:10,  fontFamily: 'serif'}}>Wellcome Back</Text> */}
                <Image style={styles.image} source={require("../../../assets/logo2p.png")} />
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
                <TouchableOpacity onPress={() => handleForgetPassword()}>
                    <Text style={styles.forgot_button}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginVertical: 8 }}>
                    <Text style={{ color: "rgba(255,255,255,0.6)" }}> Don't have an account?  </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Registration_Page')}>
                        <Text style={{ fontWeight: "bold", color: "#4db5ff" }}>Signup</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
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
        width: "80%",
        height: "100%",
        marginTop: 240,
        marginBottom: -40,
        justifyContent: "flex-start",
        paddingTop: 20,
        alignSelf: "flex-end",
        alignItems: "center",
        borderTopLeftRadius: 100,
        backgroundColor: "#2c2c6c",
        opacity: 0.8


    },
    image: {
        marginBottom: 5,
        width: "50%",
        height: "25%"

    },
    inputView: {
        backgroundColor: "transparent",
        borderColor: "#4db5ff",
        borderWidth: 1,
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
        elevation: 40,
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,

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
})