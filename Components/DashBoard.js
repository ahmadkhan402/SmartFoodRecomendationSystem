import React from 'react';
import { StyleSheet, View, Text, Image, FlatList, Dimensions, Platform, SafeAreaView, ScrollView, TouchableOpacity, Share } from 'react-native';
import { useEffect, useState } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { auth } from '../firebase';
import { Linking } from 'react-native';


const DashBoard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // const user = auth.currentUser;
 
  //   // The user object has basic properties such as display name, email, etc.
  //   const displayName = user.displayName;
  // console.log(displayName)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const hours = currentTime.getHours();
  let greeting = '';

  if (hours >= 0 && hours < 12) {
    greeting = 'Good Morning!';
  } else if (hours >= 12 && hours < 17) {
    greeting = 'Good Afternoon!';
  } else {
    greeting = 'Good Evening!';
  }
  const formattedTime = currentTime.toLocaleTimeString();

  const DATA = [
    {
      id: '1',
      title: 'Donate to help hungry People of Balochistan',
      description: "We are launching a donation campaign to help the hungry people of Balochistan, a province in Pakistan where many families are struggling to meet their basic needs.'\n'Sincerely '\n'[Ahmad Saffiullah/SR Donation]",
      image: 'https://st2.depositphotos.com/4258905/6211/i/450/depositphotos_62117615-stock-photo-hungry-child-eating-bread.jpg',
    },
    {
      id: '2',
      title: 'Gives Sadqa for Masjid',
      description: "We are launching a donation campaign to help the hungry people of Balochistan, a province in Pakistan where many families are struggling to meet their basic needs.'\n'Sincerely '\n'[Ahmad Saffiullah/SR Donation]",
      image: 'https://www.shutterstock.com/image-photo/closeup-poor-staring-hungry-orphan-260nw-1368050006.jpg'
    },
    {
      id: '3',
      title: 'Donate to Alkhidmat Foundation',
      description: "We are launching a donation campaign to help the hungry people of Balochistan, a province in Pakistan where many families are struggling to meet their basic needs.'\n'Sincerely '\n'[Ahmad Saffiullah/SR Donation]",
      image: 'https://images.unsplash.com/photo-1504159506876-f8338247a14a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aHVuZ3J5JTIwY2hpbGR8ZW58MHx8MHx8&w=1000&q=80.jpg',
    },
    {
      id: '4',
      title: 'This Ramdan give your zikat to needy!',
      description: "We are launching a donation campaign to help the hungry people of Balochistan, a province in Pakistan where many families are struggling to meet their basic needs.'\n'Sincerely '\n'[Ahmad Saffiullah/SR Donation]",
      image: 'https://www.shutterstock.com/image-photo/little-girl-holding-sheet-cardboard-260nw-489149236.jpg'
     
    },
  ];




const onShare = async () => {
  try {
    const result = await Share.share({
      message:
        'Hey, check out this awesome React Native app!',
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
     
    
      <Image style={styles.imageUri} source={{ uri: item.image }} />
      
      <View style={styles.TitleCont}>
      <Text style={styles.title}>{item.title}</Text>
      </View>
      
      <View style={styles.descriptionCon}>
      <Text style={styles.description}>{item.description}</Text>
       </View> 
      <View style={{
        flexDirection: "row",
        position: "absolute",
        justifyContent: "center", 
        alignItems: "center",
        top:"75%",
        
      }}>
        <TouchableOpacity style={styles.Button1} onPress={()=>Linking.openURL("https://www.almadrasaalislamiyanyc.com/donate-now/")}>
          <Text style={{ color: "#fff" }}>Donate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button2} onPress={onShare}>
          <Text>Share</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );

const { height } = Dimensions.get('window')
const [state, setState] = useState({ screenHeight: 0 })


const Separator = () => {
  return (
    <View
      style={{
        height: "100%",
        width: 1,
        backgroundColor: "white",
      }}
    />
  );
}
return (
  
    <SafeAreaView style={styles.container}>
<ScrollView
    style={{ flex: 1 }}
    contentContainerStyle={styles.contentContainerStyle}
   
  >
      <View style={styles.MiniContainer}>
        <View style={styles.TextContainer}>
          <Text style={styles.Text1}>Hello, <Text style={styles.Text2}>{auth.currentUser?.email}!</Text> </Text>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.time}>{formattedTime}</Text>
        </View>

        <View style={{ position: "absolute", justifyContent: "center", alignItems: "center", width: "90%", top: "32%", bottom: 0, left: "3.5%" }}>
          <Image style={{
            width: "100%",
            resizeMode: "contain",
            marginTop: "35%",

          }} source={require("./../assets/quotes2.gif")} />
        </View>

      </View>
          
      <View style={styles.FlatListContainer}>
      <View style={{flexDirection:"row",marginVertical:"2%", marginHorizontal:"3.5%"}}>
              <Text style={{fontSize:16, fontWeight:"bold"}}>Urgent Fund Needed</Text>
              
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
    </SafeAreaView>


);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  MiniContainer: {
    backgroundColor: "#2c2c6c",
    width: "100%",
    height: "40%",
    borderBottomRightRadius: 175,
    justifyContent: "center"
  },
  FlatListContainer:{
    backgroundColor: "#D8DDAD",
    marginVertical:"20%",
    marginLeft:"3.5%",
    borderRadius:10

  },
  flatList: {
    marginLeft: "2.5%",

  },
  TitleCont: {
    marginTop: "1%",
    marginLeft:"30%",
    marginVertical:"10%"


  },
  TextContainer: {
    padding: "3.5%",
    marginBottom: "45%",
    marginTop: "9%"


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
    marginTop: 40,
    backgroundColor: "#4db5ff",
    textAlign: 'center',
    elevation: 5,
    textAlign: "center",
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
    marginTop: 40,
    backgroundColor: "#fff",
    textAlign: 'center',
    elevation: 5,
    textAlign: "center"

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
    height: "3.5%"

  },
  greeting: {
    paddingTop: 3,
    fontSize: 15,
    color: "#fff",
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    
  },
  content: {
    fontSize: 20,
    marginBottom: 20,
    color: "#4db5ff",
  },
  time: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#4db5ff",
  },


  Card: {
    marginLeft: 10,
    marginTop: '2%',
    height: "90%",
    width: 310,
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor:"black",
    borderWidth:1

  },
  imageUri: {
    position: "absolute",
    right: 0,
    left: 4,
    top: 4,
borderRadius:12,
    height: '40%',
    width: '30%',
    resizeMode: 'cover'
  },
 
  descriptionCon: {

  },
  description: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',

  }

});

export default DashBoard;
