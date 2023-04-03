import { StyleSheet, Text, TouchableOpacity, View,Image, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import React, { useState,useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { ref, list, listAll, getDownloadURL } from "firebase/storage"
import { auth,storage, li } from '../../firebase';


const ShowPost = ({navigation}) => {
  const [urls , seturl] = useState([])
  console.log('ther are the url ',urls)
  // useEffect(()=>{    
  //   (async function(){

  //     // const storageRef = ref(storage, 'DonationPosts/');
  //     // const result = await listAll(storageRef);
  //     // console.log(result);
  //     // const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef));
  //     // const resolvedPromised = await Promise.all(urlPromises);
  //     // console.log(resolvedPromised)
      
  // })},[]);

  async function fetchImages(){
    console.log("Function caLLED");
    
    const listRef = ref(storage,"DonationPosts/");
   // var fetchUrl = []
    //seturl(fetchUrl)
    //console.log("List Ref Fetched", fetchUrl);
    const res = await listAll(listRef);
    console.log("Res Fetched");
    
      res.items.forEach(async (itemRef)=>{
        
        console.log("Loop Fetched");
        
    
        const url =await getDownloadURL(itemRef);
        //  fetchUrl.push(url)
        console.log(url)
        seturl(urls => [...urls,url])
         
       
      })
  }

 
  return (
    <View style={{flex:1}}>
   <TouchableOpacity onPress={fetchImages}><Text>
 Fetch Images
 </Text></TouchableOpacity>
<ScrollView style={{flex:1}}>
 { urls.map((item,key )=> (
                <View style={{ justifyContent: 'center' }} key={key} >
                
                    <Image source={{ uri: item }} style={{ width: 350, height: 350 }} /> 
                    
                </View>
                ))}
                </ScrollView>
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