import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import {
  collection,
  getDocs,
  subcollection,
  getDocs as getSubcollectionDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import { LinearGradient } from "expo-linear-gradient";
import { COLOURS } from "../../Database";

const DonationReport = () => {
  const [Sellbuy, setSellbuy] = useState([]);
  const [NgoDonation, setNgoDonation] = useState([]);
  const [PersonalDonation, setPersonalDonation] = useState([]);
  useEffect(() => {
    const fetchSellbuy = async () => {
      try {

        const collectionNames = ['Posts', 'SellItems'];
        const allData = [];

        for (const collectionName of collectionNames) {
          const donationsCollection = collection(db, collectionName);
          const snapshot = await getDocs(donationsCollection);

          const selldata = [];
          const PostData = [];
          if (collectionName === "Posts") {
            snapshot.forEach((doc) => {
              const data =  doc.data()
              const id = doc.id
              console.log("the date",data.date)
               PostData.push({id:id, ...data})
              
      
            })
            setPersonalDonation(PostData)
             console.log("this efevevssssssssssssssssssssss",PersonalDonation)
          }else if(collectionName === "SellItems"){
            snapshot.forEach((doc) => {
              const data =  doc.data()
              const id = doc.id
              console.log("the date",data.date)
              selldata.push({id:id, ...data})
              
      
            })
            setSellbuy(selldata)
             console.log("this sell and but",selldata)
          }else if(collectionName === "SellItems"){
            snapshot.forEach((doc) => {
              const data =  doc.data()
              const id = doc.id
              console.log("the date",data.date)
              selldata.push({id:id, ...data})
              
      
            })
            setSellbuy(selldata)
             console.log("this sell and but",selldata)
          }
        }
       
      } catch (error) {
        console.error("Error fetching donation data:", error);
      }
    };

    fetchSellbuy();
  }, []);


  return (
    <LinearGradient
    colors={["#FFF", "#4c669f", "#2c2c6c"]}
    style={styles.container}
  >
      <Text style={styles.heading}>Combined Donation Report</Text>
      <ScrollView>
<View>
{PersonalDonation && (
  <View>
  <Text style={styles.DonationTitle}>Personal Donation Report</Text>
      <FlatList
        data={PersonalDonation}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
          
            <Text>
              <Text style={styles.label}>Name:</Text> {item.DonorName}
            </Text>
            <Text>
              <Text style={styles.label}>Title:</Text> {item.Title}
            </Text>
            <Text>
              <Text style={styles.label}>Description:</Text> {item.Description}
            </Text>
            <Text>
              <Text style={styles.label}>Time:</Text> {item.Time}
            </Text>
            <View style={styles.separator} />
          </View>
        )}
      />
      
       </View>
)}
</View>
<View>
{Sellbuy && (
  <View>
  <Text style={styles.DonationTitle}>Sell & Buy Report</Text>
      <FlatList
        data={Sellbuy}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
          
            <Text>
              <Text style={styles.label}>ProductName:</Text> {item.ProductName}
            </Text>
            <Text>
              <Text style={styles.label}>Category:</Text> {item.Category}
            </Text>
            <Text>
              <Text style={styles.label}>Description:</Text> {item.Description}
            </Text>
            <Text>
              <Text style={styles.label}>ProductPrice:</Text> {item.ProductPrice}
            </Text>
            <View style={styles.separator} />
          </View>
        )}
      />
      
       </View>
)}
</View>
</ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  DonationTitle:{
    textAlign:"center",
    fontSize: 19,
    backgroundColor:COLOURS.backgroundLiteBlue,
    fontWeight: "bold",
    marginBottom: 15,
    color:"#fff",
    paddingVertical:8,
    borderRadius:8
  },
  itemContainer: {
    marginBottom: 16,
  },
  label: {
    fontWeight: "bold",
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  subItemContainer: {
    marginLeft: 16,
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
    marginVertical: 8,
  },
});

export default DonationReport;
