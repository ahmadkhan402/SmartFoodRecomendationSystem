import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { COLOURS } from "../../Database";
import { TouchableOpacity } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { auth, db } from "../../firebase";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from 'expo-location';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; 

const NGOShowList = ({ navigation }) => {
  const [coords, setcords] = useState("");
  const [NGOList, setNGOList] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userInterest, setUserInterest] = useState(""); // Add userInterest state
  const [available, setavailable] = useState(false);
  useEffect(() => {
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

    const ShowNGOList = async () => {
      const userId = auth.currentUser?.uid;
      try {
        let arr = [];
        let cords = [];
        const querySnapshot = await getDocs(collection(db, "NGO_Register"));
        querySnapshot.forEach((doc) => {
          var data = doc.data();
          cords.push("id", doc.id, "=>", "data", doc.data().Coords);
          var id = doc.id;
          arr.push({ id, ...data });
        });
    

        // Filter NGOs based on user interest (food or fruit)
        const filteredNGOs = arr.filter((ngo) => {
          // Check if the interests property exists and if it includes the user's interest
          return ngo.interests && ngo.interests.includes(userInterest);
        });
    
        setcords(cords);
        setNGOList(filteredNGOs);
        setErrorMessage(null);
      } catch (error) {
        console.error('Error fetching NGOs:', error);
        setErrorMessage('Error fetching NGOs. Please try again.');
      }
    };
    

    getLocationAsync();
    ShowNGOList();
  }, [userInterest]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const getNearbyNGOs = () => {
    if (!userLocation || !NGOList.length) return [];
  
    const nearbyNGOsWithFood = [];
    const nearbyNGOsWithoutFood = [];
  
    for (const ngo of NGOList) {
      const { latitude, longitude } = ngo.Coords;
  
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        latitude,
        longitude
      );
  
      const ngoWithDistance = {
        ...ngo,
        distance,
      };
  
      // Check if the NGO has food availability
      const hasFood = ngo.foodAvailability;
      
  
      if (hasFood) {
        nearbyNGOsWithFood.push(ngoWithDistance);
      } else {
        nearbyNGOsWithoutFood.push(ngoWithDistance);
      }
    }
  
    // Sort NGOs with food by distance in ascending order
    const sortedNGOSWithFood = nearbyNGOsWithFood.sort(
      (a, b) => a.distance - b.distance
    );
  
    // Combine NGOs with food and without food, placing NGOs with food on top
    const combinedNGOs = [...sortedNGOSWithFood, ...nearbyNGOsWithoutFood];
  
    return combinedNGOs;
  };
  
  const nearbyNGOs = getNearbyNGOs();

  const renderitem = ({ item }) => (
    <View style={styles.Card}>
      <LinearGradient
        colors={["#f8f8ff", "#f5fffa", "#afeeee"]}
        style={styles.Carditem}
      >
      <View style={{flexDirection:"row",justifyContent:"space-between", marginBottom:10}}>
      {(item.donateFood == 0) ?(
          <Text style={{ fontSize: 10, color: "red" }}>Donation Ranked:  {item.donateFood}</Text>
        ) : (
         
      <Text style={{fontSize:10,color:"green"}}>Donation Ranked:  {item.donateFood}</Text>
        )}
     
      {item.foodAvailability ? (
          <Text style={{ fontSize: 10, color: "green" }}>Nutriment Available</Text>
        ) : (
          <Text style={{ fontSize: 10, color: "red" }}>Not Available</Text>
        )}
     
      </View>
        <View style={{ justifyContent: "space-between", flexDirection: "row", marginBottom: 13 }}>
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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.data}> {item.email}</Text>
          <Text style={styles.data}> {item.phoneNumber}</Text>
        </View>
        <Text>Distance: {item.distance.toFixed(2)} km</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("DonateFoodToNGO", { data: item })}>
            <Text style={styles.Donate}>Donate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("RequestNGO", { data: item })}>
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
        <View style={{ justifyContent: "flex-end", alignItems: "flex-end", marginBottom: 15 }}>
          <TouchableOpacity style={styles.btnN} onPress={() => navigation.navigate("ShowUserRegNgos")}>
            <Text style={{ fontSize: 14 }}>Registered NGOs</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>Your location: {userLocation && `${userLocation.latitude}, ${userLocation.longitude}`}</Text>
          <Text>NGOs near you:</Text>
        </View>
        {/* Add a dropdown or any UI to let the user select their interest */}
        <Picker
          selectedValue={userInterest}
          onValueChange={(itemValue, itemIndex) => setUserInterest(itemValue)}
          style={{ height: 50, width: 300, color: COLOURS.white }}
        >
          <Picker.Item label="Select Interest" value="" />
          <Picker.Item label="Food" value="Food" />
          <Picker.Item label="Fruit" value="Fruit" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
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
    paddingHorizontal:10,
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
    width:"100%"
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