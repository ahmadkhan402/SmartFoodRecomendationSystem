import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { collection, collectionGroup, doc, documentId, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
import { COLOURS } from '../../../../Database';
import { auth, db } from '../../../../firebase';
import { Image } from 'react-native';

let ngoid = ""
const CheckDonation = ({ navigation }) => {
  const [NGOList, setNGOList] = useState([]);
  const userID = auth.currentUser?.uid;
  console.log(userID)
const route = useRoute()
ngoid = route.params.data.id


  useEffect(() => {
 
    const fetchNGOList = async () => {
      try {
        const arr = [];
    
        // Assuming userID is the ID of the document in the 'NGODonationPosts' collection
        const userDocRef = doc(db, 'NGODonationPosts', userID);
        const donationsRef = collection(userDocRef, 'donations');
    
        const querySnapshot = await getDocs(donationsRef);
        const hasDonations = !querySnapshot.empty;

        const ngoDocRef = doc(db, 'NGO_Register', userID);
        await updateDoc(ngoDocRef, { foodAvailability: hasDonations });

        querySnapshot.forEach((doc) => {
          arr.push(doc.data());
        });
    
        setNGOList(arr);
        console.log('Donation data:', arr);
      } catch (error) {
        console.error('Error fetching donation data:', error);
      }
    };
    
    
  

    fetchNGOList();
  }, [db]);

  
  const renderitem = ({ item }) => (
    <View style={styles.Card}>
      <LinearGradient colors={['#f8f8ff', '#f5fffa', '#afeeee']} style={styles.Carditem}>
      <View style={{flexDirection:"row"}}>
      <View>
        <Image style={{width:120,height:120, borderRadius:10}} source={{uri: item.ImageUrl}}/>
      </View>
    
        <View style={{ justifyContent: 'center', marginLeft:8}}>
          <Text style={styles.text}>Name: {item.DonorName}</Text>
          <Text style={styles.de}>Time: {item.Time}</Text>
      
          <Text style={styles.des}>Product: {item.Title}</Text>
       <Text style={styles.des}>Dec: {item.Description}</Text>
       <Text style={styles.des}>Email: {item.Email}</Text>
       <Text style={styles.des}>quantity: {item.SelectedNumber}</Text>
       <TouchableOpacity style={styles.btn} onPress={()=>Alert.alert("This is your PickUp-location",item.PickUpPoint )}>
       <Text style={styles.Donate}> Check PickUp-Point</Text>
       </TouchableOpacity>
        </View>
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
        <FlatList data={NGOList} renderItem={renderitem} keyExtractor={(item) => item.id} />
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
    PickUpPoint:{
      backgroundColor:"#F0F8FF",
      borderRadius:5,
      padding:10,
      fontWeight:"500"
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
      padding: 10,
      borderRadius: 10,
    },
    text: {
      fontSize: 13,
      fontWeight: 500,
    },
    des: {
      color: COLOURS.blue,
      fontSize:12
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