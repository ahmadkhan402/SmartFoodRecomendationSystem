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

let id = "";
const ShowPost = ({ navigation }) => {
  const [Data, setData] = useState([]);
  const [ID, setid] = useState([]);
  console.log("the data is ", Data);

  // console.log('the description is ', Data.description)
  const [urls, seturl] = useState([]);
  // console.log("here is the title", Data.title)

  const isFocused = useIsFocused();
  //setData(newArray)
  useEffect(() => {
    async function fetchImages() {
      id = await AsyncStorage.getItem("onLogin");
      const querySnapshot = await getDocs(collection(db, "Posts"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        Data.length = 0;
        setid(id);
        setData((Data) => [...Data, data]);
      });
    }
    if (isFocused) {
      fetchImages();
    }
  }, [isFocused]);

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
          Pick-Up Point: {item.PickUpPoint}
        </Text>
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
      <FlatList
        data={Data} // Assuming Data is an array of posts
        keyExtractor={(item, index) => index.toString()} // Use index as the key
        renderItem={renderItem}
        contentContainerStyle={styles.scrollContainer}
      />

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
  scrollContainer: {
    padding: 10,
  },
  textContainer: {
    padding: 10,
    marginLeft: 2,
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
    color: '#555', 
    marginTop: 5,
  },
  infoText: {

    fontWeight: 'bold',
    color: COLOURS.backgroundDarkBlue
  },
});
