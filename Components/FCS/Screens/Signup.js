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
import { getDatabase, ref, set } from "firebase/database";
import { auth ,db} from "../../../firebase";
import { collection, addDoc, doc, setDoc } from "firebase/firestore"; 



export default function Signup({navigation}) {
    const [DisplayName, setDisplayName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [Fulname, setFulname] = useState("");
    
    // const [id, setid] = useState("");


    const handleSetup = ()=>{
        createUserWithEmailAndPassword(auth , email, password)
        .then((userCredential) => {
            console.log(userCredential.user.uid)
            const id = userCredential.user.uid
          // Signed in 
            const user = userCredential.user;
            console.log('u', user.email)
            console.log('u', user.displayName)
            navigation.navigate('Login')
          
            addusers(id,DisplayName,email,password, Fulname)
            })
           
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage)
          // ..
        });

        const addusers = async (id, DisplayName, email, password, Fulname)=>{
            try {
                const userRef = doc(db, 'users', auth.currentUser.uid);
                await setDoc(userRef,  {
               
                Id :id,
                Display_Name: DisplayName ,
                Fulname,
                email: email,
                authProvider: "local",
            });
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          }

}
    

    return (
        
        
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
                    onChangeText={(Fulname) => setFulname(Fulname)}
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
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    miniContainer: {
        flex:1,
        justifyContent: "center",
         paddingTop: 20,
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
        alignSelf:"center"
    },
})