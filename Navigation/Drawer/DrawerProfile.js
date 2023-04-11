import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import {  updateProfile } from "firebase/auth";
import { auth,db } from '../../firebase';
import { doc, setDoc, updateDoc } from "firebase/firestore"; 

const  EditScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(null);
console.log(image)

  const navigation = useNavigation();

  // function handlePress() {
  //   navigation.navigate("Form");
  // }



  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // We can  specify whether we need only Images or Videos
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,   // 0 means compress for small size, 1 means  compress for maximum quality
    });

    console.log(result.assets[0].uri);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    const userId = auth.currentUser.uid
    const AuthUsersRef = doc(db, "AuthUsers" ,"C4GMFQtbiIZcQ9L4wRGv");
    await updateDoc(AuthUsersRef, {
      ProfilePic: {image},
      Display_Name: {name},
      email: {email}
  });
  alert('data is submited successfully')
  };

  return (
    
    <View style={styles.container}>
 
        <ImageBackground source={{ uri: image }}  style={styles.profilePic} >
        <TouchableOpacity onPress={handleImagePicker}>
         <Text style={styles.icon}><AntDesign name="pluscircle" size={35} color="#2c2c6c" />
          </Text>
        </TouchableOpacity>
        </ImageBackground>
        
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(e)=>setName(e)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(e)=>setEmail(e)}
      />
      <TextInput
        style={styles.input}
        placeholder="Bio"
        value={bio}
        onChangeText={(e)=>setBio(e)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
    
  );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    paddingTop:34,
    backgroundColor: "lightgray",
    alignItems: 'center',
    
  },
  icon:{
    position:"absolute",
    marginTop:"70%",
    justifyContent:"center",
    alignItems:"center",
    right:"34%",
    
   },
 
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: '80%',
    
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 75,
    borderColor:'black',
    borderWidth:2,
    marginVertical: 20,
    overflow:"hidden",
    backgroundColor:'gray'
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});
export default EditScreen