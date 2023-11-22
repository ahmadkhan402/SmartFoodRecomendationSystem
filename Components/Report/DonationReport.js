import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import {
  collection,
  getDocs,
  subcollection,
  getDocs as getSubcollectionDocs,
} from "firebase/firestore";
import { db } from "../../firebase";

const DonationReport = () => {
  const [Sellbuy, setSellbuy] = useState([]);
  const [NgoDonation, setNgoDonation] = useState([]);
  const [PersonalDonation, setPersonalDonation] = useState([]);
  useEffect(() => {
    const fetchSellbuy = async () => {
      try {

        const collectionNames = ['Posts', 'NGODonationPosts', 'SellItems'];
        const allData = [];

        for (const collectionName of collectionNames) {
          const donationsCollection = collection(db, collectionName);
          const snapshot = await getDocs(donationsCollection);

          const data = [];
          const PostData = [];
          if (collectionName === "Posts") {
            snapshot.forEach((doc) => {
              const data =  doc.data()
              const id = doc.id
              console.log("the date",data.date)
               PostData.push({id:id, ...data})
              
      
            })
            setPersonalDonation(PostData)
             console.log("this ssssssssssssssssssssss",PostData)
          }
        }
       
      } catch (error) {
        console.error("Error fetching donation data:", error);
      }
    };

    fetchSellbuy();
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Combined Donation Report</Text>
{PersonalDonation && (
  <View>
  <Text style={styles.DonationTitle}>Personal Donation Report</Text>
      <FlatList
        data={Sellbuy}
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
              <Text style={styles.label}>Donation:</Text> {item.amount}
            </Text>
            <Text>
              <Text style={styles.label}>Date:</Text> {item.date}
            </Text>
            <View style={styles.separator} />
          </View>
        )}
      />
       </View>
)}
    </View>
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
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 15,
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
