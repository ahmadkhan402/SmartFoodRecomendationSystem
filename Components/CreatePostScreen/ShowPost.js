import { StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import React, { useState,useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { ref, list, listAll, getDownloadURL } from "firebase/storage"
import { auth,storage, li } from '../../firebase';


const ShowPost = ({navigation}) => {
  const [url , seturl] = useState('')
  fetchImages = async () => {
    const storageRef = ref(storage, 'DonationPosts/');
    const result = await listAll(storageRef);
  
    const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef));
  
    return Promise.all(urlPromises);
   
}

 
  return (
    <View style={{flex:1}}>
   
      <View style={{padding:35, position:"absolute", bottom:0, right:0}}>
          <TouchableOpacity onPress={()=>navigation.navigate('CreatePost')}>
              <Text><AntDesign name="pluscircle" size={70} color="#3457D5" /></Text>
          </TouchableOpacity>
          
 </View>
 <TouchableOpacity ><Text>press</Text></TouchableOpacity>
 <View style={{ justifyContent: 'center' }} >
                    <Image source={{ uri: url }} style={{ width: 350, height: 350 }} /> 
                </View>
 {/* { sampleImage && getSampleImage.map(Image => (
                <View style={{ justifyContent: 'center' }} key={imageRef.id}>
                    <Image source={{ uri: sampleImage.get(k) }} style={{ width: 350, height: 350 }} /> 
                </View>
                ))} */}
    </View>
  )
              }

export default ShowPost

const styles = StyleSheet.create({})