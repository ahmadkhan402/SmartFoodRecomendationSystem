import React, { useState, useEffect } from 'react';
import { View, Text, TextInput , Button, StyleSheet ,ScrollView } from 'react-native';
import * as Location from 'expo-location';
import { COLOURS } from '../../Database';
import { Alert } from 'react-native';
import { TouchableOpacity } from 'react-native';


const NGOForm = () => {
  const [ngoName, setNgoName] = useState('');
  const [numMembers, setNumMembers] = useState('');
  const [numPeopleServed, setNumPeopleServed] = useState('');
  const [locationPermission, setLocationPermission] = useState(false);
  const [locationData, setLocationData] = useState("Getting yours Location...");
  const [Coords, setCoords] = useState("");


  

    const getCurrentLocation = async () => {
    try {
        const { coords } = await Location.getCurrentPositionAsync({});
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}`);
        const data = await response.json();
        return { coords, address: data.display_name };
      } catch (error) {
        Alert.alert('Error fetching location', error.message);
        return null;
      }
  };
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
const getLocation = async()=>{
   
        const location = await getCurrentLocation();
       
        console.log(location.address)
        setLocationData(location.address);
}
  

  const handleLogin = () => {
    // Handle NGO login here, you can send the data to a server or store it locally
    console.log('NGO Name:', ngoName);
    console.log('Number of Members:', numMembers);
    console.log('People Served per Month:', numPeopleServed);
    console.log('Current Location:', locationData);
  };

  useEffect(() => {
    requestLocationPermission();
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
  
   <View style={styles.MinCont}>
   <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.Name}>NGO Name:</Text>
      <View style={styles.inputView}>
      <TextInput  style={styles.TextInput}
        placeholder="Enter NGO Name"
        value={ngoName}
        onChangeText={(text) => setNgoName(text)}
      /> 
       </View>
      <Text style={styles.Name}>Number of Members:</Text>
      <View style={styles.inputView}>
      <TextInput  style={styles.TextInput}
        placeholder="Enter Number of Members"
        value={numMembers}
        onChangeText={(text) => setNumMembers(text)}
        keyboardType="numeric"
      />  
      </View>
      <Text style={styles.Name}>People Served per Month:</Text>
      <View style={styles.inputView}>
      <TextInput  style={styles.TextInput}
        placeholder="Enter Number of People Served per Month"
        value={numPeopleServed}
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

     

      <Text style={styles.Name}>Current Coords:</Text>
      <View style={styles.inputViewNew}>
      <Text style={{fontSize:14, paddingVertical:12, color:COLOURS.backgroundDarkBlue}}>
        "accuracy": {Coords.accuracy}
        {'\n'}
        "altitude": {Coords.accuracy}
        {'\n'}
        "altitudeAccuracy": {Coords.accuracy}
        {'\n'}
        "latitude": {Coords.accuracy}
        {'\n'}
        "longitude": {Coords.accuracy}
        </Text>
    </View>
    </ScrollView>
    <TouchableOpacity style={styles.BtnReg}>
      <Text>Register NGO</Text>
      </TouchableOpacity>
      </View>
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
        paddingHorizontal:25,
         borderRadius: 25,
         height: 50,
         alignItems: "center",
         justifyContent: "center",
         backgroundColor: "#4db5ff",
         elevation: 40,
       },
      MinCont:{
        flex:1,
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
        alignItems: "center",
       
      },
      TextInput: {
        color:COLOURS.backgroundDarkBlue,
        
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
      }
})