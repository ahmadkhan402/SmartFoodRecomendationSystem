import React, { useState, useEffect } from 'react';
import { View, Text, TextInput , Button, StyleSheet ,ScrollView } from 'react-native';
import * as Location from 'expo-location';
import { COLOURS } from '../../Database';
import { Alert } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';


const NGOForm = ({  navigation}) => {
  const [ngoName, setNgoName] = useState('');
  const [numMembers, setNumMembers] = useState('');
  const [numPeopleServed, setNumPeopleServed] = useState('');
  const [locationPermission, setLocationPermission] = useState(false);
  const [locationData, setLocationData] = useState("Getting yours Location...");
  const [Coords, setCoords] = useState("");
  const [Disable, setDisable] = useState();
  const [email, setemail] = useState();
  const [phoneNumber, setphoneNumber] = useState();
  useEffect(() => {
    if (ngoName && numMembers && locationData && numPeopleServed) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [ngoName, numMembers, locationData, numPeopleServed]);
    const getCurrentLocation = async () => {
      requestLocationPermission();
    try {
        const { coords } = await Location.getCurrentPositionAsync({});
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}`);
        const data = await response.json();
        return { coords, address: data.display_name };
      } catch (error) {
        Alert.alert('Error fetching location', error.message);
        return null;
      }
    }
  const requestLocationPermission = async () => {
    
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLocationPermission(true);
        console.log('Location permission granted');
      } else {
        setLocationPermission(false);
        console.log('Location permission denied');
      }
    } catch (error) {
      console.warn(error);
    }
  };
    
  

  const handleNGOReg = async() => {
    console.log("runnnn")
    const userRef = doc(db, "NGO_Register", auth.currentUser.uid);
    await setDoc(userRef, {
      ngoName,
      email,
      phoneNumber,
      numMembers,
      numPeopleServed,
      locationData,
    Coords

    });
    Alert.alert("Data Successfully Store in Firebase/Firestore");
   console.log("data saved")
  navigation.navigate("NGOLogin")
   
  };
  

  useEffect(() => {
   
    (async () => {
        const location = await getCurrentLocation();
        console.log(location)
        setLocationData(location.address);
       
        setCoords( location.coords)
      })(); 
     
    // Request location permission when the component mounts
    
  }, []);
  
  return (
    <View style={styles.container}>
  
    <View style={{paddingVertical:50}}>
   <Text style={{color:COLOURS.white , fontWeight:"300", fontSize:22}}>Fill the Required Field</Text>
   </View>
   <ScrollView style={{flex:1 }} contentContainerStyle={styles.MinCont}>
   
   <Text style={{color:COLOURS.backgroundDarkBlue ,backgroundColor:COLOURS.backgroundMedium,borderRadius:20,marginVertical:20, fontWeight:"700", fontSize:26,textAlign:"center"}}>NGO Data</Text>
      <Text style={styles.Name}>NGO Name:</Text>
      <View style={styles.inputView}>
      <TextInput  style={styles.TextInput}
        placeholder="Enter NGO Name"
        value={ngoName}
        onChangeText={(text) => setNgoName(text)}
      /> 
       </View>
       <Text style={styles.Name}>Phone Number:</Text>
       <View style={styles.inputView}>
      <TextInput  style={styles.TextInput}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setphoneNumber(text)}
      />
      </View>
      <Text style={styles.Name}>Email:</Text>
      <View style={styles.inputView}>
      <TextInput  style={styles.TextInput}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setemail(text)}
      />
      </View>
      <Text style={styles.Name}>Number of Members:</Text>
      <View style={styles.inputView}>
      <TextInput  style={styles.TextInput}
        placeholder="Enter Number of Members"
        onChangeText={(text) => setNumMembers(text)}
        keyboardType="numeric"
      />  
      </View>
      <Text style={styles.Name}>People Served per Month:</Text>
      <View style={styles.inputView}>
      <TextInput  style={styles.TextInput}
        placeholder="Enter Number of People Served per Month"
        onChangeText={(text) => setNumPeopleServed(text)}
        keyboardType="numeric"
      />
        </View>
      <Text style={styles.Name}>Current Location:</Text>
      <View style={styles.inputView}>
      <TextInput  style={styles.TextInput}
        placeholder="Location will be auto-filled here"
        value={locationData}
        editable={false}
      />
      </View>
   
    <TouchableOpacity disabled={Disable} style={[Disable ? styles.BtnRegDisable : styles.BtnReg]} onPress={handleNGOReg}>
      <Text>Register NGO</Text>
      </TouchableOpacity>
   
    
   
      </ScrollView>
    </View>
  );
};


export default NGOForm;
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:COLOURS.backgroundDarkBlue
        
      },
      BtnReg : {
        marginTop:24,
        paddingHorizontal:25,
         borderRadius: 25,
         height: 50,
         alignItems: "center",
         justifyContent: "center",
         backgroundColor: "#4db5ff",
         elevation: 40,
         marginVertical:20
       },
      MinCont:{
       
        justifyContent:"center",
        marginHorizontal:25,
        paddingHorizontal:20,
        backgroundColor:COLOURS.backgroundLight,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
      },
      inputView: {
        backgroundColor: COLOURS.backgroundLight,
        borderColor: "#4db5ff",
        borderWidth: 1,
        borderRadius: 30,
        height: 45,
        marginBottom: 20,
        paddingLeft:16
       
      },
      TextInput: {
        color:COLOURS.backgroundDarkBlue,
        textAlign:"left",
        flex: 1,
        padding: 10,
       
      },
      Name:{
        paddingVertical:12,
        fontWeight:"300",
        color:COLOURS.backgroundDarkBlue,
      },
      inputViewNew:{
        backgroundColor: COLOURS.backgroundLight,
        borderColor: "#4db5ff",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: "center",
      },
      BtnRegDisable:{
        opacity:0.3,
        marginTop:24,
        paddingHorizontal:25,
         borderRadius: 25,
         height: 50,
         alignItems: "center",
         justifyContent: "center",
         backgroundColor: "#4db5ff",
         elevation: 40,
         marginVertical:20
      }
})

