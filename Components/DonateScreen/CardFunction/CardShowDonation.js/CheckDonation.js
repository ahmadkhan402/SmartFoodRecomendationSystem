import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { collection, doc, documentId, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
import { COLOURS } from '../../../../Database';
import { auth, db } from '../../../../firebase';

const CheckDonation = ({ navigation }) => {
  const [NGOList, setNGOList] = useState([]);
  const userID = auth.currentUser?.uid;
  console.log(userID)

  useEffect(() => {
 
    const fetchNGOList = async () => {
        let arr = [];
        let cords = [];
      
        const docRef = doc(db,  "NGODonationPosts",userID); 
       
        
        try {
            const docSnap = await getDoc(docRef);
            arr.push(docSnap.data())
            setNGOList(arr)
            console.log("doantuon data",arr);
        } catch(error) {
            console.log(error)
        }
    }
  

    fetchNGOList();
  }, [db]);

  
  const renderitem = ({ item }) => (
    <View style={styles.Card}>
      <LinearGradient colors={['#f8f8ff', '#f5fffa', '#afeeee']} style={styles.Carditem}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 13 }}>
          <Text style={styles.text}>Donor Name: {item.DonorName}</Text>
        </View>
        <Text style={styles.des}> {item.Description}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('checkDonations')}>
            <Text style={styles.Donate}>check Donation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('checkRequest')}>
            <Text style={styles.Donate}>Check Request</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );

  return (
    <LinearGradient colors={['#4db5ff', '#4c669f', '#2c2c6c']} style={styles.container}>
      <View>
        <TouchableOpacity style={styles.BtnReg2}>
          <Text style={{ color: COLOURS.white, fontSize: 20, fontWeight: '200' }}> Your Register NGOs</Text>
        </TouchableOpacity>
        <FlatList data={NGOList} renderItem={renderitem}  />
      </View>
    </LinearGradient>
  );
};

export default CheckDonation;

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
    Donate: {
        padding:2,
        fontSize:13,
        textAlign:"center",
      color: COLOURS.backgroundLight,
    },
    btnMap:{ 
      alignItems: "center",
        justifyContent: "center",
        elevation: 14
        
    
    }
  });