import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  
} from 'react-native';
import { COLOURS } from '../../Database';

const RecomendationOptionScreen = ({navigation}) => {
  return (
    <LinearGradient colors={['#4db5ff', '#4c669f', '#2c2c6c']} style={styles.container}>
    
      <Text style={styles.title}>Food for You!</Text>
      <Text style={styles.paragraph}>
        Eating healthy is essential for maintaining good health and preventing chronic
        diseases. It provides your body with the nutrients it needs to function
        properly and helps you feel your best.
      </Text>
      <Image  source={require("./../../assets/imbg.webp")} style={{width:"90%", height:"35%",alignSelf:"center",borderRadius:10,marginTop:10}} />
      <Text style={{ textAlign:"left", marginTop: 70 ,color:"#fff",justifyContent:"center" , paddingHorizontal:16}}>
        What are you looking for today?
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.touchableOpacity} onPress={()=>navigation.navigate("WeightLoss")}>
          <Text style={styles.buttonText}>Weight Loss</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableOpacity} onPress={()=>navigation.navigate("WeightGain")}>
          <Text style={styles.buttonText}>Weight Gain</Text>
        </TouchableOpacity>
      </View>
      
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      justifyContent:"center",
      

    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      marginTop: 50,
    },
    paragraph: {
      fontSize: 16,
      color: '#ccc',
      textAlign: 'justify',
      marginTop: 20,
      paddingHorizontal: 16,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
    },
    touchableOpacity: {
      backgroundColor:COLOURS.backgroundLiteBlue,
      borderRadius: 5,
      padding: 10,
      width: 150,
      elevation:20
    },
    buttonText: {
        color:"#fff",
      fontSize: 18,
      textAlign: 'center',
    },
  });
  
export default RecomendationOptionScreen;
