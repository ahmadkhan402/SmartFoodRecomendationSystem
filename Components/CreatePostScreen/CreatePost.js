import React, { useState, useEffect } from 'react';
import { Button, ScrollView, Image, Text, TextInput, TouchableOpacity, View, Platform, StyleSheet, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getDatabase, child, get,set, database,push } from "firebase/database";
import {db, auth, storage } from '../../firebase';
import { Entypo } from '@expo/vector-icons';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import InputForm from './InputForm';
import MapShow from './MapShow';
import { useNavigation } from '@react-navigation/native';


export default function ImagePickerExample(...props) {

  const navigation = useNavigation()
  const [image, setImage] = useState(null)
  const [blobImage, setblob] = useState(null)
  const [ShowImage, setShowImage] = useState('')
  const [postContent, setPostContent] = useState('');
  const [title, setTitle] = useState('SomeThing');
  const [Discription, setDiscrioption] = useState('SomeTjbwjkbwjkbdkhing');
  const [selectedNumber, setSelectedNumber] = useState();

  // function writeUserData(userId, title, Discription, selectedNumber, ShowImage) {
  //   const dbRef = db.ref('post');
  //   dbRef.push({
  //     title: title,
  //     description: Discription,
  //     selectedNumber: selectedNumber,
  //     imageUrl: ShowImage
  //   });
  // }



  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // We can  specify whether we need only Images or Videos
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,   // 0 means compress for small size, 1 means  compress for maximum quality
    });

    console.log(result.assets[0].uri);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const response = await fetch(result.assets[0].uri);
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
          setShowImage(downloadURL);
  
          // Add title and description to Firebase database
      
          
        });
      }
    );
    // debugger
    // set(ref(db, 'Post'), {
    //   title: title,
    //   description: Discription,
    //   imageUrl: ShowImage,
    // });

  }
  // const setDatabaseData = () => {
  //   //const newkey = push(child(ref(db),'users')).key()
  //   set(ref(db, 'users/' + title),{
  //     Title: title,
  //     Discription: Discription
      
  //   })
  //   .then(() => {
  //     console.log('Data saved successfully!') 
  //   })
  //   .catch((error) => {
  //     // The write failed...
  //   });
  // }
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const handleNumberPress = (number) => {
    setSelectedNumber(number);
  }
  

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 10, backgroundColor: "#E1EBEE", marginTop: 23, flexDirection: "row" }}>
          <TouchableOpacity
            onPress={pickImage}>
            <Text style={{ borderColor: "#2c2c6c", borderStyle: "dashed", borderWidth: 2, padding: "5%", marginLeft: 12, }}>
              <MaterialCommunityIcons name="camera-plus" size={65} color="#5D8AA8" />
            </Text>
          </TouchableOpacity>
          <View style={styles.ImaageText}>
            <Text style={{ color: "#800020" }}>Please add an Image</Text>
          </View>

        </View>


        <View>
          <View style={{ marginTop: 7 }}>
            <View style={styles.FormContainer}>
              <View style={styles.TextInput1}>
                <TextInput
                value={title}
                  editable
                  multiline
                  numberOfLines={2}
                  onChangeText={text => setTitle(text)}
                  placeholder='Title'
                  style={{ padding: 16 }}
                />
              </View>
              <View style={styles.TextInput2}>
                <TextInput
                value={Discription}
                  editable
                  multiline
                  numberOfLines={2}
                  onChangeText={dis => setDiscrioption(dis)}
                  placeholder='Discription'
                  style={{ padding: 16 }}
                />
              </View>

              <View style={{ paddingVertical: "3%" }}>
                <Text style={{ fontSize: 24, fontWeight: "bold", color: "#5D8AA8" }}>Quantity</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {numbers.map((number) => (
                  <TouchableOpacity
                    key={number}
                    onPress={() => handleNumberPress(number)}
                    style={[
                      styles.numberButton,
                      selectedNumber === number && styles.selectedNumberButton,
                    ]}
                  >
                    <Text
                      style={[
                        styles.numberText,
                        selectedNumber === number && styles.selectedNumberText,
                      ]}
                    >
                      {number}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <View style={styles.TextInput2}>
                <TextInput
                  editable
                  onChangeText={other => setOther(other)}
                  placeholder='Other'
                  style={{ padding: 13 }}
                />
              </View>

              <View style={styles.TextInput3}>
                <View style={{ paddingVertical: "1%" }}>
                  <Text style={{ marginTop: 12, fontSize: 20, fontWeight: "bold", color: "#5D8AA8" }}>Pick-Up times</Text>
                </View>
                <TextInput
                  editable
                  onChangeText={other => setOther(other)}
                  placeholder='e.g. Today from 3-5'
                  style={{ padding: 13 }}
                />
              </View>

            </View>
          </View>
          <TouchableOpacity style={styles.Submit} onPress={navigation.navigate('ShowPost')}>
            <Text style={styles.SubmitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      
      </ScrollView>
      <MapShow />











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
  ImaageText: {

    justifyContent: "center",
    marginLeft: "4%",
  },
  ImageSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center"
  },
  Submit: {

    width: "80%",
    borderRadius: 17,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: "9%",
    backgroundColor: "#4db5ff",
    elevation: 40,
  },
  TextInput1: {

    borderBottomWidth: 1,
  },
  TextInput2: {

    borderBottomWidth: 1,
  },
  TextInput3: {

    borderBottomWidth: 1,
  },
  FormContainer: {
    paddingHorizontal: 10,
    paddingVertical: 1,
    backgroundColor: '#E1EBEE',
  },
  numberButton: {
    padding: 10,
    margin: 3,
    width: 45,
    borderRadius: 15,
    justifyContent: "center",
    backgroundColor: '#fff',
  },
  selectedNumberButton: {
    backgroundColor: 'rgba(77,181,255,0.4)',
  },
  numberText: {
    fontSize: 18,
    color: '#444',
  },
  selectedNumberText: {
    color: '#fff',
  },

})
