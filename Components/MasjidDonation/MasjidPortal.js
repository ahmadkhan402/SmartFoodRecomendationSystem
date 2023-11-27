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
import { Image } from "react-native";

const MasjidPortal = ({ navigation }) => {
  const [coords, setcords] = useState("");
  const [MasjidList, setMasjidList] = useState([]);

  const DonateMasjid = [
    {
      id: 1,
      Name: "Al-Wahab Foundation",
      des: "Ummah Charity International is now Al-Wahab Foundation",
      Link: "https://alwahabfoundation.org/all-appeals/build-a-masjid/",
      image: "https://user-images.githubusercontent.com/108932963/177995024-687ab306-b4e9-4c85-98f7-9356395ad718.png"
     },
    {
      id: 2,
      Name: "Muslim global relief",
      des: "“Whoever builds a mosque, desiring thereby Allah’s pleasure, Allah builds for him the like of it in paradise.” [Bukhari]",
      Link: "https://www.muslimglobalrelief.org/build-a-mosque/",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQVziKJnjgchqbKL4nMdt4vhfw-R7tkH2iNjIL_iIUvA&s",
    },
    {
      id: 3,
      Name: "Al-khidmat",
      des: "Alkhidmat is the largest NGO. From raising Orphans to providing affordable Health-Care & Relief in crisis, we work in all domains of social welfare",
      Link: "https://alkhidmat.com/donate/masjid-rehabiliation/",
      image:"https://alkhidmat.com/wp-content/themes/ak/img/alkhidmat-logo-2.png" },
    {
        id: 4,
        Name: "Zaimah Foundation",
        des: "A Mosque is the blessed house of Allah, and the heart of any Muslim community. It’s a sacred place of worship, contemplation, celebration and spiritual fulfilment, alhamdulillah!",
        Link: "https://zaimah.org/appeals/build-a-mosque/",
        image: "https://zaimah.org/wp-content/uploads/2021/02/zaimahlogotagline-1.png"
       },
      {
        id: 5,
        Name: "Masjidbox",
        des: "Masjidbox Donations give you the power to be in control of your campaigns. Run campaigns on your terms, specify your own donation tiers.",
        Link: "https://masjidbox.com/donations",
        image:"https://pbs.twimg.com/profile_images/1586056199140777984/X92GyClX_400x400.jpg",
      },
      {
        id: 6,
        Name: "Muslim Charity",
        des: "Mosques can be built based on your specific budget. Get in touch with us via info@muslimcharity.org.uk",
        Link: "https://muslimcharity.org.uk/appeals/",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMenW6hzT8X4a72f3kG5t7JiYuWhwdaJ_xOS0NJCaA&s",
      },
  ];

  const renderitem = ({ item }) => (
    <View style={styles.Card}>
      <LinearGradient
        colors={["#f8f8ff", "#f5fffa", "#afeeee"]}
        style={styles.Carditem}
      >
        <View style={{justifyContent:"center",alignItems:"center"}}>
          <Image
            style={{ width: 80, height: 80 , borderRadius:10 , resizeMode:"contain"}}
            source={{ uri: item.image }}
          />
        </View>
        <View style={{paddingLeft:10 , marginRight:70}}>
          <Text style={styles.text}>{item.Name}</Text>
          <Text style={styles.des}>{item.des}</Text>

            <TouchableOpacity
              style={styles.btn}
              onPress={() =>
                navigation.navigate("MosqueDonation", { Link: item.Link })
              }
            >
              <Text style={styles.Donate}>Donate</Text>
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
              fontWeight: "500",
            }}
          >
            {" "}
            Let donate for House of ALLAH
          </Text>
        </TouchableOpacity>
        <FlatList
          data={DonateMasjid}
          renderItem={renderitem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </LinearGradient>
  );
};

export default MasjidPortal;

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
    marginTop: 70,
    marginBottom: 30,
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
    flexDirection:"row",
    backgroundColor: COLOURS.backgroundMedium,
    padding: 15,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 700,
  },
  des: {
    marginTop:6,
    fontSize: 13,
    textAlign:"auto",
    color: "#00008b"
  },
  Donate: {
    color: COLOURS.backgroundLight,
  },
});
