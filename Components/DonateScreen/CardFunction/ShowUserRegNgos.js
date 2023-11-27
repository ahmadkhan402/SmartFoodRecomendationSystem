import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { collection, deleteDoc, doc, documentId, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo ,AntDesign} from '@expo/vector-icons';
import { db, auth } from '../../../firebase';
import { COLOURS } from '../../../Database';
import { push } from 'firebase/database';
import { Ionicons,MaterialCommunityIcons} from '@expo/vector-icons';

let id = ""
const ShowUserRegNgos = ({ navigation }) => {
  const [NGOList, setNGOList] = useState([]);
  const [NotNgo, setNotNgo] = useState(true);
  const [docid, setDocid] = useState(true);
  const userID = auth.currentUser?.uid;
  console.log(userID)


let isfocus = useIsFocused()

const deleteDocument = async () => {
  const docRef = doc(db, "NGO_Register", docid);

  try {
    await deleteDoc(docRef);
    Alert.alert(`Document with ID ${docid} successfully deleted.`);
  } catch (error) {
    console.error('Error deleting document:', error);
  }
};

  useEffect(() => {
 
    const fetchNGOList = async () => {
        let arr = [];
        let cords = [];
      
        const docRef = doc(db,  "NGO_Register",userID); 
       
        
        try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
            arr.push(docSnap.data())
               id =   docSnap.id
               setDocid(id)
              console.log(" this issssss", arr);
              setNotNgo(false)
              setNGOList(arr)
            }
            else{
              console.log("Array is empity");
               setNotNgo(true)
            }
            
         
            console.log(arr);
        } catch(error) {
            console.log(error)
        }
    }
  
if(isfocus){
    fetchNGOList();
}
  }, [isfocus]);

  
  const renderitem = ({ item }) => (
    <View style={styles.Card}>
      <LinearGradient colors={['#f8f8ff', '#f5fffa', '#afeeee']} style={styles.Carditem}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 13 }}>
          <Text style={styles.text}>{item.ngoName}</Text>
          <View style={{flexDirection:"row", }}>
          
          <TouchableOpacity
            style={styles.btnDlt}
            onPress={deleteDocument}>
            <AntDesign name="delete" size={30} color="#4c669f" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnMap}
            onPress={() => {
              navigation.navigate('MapNgo', {
                id: item.id,
                Coords: item.Coords,
                NGOList,
              });
            }}
          >
            <Entypo name="location" size={30} color="#4c669f" />
          </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.des}> {item.locationData}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('checkDonations', {data: item})}>
            <Text style={styles.Donate}>check Donation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}onPress={() => navigation.navigate('checkRequests', {id: id})}>
            <Text style={styles.Donate}>Check Request</Text>
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
      {NotNgo ?
        (
        <View style={styles.container}>
          <View style={{ marginBottom: 20 }}>
          <MaterialCommunityIcons name="emoticon-sad" size={200} color="#fff" />
          </View>
          <Text style={{color:"#fff",fontSize:22}}>No NGO Registered</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("NGOForm")}
          >
            <Text style={styles.Donate}>Register NGO</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity style={styles.BtnReg2}>
            <Text
              style={{ color: COLOURS.white, fontSize: 20, fontWeight: "200" }}
            >
              {" "}
              Your Register NGOs
            </Text>
          </TouchableOpacity>

          <FlatList
            data={NGOList}
            renderItem={renderitem}
            keyExtractor={(item) => item.id}
          />
        </View>
      ) }
    </LinearGradient>
  );
};

export default ShowUserRegNgos;

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
      width: 120,
      height: 40,
      borderRadius: 5,
      marginTop: 15,
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
    Donate: {
        padding:2,
        fontSize:13,
        textAlign:"center",
      color: COLOURS.backgroundLight,
    },
    btnDlt:{
      alignItems: "center",
      justifyContent: "center",
      elevation: 14,
      paddingHorizontal:28
    },
    btnMap:{ 
      alignItems: "center",
        justifyContent: "center",
        elevation: 14
        
    
    }
  });