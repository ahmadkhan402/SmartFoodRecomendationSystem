import React, { useState, useEffect } from 'react';
import { Button, Image, Text, TextInput, TouchableOpacity, View, Platform, StyleSheet, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage } from '../../firebase';
import { Entypo } from '@expo/vector-icons';
import { Directions, ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import InputForm from './InputForm';


export default function ImagePickerExample( ...props ) {


  const [image, setImage] = useState(null)
  const [blobImage, setblob] = useState(null)
  const [ShowImage, setShowImage] = useState('')
  const [postContent, setPostContent] = useState('');

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



  const uploadImage = async () => {
    const metadata = {
      contentType: 'image/jpeg'
    };
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'DonationPosts/' + Date.now());
    const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');

        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setShowImage(downloadURL)
        });
      }
    );
  }


  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
    
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
      <View >
      <InputForm/>
      </View>
      {/* <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Create a post</Text>
      <View style={styles.ImageSection}>

        <TextInput
          style={{ marginTop: 16, borderWidth: 1, borderColor: 'gray', width: "86%", borderRadius: 8, padding: 8 }}
          placeholder="What's on your mind?"
          multiline={true}
          numberOfLines={4}
          value={postContent}
          onChangeText={setPostContent}

        />

        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={pickImage}
        >
          <Text><Entypo name="images" size={35} color="rgba(77,181,255,0.4)" /></Text>
        </TouchableOpacity>
      </View>
      {image && (
        <View style={{ marginTop: 16 }}>
          <Image source={{ uri: image }} style={{ width: '100%', height: 200 }} resizeMode="cover" />
        </View>
      )}
      <TouchableOpacity
        style={{ marginTop: 27, marginRight: "70%", justifyContent: "center", borderColor: "blue", alignItems: "center", backgroundColor: '#3457D5', padding: 8, borderWidth: 1, borderRadius: 8 }}
        onPress={() => {
          uploadImage(),
            navigation.navigate('ShowPost')
        }}
      >
        <Text style={{ color: 'white' }}>Post</Text>
      </TouchableOpacity> */}
      {/* <View style={{width:'50%',backgroundColor:"black", height:'40%'}}>
       <Image source={{uri: ShowImage}}  style={{ width: '100%', height: 200 }} resizeMode="cover"  /> 
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImaageText:{
    
    justifyContent:"center",
    marginLeft:"4%"

  },
  ImageSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center"
  }
})
