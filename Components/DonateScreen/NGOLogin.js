import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOURS } from '../../Database'
import { ImageBackground } from 'react-native'
import { FontAwesome5,MaterialCommunityIcons,Entypo } from '@expo/vector-icons'; 

const NGOLogin = ({navigation}) => {
  return (
    <ImageBackground  source={require("./.././../assets/NGObg.jpg")}  style= {styles.container}>
    <View style={{alignItems:"center",marginTop:20}}>
  <Image style={{width:200, height:200}} source={require("./.././../assets/NGO.png")} />
      <Text style={{color:COLOURS.backgroundLiteBlue, fontSize:35, fontWeight:"400"}}>Welcome to NGO</Text>
      <View style={{marginVertical:40}}>
      <Text style={{color:COLOURS.white, fontSize:25, fontWeight:"300", textAlign:"justify"}}>Let's help Togather 
      </Text>
      <Text  style={{color:COLOURS.white, paddingVertical:2,fontSize:30, fontWeight:"200" ,}}>in this Pandamic!</Text>
      </View>
      </View>
    <View style={{ marginTop:"30%"}}>
    <Text style={{fontSize:23,fontWeight:"300",textAlign:"center"}}>Choose your Catagory</Text>
    <View style={{flexDirection:"row" , marginVertical:30}}>
      
      <TouchableOpacity style={{paddingHorizontal:5}} onPress={() => navigation.navigate("Donate")}>
        <View style={{ flexDirection: "column" , alignItems:"center",backgroundColor:COLOURS.backgroundDarkBlue,padding:8,borderRadius:18}}>
       <View style={{padding:12}}>
       <MaterialCommunityIcons name="login" size={35} color={COLOURS.backgroundLiteBlue} />
       </View>
         <Text style={{fontSize:10,fontWeight:400, color:COLOURS.backgroundLiteBlue}}>Register as NGO</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{paddingHorizontal:5}} onPress={() => navigation.navigate("Donate")}>
        <View style={{ flexDirection: "column" , alignItems:"center",backgroundColor:COLOURS.backgroundDarkBlue,padding:8,borderRadius:18}}>
       <View style={{padding:12}}>
       <Entypo name="eye" size={35} color={COLOURS.backgroundLiteBlue}/>
       </View>
         <Text style={{fontSize:9,fontWeight:400, color:COLOURS.backgroundLiteBlue}}>Check Doner Request</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{paddingHorizontal:5}} onPress={() => navigation.navigate("Donate")}>
        <View style={{ flexDirection: "column" , alignItems:"center",backgroundColor:COLOURS.backgroundDarkBlue,padding:8,borderRadius:18}}>
       <View style={{padding:12}}>
       <Entypo name="eye" size={35} color={COLOURS.backgroundLiteBlue}/>
       </View>
         <Text style={{fontSize:9,fontWeight:400, color:COLOURS.backgroundLiteBlue}}>Check Reciver Request</Text>
        </View>
      </TouchableOpacity>
</View>
    </View>
    </ImageBackground>
  )
}

export default NGOLogin

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
   
    backgroundColor:COLOURS.backgroundDarkBlue
    
  }
})