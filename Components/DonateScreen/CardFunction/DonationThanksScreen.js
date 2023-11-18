import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLOURS } from '../../../Database';

const DonationThanksScreen = () => {

  return (
    <LinearGradient
  colors={["#4db5ff", "#4c669f", "#2c2c6c"]}
  style={styles.container}
>
<View style={{marginBottom:20}}><Ionicons name="checkmark-done-circle-sharp" size={200} color={COLOURS.white} /></View>


      <Text style={styles.text}>Your Donation has Done successfully</Text>
      <Text style={styles.thanksText}>Thanks for donation</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  text: {
    color:"#fff",
    fontSize: 18,
    marginTop: 20,
  },
  thanksText: {
     color:"#fff",
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default DonationThanksScreen;
