import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const API_URL = 'http://192.168.100.14:5000'; // Replace with your actual API URL

const FoodRecomendation = () => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [resultLoss, setResultLoss] = useState(null);
  const [resultGain, setResultGain] = useState(null);

  const handleWeightLoss = async () => {
    try {
      const response = await fetch(`${API_URL}/predict_weight_loss`, {
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

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const resultData = await response.json();
      setResultLoss(resultData);
      
      console.log('Weight Loss Result:', resultData);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

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

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const resultData = await response.json();
      setResultGain(resultData);
      renderResult(resultData)
      console.log('Weight Gain Result:', resultData);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const renderResult = (result) => {
    console.log("this is result",result)
    if (result) {
      return (
        <View>
          <Text>BMI: {result.bmi_loss}</Text>
          <Text>Recommended Food Items:</Text>
          <FlatList
            data={result.result_loss}
            keyExtractor={(item) => item}
            renderItem={({ item }) => <Text>{item}</Text>}
          />
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={{}}>Please enter your details:</Text>
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={(text) => setAge(text)}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Weight (kg)"
        value={weight}
        onChangeText={(text) => setWeight(text)}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Height (m)"
        value={height}
        onChangeText={(text) => setHeight(text)}
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
        <Button title="Weight Loss" onPress={handleWeightLoss} />
        <Button title="Weight Gain" onPress={handleWeightGain} />
      </View>

{renderResult(resultLoss)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
});

export default FoodRecomendation;
