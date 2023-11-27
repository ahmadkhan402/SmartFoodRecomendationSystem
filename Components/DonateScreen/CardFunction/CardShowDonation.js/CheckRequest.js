import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';

import { useRoute } from '@react-navigation/native';
import { auth, db } from '../../../../firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import { COLOURS } from '../../../../Database';


const CheckRequest = () => {
  const [requests, setRequests] = useState([]);
  const route = useRoute();
  const ngoId = route.params.id;

  const fetchRequests = async () => {
    try {
      if (!ngoId) {
        console.error('NGO ID is missing.');
        return;
      }

      const requestsRef = collection(db, 'NGORequestData', ngoId, 'requests');
      const q = query(requestsRef, where('status', '==', 'pending'));
      const querySnapshot = await getDocs(q);

      const requestsData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data) {
          requestsData.push({ id: doc.id, ...data });
        }
      });

      setRequests(requestsData);
      console.log('Requests data:', requestsData);
    } catch (fetchError) {
      console.error('Error fetching requests:', fetchError);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [ngoId]);

  const handleAcceptRequest = async (requestId) => {
    try {
      if (!ngoId) {
        console.error('NGO ID is missing.');
        return;
      }

      const requestDocRef = doc(db, 'NGORequestData', ngoId, 'requests', requestId);
      await updateDoc(requestDocRef, { status: 'accepted' });

      // Fetch requests after accepting
      fetchRequests();
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      if (!ngoId) {
        console.error('NGO ID is missing.');
        return;
      }

      const requestDocRef = doc(db, 'NGORequestData', ngoId, 'requests', requestId);
      await updateDoc(requestDocRef, { status: 'rejected' });

      fetchRequests();
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  const renderRequest = ({ item }) => (
    
    <View style={styles.Card}>
    <LinearGradient
        colors={["#f8f8ff", "#f5fffa", "#afeeee"]}
        style={styles.Carditem}
      >
       <Text style={styles.dataTile}>Request For {item.type}</Text>
       <Text style={styles.data}>Name: {item.name}</Text>
      <Text style={styles.data}>PH NUM: {item.numb}</Text>
      <Text style={styles.data}>Location: {item.location}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <TouchableOpacity style={styles.btnd}  onPress={() => handleAcceptRequest(item.id)} ><Text style={styles.Donate}>Accept</Text></TouchableOpacity>
      <TouchableOpacity style={styles.btn}  onPress={() => handleRejectRequest(item.id)} ><Text style={styles.Donate}>Reject</Text></TouchableOpacity>
      </View>
      </LinearGradient>
      </View>
   
  );

  return (
    <LinearGradient
    colors={["#4db5ff", "#4c669f", "#2c2c6c"]}
    style={styles.container}
  >
      <Text style={styles.BtnReg2}>NGO Requests Portal</Text>
      <FlatList
        data={requests}
        renderItem={renderRequest}
        keyExtractor={(item) => (item ? item.id.toString() : null)}
      />
    </LinearGradient>
  );
};

export default CheckRequest;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  des: {
    color: COLOURS.blue,
  },
  dataTile:{
    color:COLOURS.backgroundDarkBlue,
fontSize:15,
fontWeight:"900",
justifyContent:"center",
alignItems:"center",
marginVertical:8
  },
  data:{
color:COLOURS.backgroundLiteBlue,
fontSize:12
  },
  BtnReg2: {
    marginTop:16,
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    backgroundColor: "#4db5ff",
    elevation: 40,
  },
  Card: {
    backgroundColor: "transparent",
    padding: 10,
    
    justifyContent: "center",
  },
  Donate: {
    color: COLOURS.backgroundLight,
  },
  Carditem: {
    backgroundColor: COLOURS.backgroundMedium,
   paddingHorizontal:25,
   paddingVertical:15,
    borderRadius: 10,
  },
  btnd: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 30,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: "#4db5ff",
    elevation: 15,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft:70,
    width: 80,
    height: 30,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: "#4db5ff",
    elevation: 15,
  },
})