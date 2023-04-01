import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const ShowPost = ({navigation}) => {
    
  return (
    <View style={{flex:1}}>
   
      <View style={{padding:35, position:"absolute", bottom:0, right:0}}>
          <TouchableOpacity onPress={()=>navigation.navigate('CreatePost')}>
              <Text><AntDesign name="pluscircle" size={70} color="#3457D5" /></Text>
          </TouchableOpacity>
 </View>
    </View>
  )
}

export default ShowPost

const styles = StyleSheet.create({})