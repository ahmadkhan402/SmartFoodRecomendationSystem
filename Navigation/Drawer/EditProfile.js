import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { AntDesign } from '@expo/vector-icons';
import { auth, db, storage } from '../../firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { COLOURS } from '../../Database';

const EditProfile = ({ navigation }) => {
  const [Display_Name, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [imageX, setImage] = useState('');
  const [BlobImage, setBlobImage] = useState('');

  useEffect(() => {
    // Initialize Firebase
    // Request permission for image picker
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result.assets[0].uri);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      setBlobImage(blob);
    }
  };

  const saveDataToFirebase = async () => {
    const metadata = {
      contentType: 'image/jpeg',
    };

    const storageRef = ref(storage, 'Profile_images/' + Date.now());
    const uploadTask = uploadBytesResumable(storageRef, BlobImage, metadata);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
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
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('File available at', downloadURL);
          setdatatofirbase(Display_Name, phoneNumber, downloadURL);
        } catch (error) {
          console.error('Error getting download URL:', error);
          Alert.alert('Error', 'Failed to get download URL. Please try again.');
        }
      }
    );
  };

  const setdatatofirbase = async (Display_Name, phoneNumber, downloadURL) => {
    const ref  = doc(db, 'users', auth.currentUser.uid)
    await setDoc(ref,
       { Display_Name, phoneNumber, ImageUrl: downloadURL , Id:auth.currentUser.uid,email: auth.currentUser.email });
    Alert.alert('Data saved successfully');
    navigation.navigate('Profile');
  };

  return (
    <LinearGradient colors={['#4db5ff', '#4c669f', '#2c2c6c']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <View>
          {imageX ? (
            <Image source={{ uri: imageX }} style={{ width: 200, height: 200, borderRadius: 100 }} />
          ) : (
            <View>
              <Image
                source={{ uri: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png' }}
                style={{ width: 200, height: 200, borderRadius: 100 }}
              />
              <TouchableOpacity onPress={pickImage} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.CardText}> Select Image</Text>
                <AntDesign name="pluscircle" size={40} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Display Name"
          placeholderTextColor={'#fff'}
          value={Display_Name}
          onChangeText={(text) => setDisplayName(text)}
          style={styles.TextInput}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Phone Number"
          placeholderTextColor={'#fff'}
          style={styles.TextInput}
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={saveDataToFirebase}>
        <Text style={{ color: '#fff', fontSize: 20 }}>Save</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  CardText: {
    paddingVertical: 12,
    color: '#fff',
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: '700',
  },
  TextInput: {
    fontSize: 17,
    width: '100%',
    color: '#fff',
    padding: 2,
  },
  inputView: {
    marginTop: '10%',
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderBottomWidth: 1,
    textAlign: 'center',
    borderStyle: 'solid',
    width: '70%',
    height: '6%',
    textAlign: 'left',
  },
  loginBtn: {
    marginTop: '15%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOURS.backgroundDarkBlue,
    elevation: 40,
    paddingHorizontal: '30%',
  },
});

export default EditProfile;
