import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { collection, addDoc, doc, getDoc, setDoc } from 'firebase/firestore';

import { useRoute } from '@react-navigation/native';
import { db, auth } from '../../../../firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import { COLOURS } from '../../../../Database';
import { Picker } from '@react-native-picker/picker';

const RequestNgO = () => {
  const [location, setLocation] = useState('');
  const [requestStatus, setRequestStatus] = useState(null);
  const [numb, setnumb] = useState('');setname
  const [type, settype] = useState('');
  const [name, setname] = useState('');

  const route = useRoute();
  const ngoId = route.params.data.id;

  useEffect(() => {
    const checkRequestStatus = async () => {
      try {
        const userRequestDocRef = doc(db, 'NGORequestData', ngoId, 'requests', auth.currentUser.uid);
        const userRequestDoc = await getDoc(userRequestDocRef);

        if (userRequestDoc.exists()) {
          const { status } = userRequestDoc.data();
          setRequestStatus(status);
        } else {
          setRequestStatus(null);
        }
      } catch (error) {
        console.error('Error checking request status:', error);
      }
    };

    checkRequestStatus();
  }, [ngoId]);

  const handleRequest = async () => {
    try {
      const requestRef = collection(doc(db, 'NGORequestData', ngoId), 'requests');
      const userRequestDocRef = doc(requestRef, auth.currentUser.uid);

      if (!requestStatus || requestStatus === 'accepted' || requestStatus === 'rejected') {
        // If no previous request or previous request is accepted/rejected, allow a new request
        await setDoc(userRequestDocRef, {
          userId: auth.currentUser.uid,
          name,
          location,
          type,
          numb,
          status: 'pending',
        });

        Alert.alert('Request Sent', 'Your request has been sent to the NGO.');
        setRequestStatus('pending');
      } else {
        Alert.alert('Previous Request Pending', 'Your previous request is still pending.');
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  return (
    <LinearGradient
      colors={["#4db5ff", "#4c669f", "#2c2c6c"]}
      style={styles.container}
    >

      <Text style={styles.BtnReg2}>Request Food from NGO</Text>
      {requestStatus && <Text style={styles.BtnReg1}>Your previous request status: <Text style={[ { color: requestStatus === 'accepted' ? 'green' : requestStatus === 'rejected' ? 'red' : 'black' }]}> {requestStatus}</Text></Text>}
     {requestStatus == "pending" ? (
        <Text style={{color:"#fff",textAlign:"center", fontSize:15,paddingVertical:13}}>Your status is pending! {"\n"} Please Wait for NGO response</Text>
     ): (
      <View style={styles.inputViewNew}>
      <Text style={styles.Name}>Your Name:</Text>
      <View style={styles.inputView}>
      <TextInput  style={styles.TextInput}
        placeholder="Enter your name"
        onChangeText={(text) => setname(text)}
      
      />
        </View>
      <Text style={styles.Name}>Your Number:</Text>
      <View style={styles.inputView}>
      <TextInput  style={styles.TextInput}
        placeholder="Enter phone Number"
        onChangeText={(text) => setnumb(text)}
        keyboardType="numeric"
      />
        </View>
        <Text style={styles.Name}>Type of Donation:</Text>
      
      <View style={styles.inputView}>
        <Picker
          selectedValue={type}
          onValueChange={(itemValue) => settype(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Food" value="Food" />
          <Picker.Item label="Fruit" value="Fruit" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      
        </View>
        <Text style={styles.Name}>Type Your Location:</Text>
      <View style={styles.inputView}>
      <TextInput
        placeholder="Your Location"
        value={location}
        onChangeText={(text) => setLocation(text)}
      />
        </View>
    <View style={{alignItems:"center"}}>
      <TouchableOpacity style={styles.btn} onPress={handleRequest} >
      <Text style={{color:"#fff", fontSize:15}}>Request Food</Text>
      </TouchableOpacity>
      </View>
      </View>
      )}
    </LinearGradient>
  );
};

export default RequestNgO;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:COLOURS.backgroundDarkBlue
  },
  picker: {
    height: 40,
    color: COLOURS.backgroundDarkBlue,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: 30,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: "#4db5ff",
    elevation: 15,
  },
  BtnReg2: {
    marginVertical:20,
    
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    backgroundColor: "#4db5ff",
    elevation: 40,
  },
  BtnReg1: {
    marginVertical:16,
    borderRadius: 5,
    padding: 10,
    paddingVertical:16,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    backgroundColor: "#fff",
    elevation: 40,
  },
  inputView: {
    backgroundColor: COLOURS.backgroundLight,
    borderColor: "#4db5ff",
    borderWidth: 1,
    borderRadius: 10,
    width: 230,
justifyContent:"center",
    marginBottom: 20,
    padding: 10,
  },
  TextInput: {
    color: COLOURS.backgroundDarkBlue,
    textAlign: "left",
    width: "80%",
  },
  Name: {
    textAlign: "left",
    paddingVertical: 12,
    fontWeight: "300",
    color: COLOURS.backgroundDarkBlue,
  },
  inputViewNew: {
    backgroundColor: COLOURS.backgroundLight,
    borderColor: "#4db5ff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 25,
  },
});