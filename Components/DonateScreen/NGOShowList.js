import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { COLOURS } from "../../Database";
import { TouchableOpacity } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { auth, db } from "../../firebase";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

const NGOShowList = ({ navigation }) => {
  const [coords, setcords] = useState("");
  const [NGOList, setNGOList] = useState([]);

  const ShowNGOList = async () => {
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
    console.log(NGOList);
  };

  useEffect(() => {
    ShowNGOList();
  }, []);

  const renderitem = ({ item }) => (
    <View style={styles.Card}>
     <LinearGradient
        colors={["#f8f8ff", "#f5fffa", "#afeeee"]}
        style={styles.Carditem}
      >
        <Text style={styles.text}>{item.ngoName}</Text>
        <Text style={styles.des}> {item.locationData}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.Donate}>Donate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate("MapNgo", {
                id: item.id,
                Coords: item.Coords,
                NGOList,
              });
            }}
          >
            <Text style={styles.Donate}>Map</Text>
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
        <FlatList
          data={NGOList}
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
  Donate: {
    color: COLOURS.backgroundLight,
  },
});
