import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Slider from './Slider'
import { ScrollView } from 'react-native'
import ListOfNGO from './ListOfNGO'


const DonateScreen = () => {
  return (
  <View>
   {/* <View style={{flex:1}}> */}
    <View style={styles.Slider}>
      <Slider/>
    </View>
    <View style={styles.ngos}>
     <ListOfNGO/>
     </View>
     </View>
  )
}

export default DonateScreen

const styles = StyleSheet.create({
  Slider: {
        backgroundColor:"#2c2c6c"
    },
    ngos:{
      marginTop:10
    }
})