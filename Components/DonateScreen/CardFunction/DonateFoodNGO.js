import React, { useState, useEffect } from "react";
import {
  Button,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  getDatabase,
  child,
  get,
  set,
  database,
  push,
} from "firebase/database";
import { Entypo } from "@expo/vector-icons";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useNavigation, useRoute } from "@react-navigation/native";
import { db, auth, storage } from "../../../firebase";
import { LinearGradient } from "expo-linear-gradient";
let ngoID = ""
let ngoName = ""
export default function NgoFoodDonation() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [blobImage, setblob] = useState(null);
  const [phoneNumber, setphoneNumber] = useState("");
  const [title, setTitle] = useState("");
  const [productdiscription, setnamcrioption] = useState("");
  const [selectedNumber, setSelectedNumber] = useState();
  const [PickUpPoint, setPicupPoint] = useState("");
  const [Other, setOther] = useState("");
  const [Time, settime] = useState("");
  const [DonorName, setDonorName] = useState("");
  const [Email, setEmail] = useState("");
  const [locationPermission, setLocationPermission] = useState(false);
  const [locationData, setLocationData] = useState("Getting yours Location...");
  const [Disable, setDisable] =useState(true)
  // const [ngoName, setngoName] = useState("");
  // const [ngoID, setNgoID] = useState([]);
  const [ngodocID, setNgodocID] = useState([]);


  const x = image && productdiscription && Time && locationData 





  const route = useRoute()
  ngoName = route.params.data.ngoName
  // setngoName(data)
   ngoID = route.params.data.id
// console.log("this is ngo",data)
  const getCurrentLocation = async () => { 
    
  
    requestLocationPermission();
    try {
      const { coords } = await Location.getCurrentPositionAsync({});
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}`
      );
      const data = await response.json();
      return { coords, address: data.display_name };
    } catch (error) {
      Alert.alert("Error fetching location", error.message);
      return null;
    }
  };
  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setLocationPermission(true);
        console.log("Location permission granted");
      } else {
        setLocationPermission(false);
        console.log("Location permission denied");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    (async () => {
      const location = await getCurrentLocation();
      console.log(location);
      setLocationData(location.address);

    })();

    // Request location permission when the component mounts
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // We can  specify whether we need only Images or Videos
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1, // 0 means compress for small size, 1 means  compress for maximum quality
    });

    console.log(result.assets[0].uri);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      setblob(blob);
    }
  };
  const uploadImage = async () => {
    const metadata = {
      contentType: "image/jpeg",
    };
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "NGODonationPosts/" + Date.now());
    const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        alert("Upload is " + progress + "% done");

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          SetDataToFireStore(
            ngoID,
            title,
            productdiscription,
            downloadURL,
            selectedNumber,
            Other,
            Time,
            locationData
          );
        }, []);
        alert("Post is Uploaded");
        navigation.navigate("DonationDone");
      }
    );
  };


 
  const SetDataToFireStore = async (
    ngoID,
    title,
    productdiscription,
    downloadURL,
    selectedNumber,
    Other,
    Time,
    PickUpPoint
  ) => {
    try {
      const ngoDocRef = doc(db, 'NGODonationPosts', ngoID);
    await setDoc(ngoDocRef, { name: ngoName }, { merge: true });
     
    //   setNgodocID(ngoDocRef.id)
       await addDoc(collection(db, 'NGODonationPosts', ngoID, 'donations'), {

        DonorName: DonorName,
        Email: Email,
        PhoneNumber: phoneNumber,
        Title: title,
        Description: productdiscription,
        ImageUrl: downloadURL,
        SelectedNumber: selectedNumber,
        other: Other,
        Time: Time,
        PickUpPoint: locationData,
        Id: auth.currentUser.uid,
      });

      console.log("Document written with ID: ", ngoDocRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const handleNumberPress = (number) => {
    setSelectedNumber(number);
  };

 
  return (
    <LinearGradient
      colors={["#4db5ff", "#4c669f", "#2c2c6c"]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{ marginHorizontal: 20 }}>
        <View style={styles.FormContainer}>
          <View
            style={{
              padding: 10,
              backgroundColor: "#E1EBEE",
              marginTop: 23,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity onPress={pickImage}>
              <Text
                style={{
                  borderColor: "#2c2c6c",
                  borderStyle: "dashed",
                  borderWidth: 2,
                  padding: "5%",
                  marginLeft: 12,
                }}
              >
                <MaterialCommunityIcons
                  name="camera-plus"
                  size={65}
                  color="#5D8AA8"
                />
              </Text>
            </TouchableOpacity>
            <View style={styles.ImaageText}>
              {image ? (
                <Text style={{ color: "green" }}>Image Selected</Text>
              ) : (
                <Text style={{ color: "#800020" }}>Please add an Image</Text>
              )}
            </View>
          </View>

          <View>
            <View style={styles.TextInput2}>
              <TextInput
                value={DonorName}
                editable
                multiline
                numberOfLines={2}
                onChangeText={(nam) => setDonorName(nam)}
                placeholder="Donor Name"
                style={{ padding: 16 }}
              />
            </View>
            <View style={styles.TextInput2}>
              <TextInput
                value={Email}
                editable
                multiline
                numberOfLines={2}
                onChangeText={(e) => setEmail(e)}
                placeholder="Donor Email"
                style={{ padding: 16 }}
              />
            </View>
            <View style={styles.TextInput2}>
              <TextInput
                value={phoneNumber}
                editable
                multiline
                numberOfLines={2}
                onChangeText={(e) => setphoneNumber(e)}
                placeholder="Donor PhoneNumber"
                style={{ padding: 16 }}
              />
            </View>
            <View style={styles.TextInput1}>
              <TextInput
                value={title}
                editable
                multiline
                numberOfLines={2}
                onChangeText={(text) => setTitle(text)}
                placeholder="Title"
                style={{ padding: 16 }}
              />
            </View>
            <View style={styles.TextInput2}>
              <TextInput
                value={productdiscription}
                editable
                multiline
                numberOfLines={2}
                onChangeText={(nam) => setnamcrioption(nam)}
                placeholder="Product Dcription"
                style={{ padding: 16 }}
              />
            </View>

            <View style={{ paddingVertical: "3%" }}>
              <Text
                style={{ fontSize: 24, fontWeight: "bold", color: "#5D8AA8" }}
              >
                Quantity
              </Text>
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
                onChangeText={(other) => setOther(other)}
                placeholder="Other"
                style={{ padding: 13 }}
              />
            </View>

            <View style={styles.TextInput3}>
              <View style={{ paddingVertical: "1%" }}>
                <Text
                  style={{
                    marginTop: 12,
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#5D8AA8",
                  }}
                >
                  Pick-Up times
                </Text>
              </View>
              <TextInput
                editable
                onChangeText={(time) => settime(time)}
                placeholder="e.g. Today from 3-5"
                style={{ padding: 13 }}
              />
            </View>
            <View style={styles.TextInput3}>
              <Text style={{
                    marginTop: 12,
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#5D8AA8",
                  }}>Pick up Point:</Text>

              <TextInput
                placeholder="Location will be auto-filled here"
                value={locationData}
                editable={false}
              />
            </View>
            {x ? (
            <TouchableOpacity style={styles.Submit} onPress={uploadImage}>
              <Text style={styles.SubmitText}>Submit</Text>
            </TouchableOpacity>) :
            (
              <TouchableOpacity style={styles.SubmitD} onPress={uploadImage}>
              <Text style={styles.SubmitText}>Submit</Text>
            </TouchableOpacity>
            )
            }
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  ImaageText: {
    justifyContent: "center",
    marginLeft: "4%",
  },
  ImageSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  Submit: {
    borderRadius: 17,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: "19%",
    backgroundColor: "#4db5ff",
    elevation: 15,
  },
  SubmitD: {
    opacity:0.6,
    borderRadius: 17,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: "19%",
    backgroundColor: "#4db5ff",
    elevation: 15,
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
    marginTop:20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "#E1EBEE",
    opacity: 0.9,
    borderRadius:10
  },
  numberButton: {
    padding: 10,
    margin: 3,
    width: 45,
    borderRadius: 15,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  selectedNumberButton: {
    backgroundColor: "rgba(77,181,255,0.4)",
  },
  numberText: {
    fontSize: 18,
    color: "#444",
  },
  selectedNumberText: {
    color: "#fff",
  },
});
