import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import {  collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const DonationForm = ({ mosqueName, location }) => {
  const [foodType, setFoodType] = useState('');
  const [amount, setAmount] = useState('');

  const handleDonate = async () => {
   
    const donationsCollection = collection(firestore, 'donations');

    // Add donation to the Firestore
    await addDoc(donationsCollection, {
      mosqueName,
      location,
      foodType,
      amount,
      timestamp: new Date().toISOString(),
    });

    // Clear the input fields
    setFoodType('');
    setAmount('');
  };

  return (
    <View>
      <TextInput
        placeholder="Type of Food"
        value={foodType}
        onChangeText={setFoodType}
      />
      <TextInput
        placeholder="Amount or Description"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title="Donate" onPress={handleDonate} />
    </View>
  );
};

export default DonationForm;
