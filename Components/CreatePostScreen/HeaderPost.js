import { Button, Image, Text, TextInput, TouchableOpacity, View, Platform, StyleSheet, SafeAreaView } from 'react-native';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage } from '../../firebase';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HeaderPost = () => {
    const [blobImage, setblob] = useState(null)
    const [image, setImage] = useState(null)
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All, // We can  specify whether we need only Images or Videos
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,   // 0 means compress for small size, 1 means  compress for maximum quality
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.uri);
          const response = await fetch(result.uri);
          const blob = await response.blob();
          setblob(blob)
        }
      };
  return (
    <View style={{width: "100%", height: "20%", backgroundColor: "#E1EBEE", marginTop: 23, flexDirection: "row" }}>
    <TouchableOpacity style={{ marginLeft: 12, alignContent: "center", justifyContent: "center" }}
      onPress={pickImage}>
      <Text style={{ borderColor: "#2c2c6c", borderStyle: "dashed", borderWidth: 2, padding: "5%" }}>
        <MaterialCommunityIcons name="camera-plus" size={65} color="#5D8AA8" />
      </Text>
    </TouchableOpacity>
    <View style={styles.ImaageText}>
      <Text style={{ color: "#800020" }}>Please add an Image</Text>
    </View>
    
  </View> 
  )
}

export default HeaderPost

const styles = StyleSheet.create({})