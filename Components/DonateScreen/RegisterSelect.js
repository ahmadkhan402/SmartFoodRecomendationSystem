import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOURS } from '../../Database'
import { FontAwesome5,MaterialCommunityIcons,Entypo } from '@expo/vector-icons'; 

const RegisterSelect = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Image
          style={{ width: 180, height: 180 }}
          source={require("./.././../assets/NGO.png")}
        />
        <Text
          style={{
            color: COLOURS.backgroundLiteBlue,
            fontSize: 25,
            fontWeight: "300",
          }}
        >
          Welcome to NGO Portal
        </Text>
        <View style={{ marginVertical: 25, alignItems:"center" }}>
          <Text
            style={{
              color: COLOURS.white,
              fontSize: 22,
              fontWeight: "300",
              textAlign: "justify",
            }}
          >
            Let's help Togather
          </Text>
          <Text
            style={{
              color: COLOURS.white,
              paddingVertical: 2,
              fontSize: 28,
              fontWeight: "400",
            }}
          >
            in this Pandamic!
          </Text>
        </View>
      </View>
      <View style={{alignItems:"center", marginHorizontal:10}}>
      <Image style={{width:350,height:200,resizeMode:"cover", borderRadius:15}} source={require("./.././../assets/NGOQuotes.png")} />
      </View>
      <View style={{flexDirection:"row"}}>
      <TouchableOpacity style={styles.BtnReg2 } onPress={()=>navigation.navigate("NGOShowList")}>
          <Text style={{
              color: COLOURS.white,
             
              fontSize: 16,
              fontWeight: "300",
            }}>Already Registered NGO</Text>
        </TouchableOpacity>
       
        <TouchableOpacity style={styles.BtnReg} onPress={()=>navigation.navigate("NGOForm")}>
          <Text style={{
               color: COLOURS.white,
             
              fontSize: 16,
              fontWeight: "300",
            }}>Click To Register NGO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default RegisterSelect

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
   
    backgroundColor:COLOURS.backgroundDarkBlue
    
  },
  BtnReg : {
   paddingHorizontal:12,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
    backgroundColor: "#4db5ff",
    elevation: 40,
  },
  BtnReg2:{
    paddingHorizontal:12,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
    backgroundColor: "#4db5ff",
    elevation: 40,
    marginHorizontal:10
  }
})