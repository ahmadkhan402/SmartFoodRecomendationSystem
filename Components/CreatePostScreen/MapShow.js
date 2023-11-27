import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet,TouchableOpacity, Text, View, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { COLOURS } from '../../Database';


const getCurrentLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission to access location was denied');
    return null;
  }
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

const MapViewWithMarker = ({ coords }) => {
  return (
    <MapView style={styles.map} initialRegion={{
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}>
      <Marker coordinate={coords} title="You are here" />
      
    </MapView>
  );
};

const MapShow = (props) => {
  const [locationData, setLocationData] = useState(null);
const [ PickUpPoint, setPicupPoint] = useState('')

  useEffect(() => {
    (async () => {
      const location = await getCurrentLocation();
      props.getPointData(location.address)
      
      setLocationData(location);
    })();
  }, []);

  return locationData ? (
    <View style={styles.container}>
    <View style={styles.btn}>
   <TouchableOpacity  style={{
    padding:3,
        justifyContent: "center",
        backgroundColor: COLOURS.backgroundLight, borderRadius: 10,
        borderWidth: 1,  marginHorizontal: "25%",
        alignItems: "center"
      }} onPress={()=> alert('PickupPoint has been Set successfully')} >
      <Text style={{ fontSize: 17, color: "#2c2c6c", fontWeight: "500" }}>Set the Pic Point</Text>
      </TouchableOpacity>
      </View>
      <MapViewWithMarker coords={locationData.coords} /> 
      
    </View>
  ) : (
    <Text>Loading location...</Text>
  );
};

const styles = StyleSheet.create({
btn:{
  marginVertical:5,
},
  container: {
    
    flex: 0.4,
   backgroundColor:COLOURS.black,
   borderRadius:30
  
  },
  text: {
    padding: 10,
    backgroundColor: '#eee',
 
  },
  map: {
    height:"100%",
  
   
  },
});

export default MapShow;