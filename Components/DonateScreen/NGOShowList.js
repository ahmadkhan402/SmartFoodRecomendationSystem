import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { COLOURS } from "../../Database";
import { TouchableOpacity } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { auth, db } from "../../firebase";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from 'expo-location';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from '@expo/vector-icons';


const NGOShowList = ({ navigation }) => {
  const [coords, setcords] = useState("");
  const [NGOList, setNGOList] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  let isfocus = useIsFocused()

  useEffect(() => {
     // Get the user's current location
     const getLocationAsync = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }


      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    getLocationAsync();
    console.log(userLocation)
    const ShowNGOList = async () => {

const userId = auth.currentUser?.uid
      try {
        // Check if the document with the given userId already exists
        const userQuery = query(collection(db, 'NGO_Register'), where('id', '==', userId));
        const userQuerySnapshot = await getDocs(userQuery);
  
        if (!userQuerySnapshot.empty) {
          // Document with the same ID already exists
          setErrorMessage('User with this ID already exists.');
        } else {
      let arr = [];
      let cords = [];
      const querySnapshot = await getDocs(collection(db, "NGO_Register"));
      querySnapshot.forEach((doc) => {
        var data = doc.data();
  
        cords.push("id", doc.id, "=>", "data", doc.data().Coords);
        var id = doc.id;
        arr.push({ id, ...data });
      });
      setcords(cords);
      setNGOList(arr);
      //console.log(NGOList);
    
     // Reset error message on successful addition
     setErrorMessage(null);
    }
  } catch (error) {
    console.error('Error adding user:', error);
    setErrorMessage('Error adding user. Please try again.');
  }
  
}    

    ShowNGOList();

  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };
  const getNearbyNGOs = () => {
    if (!userLocation || !NGOList.length) return [];

    return NGOList.map((ngo) => {
      const { latitude, longitude } = ngo.Coords; 
  
      return {
        ...ngo,
        distance: calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          latitude,
          longitude
        ),
      };
    })
    .sort((a, b) => a.distance - b.distance);
  };
  const nearbyNGOs = getNearbyNGOs();


console.log(nearbyNGOs)
  const renderitem = ({ item }) => (
    <View style={styles.Card}>
     <LinearGradient
        colors={["#f8f8ff", "#f5fffa", "#afeeee"]}
        style={styles.Carditem}
      >
<View style={{justifyContent:"space-between" , flexDirection:"row",marginBottom:13}}> 
        <Text style={styles.text}>{item.ngoName}</Text>
        <TouchableOpacity
            style={styles.btnMap}
            onPress={() => {
              navigation.navigate("MapNgo", {
                id: item.id,
                Coords: item.Coords,
                NGOList,
              });
            }}
          >
          <Entypo name="location" size={30} color="#4c669f" />
          </TouchableOpacity>
          </View>
        <Text style={styles.des}> {item.locationData}</Text>
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
        <Text style={styles.data}> {item.email}</Text>
        <Text style={styles.data}> {item.phoneNumber}</Text>
        </View>
        <Text>Distance: {item.distance.toFixed(2)} km</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate("DonateFoodToNGO", {data : item})}>
            <Text style={styles.Donate}>Donate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}  onPress={()=> navigation.navigate("RequestNGO", {data : item})}>
            <Text style={styles.Donate}>Request</Text>
          </TouchableOpacity>
          
        </View>
        </LinearGradient>
    </View>
  );

  return (
    <LinearGradient
      colors={["#4db5ff", "#4c669f", "#2c2c6c"]}
      style={styles.container}
    >
      <View>
        <TouchableOpacity style={styles.BtnReg2}>
          <Text
            style={{
              color: COLOURS.white,

              fontSize: 20,
              fontWeight: "200",
            }}
          > List of Register NGOs</Text>
        </TouchableOpacity>
        <View style={{justifyContent:"flex-end", alignItems:"flex-end" , marginBottom:15}}>
        <TouchableOpacity style={styles.btnN} onPress={()=> navigation.navigate("ShowUserRegNgos")}>
            <Text style={{ fontSize:14}}>Your Registered NGOs</Text>
          </TouchableOpacity>
        </View>
      <View>

        <Text>Your location: {userLocation && `${userLocation.latitude}, ${userLocation.longitude}`}</Text>
      <Text>NGOs near you:</Text>
        </View>
        <FlatList
          data={nearbyNGOs}
          renderItem={renderitem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </LinearGradient>
  );
};

export default NGOShowList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:COLOURS.backgroundDarkBlue
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 30,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: "#4db5ff",
    elevation: 15,
  },

btnN: {
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal:10,
  width: "50%",
  height: 30,
  borderRadius: 15,
  marginVertical:10,
  backgroundColor: "#f8f8ff",
  elevation: 15,
},
  BtnReg: {
    paddingHorizontal: 12,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
    backgroundColor: "#4db5ff",
    elevation: 40,
  },
  BtnReg2: {
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop:70,
    marginBottom:30,
    backgroundColor: "#4db5ff",
    elevation: 40,
    marginHorizontal: 10,
  },
  Card: {
    backgroundColor: "transparent",
    padding: 10,
    justifyContent: "center",
  },
  Carditem: {
    backgroundColor: COLOURS.backgroundMedium,
    padding: 23,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 700,
  },
  des: {
    color: COLOURS.blue,
  },
  data:{
color:COLOURS.backgroundLiteBlue,
fontSize:11
  },
  Donate: {
    color: COLOURS.backgroundLight,
  },
  btnMap:{ 
    alignItems: "center",
      justifyContent: "center",
      elevation: 14
      
  
  }
});
