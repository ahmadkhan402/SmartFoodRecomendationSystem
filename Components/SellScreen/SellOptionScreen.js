import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';

const SellOptionScreen = ({ navigation }) => {
    const handleRoleSelection = (role) => {
      // Handle the role selection here (e.g., navigate to the appropriate screens for buyer/seller)
      if (role === 'buyer') {
        // Navigate to the buyer's screen
        navigation.navigate('Buyer');
      } else if (role === 'seller') {
        // Navigate to the seller's screen
        navigation.navigate('Seller');
      }
    };
  
    return (
      
      <ImageBackground
      style={styles.Imagecontainer}
      source={require("./../../assets/sell1.jpg")}
    >
    <View >
      <Text style={{color:"#fff" , fontSize:50, fontWeight:"900"}}>Sell & Buy</Text>
      <Text style={{color:"#fff" , fontSize:15,textAlign:'center' }}>Sell expire Products</Text>
    </View>
    <View style={{justifyContent:"center", marginTop:"5%",  alignItems:"center"}}>
      <Text style={{color:"#fff", fontSize:25,fontWeight:"500", textAlign:"center"}}>Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time</Text>
    </View>
     
      {/* <View style={ styles.miniContainer}> */}
      <View style={{ flexDirection:"row", marginTop:"40%",justifyContent:"flex-end",alignContent:"flex-end",alignItems:"flex-end" }}>
        <TouchableOpacity onPress={() => handleRoleSelection('buyer')} style={styles.roleButton}>
          <Text style={styles.roleButtonText}>I am a Buyer</Text>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={() => handleRoleSelection('seller')} style={styles.roleButton}>
          <Text style={styles.roleButtonText}>I am a Seller</Text>
        </TouchableOpacity>
        </View>
      </ImageBackground>
     
    );
  };
  

export default SellOptionScreen
const styles = StyleSheet.create({
    
    Imagecontainer:{
      flex:1,
      width:'100%',
      height:'100%',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign:"center"
       },
    roleButton: {
      backgroundColor: '#2c2c6c',
     
      padding: 17,
      borderRadius: 10,
      margin:"5%"

    },
    roleButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
   
  });
  