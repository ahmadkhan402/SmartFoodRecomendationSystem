import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Share,
} from "react-native";
import { FontAwesome5,MaterialIcons } from '@expo/vector-icons'; 
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Linking } from "react-native";
import { getItem } from "../AsyncStorage/AsyscStorage";
import { COLOURS } from "../Database";
import { LinearGradient } from "expo-linear-gradient";


const DashBoard = ({navigation}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [emails, setemails] = useState("");
  // const user = auth.currentUser;

  //   // The user object has basic properties such as display name, email, etc.
  //   const displayName = user.displayName;
  // console.log(displayName)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 800);
    return () => clearInterval(interval);
  }, []);
  const hours = currentTime.getHours();
  let greeting = "";

  if (hours >= 0 && hours < 12) {
    greeting = "Good Morning!";
  } else if (hours >= 12 && hours < 17) {
    greeting = "Good Afternoon!";
  } else {
    greeting = "Good Evening!";
  }
  const formattedTime = currentTime.toLocaleTimeString();

  const DATA = [
    {
      id: "1",
      title: "Donate to help hungry People of Balochistan",
      description:
        "We are launching a donation campaign to help the hungry people of Balochistan, a province in Pakistan where many families are struggling to meet their basic needs.'\n'Sincerely '\n'[Ahmad Saffiullah/SR Donation]",
      image:
        "https://st2.depositphotos.com/4258905/6211/i/450/depositphotos_62117615-stock-photo-hungry-child-eating-bread.jpg",
    },
    
    {
      id: "3",
      title: "Donate to Alkhidmat Foundation",
      description:
        "We are launching a donation campaign to help the hungry people of Balochistan, a province in Pakistan where many families are struggling to meet their basic needs.'\n'Sincerely '\n'[Ahmad Saffiullah/SR Donation]",
      image:
        "https://images.unsplash.com/photo-1504159506876-f8338247a14a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aHVuZ3J5JTIwY2hpbGR8ZW58MHx8MHx8&w=800&q=80.jpg",
    },
    {
      id: "4",
      title: "This Ramdan give your zikat to needy!",
      description:
        "We are launching a donation campaign to help the hungry people of Balochistan, a province in Pakistan where many families are struggling to meet their basic needs.'\n'Sincerely '\n'[Ahmad Saffiullah/SR Donation]",
      image:
        "https://www.shutterstock.com/image-photo/little-girl-holding-sheet-cardboard-260nw-489149236.jpg",
    },
    {
      id: "5",
      title: "Help Feed Hungry Children in Zimbabwe!",
      description:
        "We are launching a donation campaign to help the hungry people of Balochistan, a province in Pakistan where many families are struggling to meet their basic needs.'\n'Sincerely '\n'[Ahmad Saffiullah/SR Donation]",
      image:
        "https://www.globalgiving.org/pfil/16275/pict_large.jpg",
    },
  ];

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Hey, check out this awesome React Native app!",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.Card}>
    <View style={{flexDirection:"row", paddingHorizontal:5}}>
    <View>
      <Image style={styles.imageUri} source={{ uri: item.image }} />
      </View>
      <View style={styles.TitleCont}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      </View>
        <Text style={styles.description}>{item.description}</Text>
    
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          
        }}
      >
        <TouchableOpacity
          style={styles.Button1}
          onPress={() =>
            Linking.openURL(
              "https://www.almadrasaalislamiyanyc.com/donate-now/"
            )
          }
        >
          <Text style={{ color: "#fff" }}>Donate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button2} onPress={onShare}>
          <Text>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const { height } = Dimensions.get("window");
  const [state, setState] = useState({ screenHeight: 0 });

  const Separator = () => {
    return (
      <View
        style={{
          height: "80%",
          width: 1,
          backgroundColor: "white",
        }}
      />
    );
  };
  const viewEmail = async () => {
    let getemail = await getItem("ShowEmail");
    console.log(" get email", getemail);
    setemails(getemail);
  };
  useEffect(() => {
    viewEmail();
  }, []);
  return (
    <LinearGradient
    colors={["#fffaf0", "#ffff","#fff"]}
    style={styles.container}
  >
      <ScrollView
      >
        <View style={styles.MiniContainer}>
          <View style={styles.TextContainer}>
            <Text style={styles.Text1}>
              Hello, <Text style={styles.Text2}>{emails}!</Text>{" "}
            </Text>
            <Text style={styles.greeting}>{greeting}</Text>
            <Text style={styles.time}>{formattedTime}</Text>
          </View>
          <View style={{ alignItems:"center",alignContent:"center",paddingHorizontal:16 }}>
            <Image
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "center",
              }}
              source={require("./../assets/quotes2.gif")}
            />
          </View>
        </View>

        {/* OptionMenu */}
        <LinearGradient
        colors={["#f8f8ff", "#f5fffa", "#afeeee"]}
        style={styles.menu}
      >
          <View style={{ flexDirection: "row", paddingHorizontal:30,paddingVertical:16 }}>
            <TouchableOpacity style={{paddingHorizontal:5}} onPress={() => navigation.navigate("RegOption")}>
              <View style={{  flexDirection: "column",alignItems:"center",backgroundColor:COLOURS.backgroundDarkBlue,padding:9,borderRadius:18}}>
                <Image
                  style={{ width: 60, height: 60 }}
                  source={require("./../assets/NGO.png")}
                />
                <Text style={{fontSize:9,fontWeight:400, color:COLOURS.backgroundLiteBlue}}>NGO's Portal</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{paddingHorizontal:5}} onPress={() => navigation.navigate("Masjid")}>
              <View style={{ flexDirection: "column" , alignItems:"center",backgroundColor:COLOURS.backgroundDarkBlue,padding:8,borderRadius:18}}>
             <View style={{padding:16}}>
              <FontAwesome5 name="mosque"  color= {COLOURS.backgroundLiteBlue} size={25}/>
             </View>
               <Text style={{fontSize:9,fontWeight:400, color:COLOURS.backgroundLiteBlue}}>Donate to Masjid</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{paddingHorizontal:5}} onPress={() => navigation.navigate("Donate")}>
              <View style={{ flexDirection: "column" , alignItems:"center",backgroundColor:COLOURS.backgroundDarkBlue,padding:8,borderRadius:18}}>
             <View style={{padding:16}}>
             <FontAwesome5 name="sellsy" size={25} color= {COLOURS.backgroundLiteBlue} />
             </View>
               <Text style={{fontSize:9,fontWeight:400,color:COLOURS.backgroundLiteBlue}}>Buy & sell</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", paddingHorizontal:16,paddingVertical:16 }}>
          <TouchableOpacity style={{paddingHorizontal:5}} onPress={() => navigation.navigate("Donate")}>
              <View style={{  flexDirection: "column",alignItems:"center",backgroundColor:COLOURS.backgroundDarkBlue,padding:9,borderRadius:18}}>
              <View style={{padding:16}}>
             <FontAwesome5 name="donate" size={25} color= {COLOURS.backgroundLiteBlue} />
             </View>
                <Text style={{fontSize:9,fontWeight:400, color:COLOURS.backgroundLiteBlue}}>Donate</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{paddingHorizontal:5}} onPress={() => navigation.navigate("Report")}>
              <View style={{  flexDirection: "column",alignItems:"center",backgroundColor:COLOURS.backgroundDarkBlue,padding:9,borderRadius:18}}>
              <View style={{padding:16}}>
              <MaterialIcons name="report" size={24} color= {COLOURS.backgroundLiteBlue} />
             </View>
                <Text style={{fontSize:9,fontWeight:400, color:COLOURS.backgroundLiteBlue}}>Report</Text>
              </View>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* FlatList */}
        <View style={styles.FlatListContainer}>
          <View
            style={{
              flexDirection: "row",
              marginVertical: "2%",
              marginHorizontal: "3.5%",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Urgent Fund Needed
            </Text>
          </View>
          <FlatList
            data={DATA}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            horizontal={true}
            ItemSeparatorComponent={Separator}
            showsHorizontalScrollIndicator={false}
            style={styles.flatList}
          />
        </View>
      </ScrollView>
     </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  MiniContainer: {
    paddingHorizontal:16,
    backgroundColor: "#2c2c6c",
    width: "100%",
    height: "28%",
    borderBottomRightRadius: 175,
    justifyContent: "center",
    marginBottom:"20%",
  },
  FlatListContainer: {
    backgroundColor: "#D8DDAD",
    marginVertical: "5%",
    marginHorizontal : "3.5%",
    borderRadius: 10,
    paddingBottom:60
  },
  flatList: {
    marginLeft: "2.5%",
  },
  TitleCont: {
   paddingHorizontal:10,
   paddingRight:70,
  
  },
  TextContainer: {
  marginTop:"38%"
  
  },
  Header: {
    backgroundColor: "white",
    flexDirection: "row",
    height: 90,
  },
  Button1: {
    marginRight: "2%",
    width: "44%",
    height: "36%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4db5ff",
    textAlign: "center",
    elevation: 5,
    marginLeft: "5%",
  },
  Button2: {
    marginRight: "3%",
    marginLeft: "3%",
    width: "44%",
    height: "36%",
    borderRadius: 5,
    marginLeft: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    textAlign: "center",
    elevation: 5,
    
  },
  Text1: {
    fontSize: 15,
    fontWeight: "800",
    color: "#fff",
    paddingTop: 3,
  },
  Text2: {
    fontSize: 17,
    fontWeight: "800",
    color: "#fff",
  },
  image: {
    width: "3.5%",
    height: "3.5%",
  },
  greeting: {
    paddingTop: 3,
    fontSize: 15,
    color: "#fff",
  },
  title: {
    textAlign:"justify",
    fontSize: 17,
    fontWeight: "bold",
   overflow:"hidden"
  },
  content: {
    fontSize: 20,
    marginBottom: 20,
    color: "#4db5ff",
  },
  time: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4db5ff",
  },

  Card: {
    paddingVertical:6,
   paddingHorizontal:10,
    width: 330,
    borderRadius: 10,
  
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 1,
  },
  imageUri: {
   
    borderRadius: 12,
    height: 80,
    width: 80,
    resizeMode: "cover",
  },

  description: {
    marginTop: 8,
    fontSize: 12,
    textAlign: "justify",
  },
  menu:{
   
    alignSelf:"center",
    alignItems:"center",
    marginVertical:35,
    borderWidth:2,
    borderRadius:12,
    borderColor:COLOURS.backgroundDarkBlue
  }
});

export default DashBoard;
