
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { COLOURS } from '../../Database';
import { TouchableOpacity } from 'react-native';




const WeightGainScreen = ({navigation}) => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [resultLoss, setResultLoss] = useState(null);

  return (
    <LinearGradient colors={['#4db5ff', '#4c669f', '#2c2c6c']} style={styles.container}>
    <View style={styles.MinCont}>
      <Text style={{textAlign:"center",color:COLOURS.backgroundDarkBlue, fontSize:15,fontWeight:"600"}}>Please enter your details:</Text>
      <Text style={styles.Name}>Age:</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter your age"
            value={age}
            keyboardType='numeric'
            onChangeText={(text) => setAge(text)}
          />
        </View>
        <Text style={styles.Name}>Weight:</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter your Weight (kg)"
            value={weight}
            keyboardType='numeric'
            onChangeText={(text) => setWeight(text)}
          />
        </View>
        <Text style={styles.Name}>Height:</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter your Height (m)"
            value={height}
            keyboardType='numeric'
            onChangeText={(text) => setHeight(text)}
          />
        </View>
       
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.touchableOpacity} onPress={()=>navigation.navigate("ResultWeightGain",{age,weight,height})}>
        <Text style={styles.buttonText}>Get Recommended Food</Text>
      </TouchableOpacity>
      </View>
       
      </View>

    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
   
  },
  touchableOpacity: {
    
    backgroundColor:COLOURS.backgroundLiteBlue,
    borderRadius: 20,
    padding: 10,
    alignItems:"center",
    alignSelf:"center",
   elevation:20
  },
  MinCont:{
    justifyContent:"center",
    marginHorizontal:25,
    paddingHorizontal:20,
    paddingVertical:50,
    backgroundColor:COLOURS.backgroundLight,
    borderRadius:10
  },
  buttonText: {
    color:COLOURS.white,
    fontSize: 18,
    textAlign: 'center',
    fontWeight:"500",
    paddingHorizontal:16

  },
  buttonContainer: {
   marginTop:26,
  },
  inputView: {
    backgroundColor: COLOURS.backgroundLight,
    borderColor: "#4db5ff",
    borderWidth: 1,
    borderRadius: 30,
    height: 45,
    marginBottom: 20,
    paddingLeft:16
   
  },
  TextInput: {
    color:COLOURS.backgroundDarkBlue,
    textAlign:"left",
    flex: 1,
    padding: 10,
   
  },
  Name:{
    paddingVertical:10,
    fontSize:17,
    fontWeight:"600",
    
    color:COLOURS.backgroundDarkBlue,
  },
});

export default WeightGainScreen;
