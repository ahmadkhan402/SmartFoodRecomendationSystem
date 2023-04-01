import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Slider from './Slider'
import { ScrollView } from 'react-native'


const DonateScreen = () => {
  return (
    <ScrollView style={{flex:1}}>
    <View style={styles.Slider}>
      
      <Slider/>
      

    </View>
    </ScrollView>
  )
}

export default DonateScreen

const styles = StyleSheet.create({
  Slider: {
        backgroundColor:"#2c2c6c"
    },
})