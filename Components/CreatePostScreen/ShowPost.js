import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { ref, list, listAll, getDownloadURL } from "firebase/storage";
import { auth, storage, db } from "../../firebase";
import { TextInput } from "react-native-gesture-handler";
import { Timestamp, collection, getDocs } from "firebase/firestore";
import { color } from "react-native-reanimated";
import ChatOption from "./ChatOption";
import { FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from "galio-framework";
import { LinearGradient } from "expo-linear-gradient";
import { COLOURS } from "../../Database";
import { Entypo } from "@expo/vector-icons";

import * as Location from "expo-location";
import AnimatedLoader from "react-native-animated-loader";
let id = "";
const ShowPost = ({ navigation }) => {
  const [Data, setData] = useState([]);
  const [ID, setid] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchImages = async () => {
    
      id = await AsyncStorage.getItem("onLogin");

        // Get user's current location
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Permission to access location was denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const userLatitude = location.coords.latitude;
        const userLongitude = location.coords.longitude;

        // Fetch posts from the Firestore collection "Posts"
        const querySnapshot = await getDocs(collection(db, "Posts"));

        // Filter and set nearby posts
        const nearbyPosts = [];
        querySnapshot.forEach((doc) => {
          const post = doc.data();

          // id = doc.id
          console.log("fefef", post);
          const postLatitude = post.PickUpPoint.coords.latitude; // Replace with the actual latitude property of your post
          const postLongitude = post.PickUpPoint.coords.longitude; // Replace with the actual longitude property of your post

          // Calculate distance between user and post
          const distance = calculateDistance(
            userLatitude,
            userLongitude,
            postLatitude,
            postLongitude
          );

          // Consider posts within a certain distance range, e.g., 10 kilometers
          if (distance) {
            console.log("dis");
            nearbyPosts.push({ ...post, distance });
          }
        });
        console.log("cecnmeklnckle", nearbyPosts);
        // Update state with nearby posts
        setData(nearbyPosts);
     
    };

    if (isFocused) {
      fetchImages();
    }
  }, [isFocused]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
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

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <View style={styles.textContainer} key={index}>
        <Text style={styles.PostUser}>
          <Text>POSTED BY:</Text> {item.DonorName}
        </Text>

        <Text style={styles.txt}>
          Want to Donate: <Text style={styles.infoText}>{item.Title}</Text>
        </Text>
        <Text style={styles.txt}>
          Email: <Text style={styles.infoText}>{item.Email}</Text>
        </Text>
        <Text style={styles.txt}>
          Des: <Text style={styles.infoText}>{item.Description}</Text>
        </Text>
        <Text style={styles.txt}>
          Time: <Text style={styles.infoText}>{item.Time}</Text>
        </Text>
        <Text style={styles.txt}>
          Quality of Meal:{" "}
          <Text style={styles.infoText}>{item.SelectedNumber}</Text>
        </Text>

        <Text style={styles.PickUpPoint}>
          Distance from you: {item.distance.toFixed(2)} Km
        </Text>
        <View>
          <TouchableOpacity
            style={styles.btnMap}
            onPress={() => {
              navigation.navigate("MapDonors", {
                id: item.id,
                Coords: item.PickUpPoint.coords,
                Data,
              });
            }}
          >
            <Text style={{ color: "#fff" }}>CLICK TO LOCATE USER</Text>
            <Entypo name="location" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <Image source={{ uri: item.ImageUrl }} style={styles.Image} />
      <View style={{ position: "absolute", Top: 0, marginTop: 5, right: 20 }}>
        <View
          style={{
            elevation: 40,
            borderColor: "#fff",
            borderWidth: 1,
            padding: 8,
            borderRadius: 20,
            backgroundColor: "#3457D5",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ChatSceens", { data: item, id: id })
            }
          >
            <Text>
              <Ionicons
                name="md-chatbox-ellipses-outline"
                size={25}
                color="#FFF"
              />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={["#4db5ff", "#4c669f", "#2c2c6c"]}
      style={styles.container}
    >

      {Data.length === 0 ? (
        <View style={{flex:1}}>
        {/* <TouchableOpacity style={{justifyContent:"center",marginTop:50}} onPress={()=>{navigation.goBack()}}>
          <Text>GO back</Text>
        </TouchableOpacity> */}
        <AnimatedLoader
      visible={true}
      // overlayColor="rgba(255,255,255,0.75)"
      animationStyle={styles.lottie}
      speed={1}>
       <Text style={{ color: "#fff" }}>Searching for nearby posts found.</Text>
    </AnimatedLoader>
      
    </View>
         ) : (
          <View style={{flex:1,justifyContent:"center",marginTop:30}}>
          <Text style={styles.subtitle2}>Personal Donation Post</Text>
        <FlatList
          data={Data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.scrollContainer}
        />
        </View>
      )}

      <View style={{ padding: 35, position: "absolute", bottom: 0, right: 0 }}>
        <TouchableOpacity onPress={() => navigation.navigate("CreatePost")}>
          <Text>
            <AntDesign name="pluscircle" size={70} color="#3457D5" />
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default ShowPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  lottie: {
    width: 100,
    height: 100,
  },
  scrollContainer: {
    padding: 10,
  },
  textContainer: {
    padding: 10,
    marginLeft: 2,
  },
  subtitle2: {
    marginVertical: 16,
    textAlign: "center",
    fontSize: 23,
    backgroundColor: COLOURS.backgroundLiteBlue,
    fontWeight: "bold",
    color: "#fff",
    paddingVertical: 8,
    borderRadius: 8,
    paddingHorizontal:4

  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  btnMap: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLOURS.backgroundDarkBlue,
    padding: 10,
    alignItems: "center",
    borderRadius:10
  },
  Image: {
    height: 200,
    width: "100%",
  },
  textTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },
  PickUpPoint: {
    backgroundColor: "#F0F8FF",
    borderRadius: 5,
    padding: 10,
    fontWeight: "500",
  },
  PostUser: {
    width: "60%",
    backgroundColor: "#eee",
    fontSize: 12,
    fontWeight: "900",
    padding: 5,
    color: "#2c2c6c",
  },
  txt: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  infoText: {
    fontWeight: "bold",
    color: COLOURS.backgroundDarkBlue,
  },
});
