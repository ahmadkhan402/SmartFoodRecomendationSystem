import React, { useEffect, useState } from "react";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLOURS } from "../../../Database";

const API_URL = "http://192.168.100.14:5000";

const ResultWeightGain = () => {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [resultGain, setResultGain] = useState(null);

  const route = useRoute();
  const isFocused = useIsFocused();

  useEffect(() => {
    let P_age = parseInt(route.params.age);
    let P_weight = parseFloat(route.params.weight);
    let P_height = parseFloat(route.params.height);
    setAge(P_age);
    setWeight(P_weight);
    setHeight(P_height);
  }, []);

  useEffect(() => {
    const handleWeightGain = async () => {
      try {
        const response = await fetch(`${API_URL}/predict_weight_gain`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            age: parseInt(age),
            weight: parseFloat(weight),
            height: parseFloat(height),
          }),
          
        });
        console.log('Request Parameters:', {
          age: parseInt(age),
          weight: parseFloat(weight),
          height: parseFloat(height),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
          console.log('Response Status:', response.status);
        }
  
        const resultData = await response.json();
        setResultGain(resultData);
        console.log('Weight Gain Result:', resultData);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
  
    if (isFocused) {
      handleWeightGain();
    }
  }, [isFocused, age, weight, height]);

  return (
    <LinearGradient
      colors={["#4db5ff", "#4c669f", "#2c2c6c"]}
      style={styles.container}
    >
      <Text style={styles.title}>Food Recommendations Weight Gain</Text>
      <Text style={styles.subtitle2}>Check Your BMI</Text>
      <Text style={styles.subTitle}>BMI: {resultGain?.bmi_gain}</Text>
      <Text style={styles.subtitle2}>
        List of Recommended Food Items
      </Text>
      <FlatList
        data={resultGain?.result_gain}
        keyExtractor={(item) => item}
        renderItem={({ item ,index}) => <Text style={styles.foodItem}>{index + 1}: {item}</Text>}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  subtitle2: {
    marginVertical: 16,
    textAlign: "center",
    fontSize: 19,
    backgroundColor: COLOURS.backgroundLiteBlue,
    fontWeight: "bold",
    color: "#fff",
    paddingVertical: 8,
    borderRadius: 8,
    paddingHorizontal:4

  },

  
  subTitle: {
    fontSize: 18,
    color: "#fff",
    marginVertical: 2,
  },
  foodItem: {
    paddingVertical:7,
    paddingHorizontal:7,
    fontSize: 20,
    color: "#fff",
    marginBottom: 5,
    borderBottomWidth:1,
    borderBottomColor:COLOURS.backgroundDarkBlue

  },
});

export default ResultWeightGain;