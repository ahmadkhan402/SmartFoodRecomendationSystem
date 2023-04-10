import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { ref, list, listAll, getDownloadURL } from "firebase/storage"
import { auth, storage, li } from '../../firebase';
import { TextInput } from 'react-native-gesture-handler';


const ShowPost = ({ navigation }) => {
  const [urls, seturl] = useState([])
  useEffect(() => {
    async function fetchImages(){
      const listRef = ref(storage, "DonationPosts/");
      const res = await listAll(listRef);
      res.items.forEach(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        seturl(urls => [...urls, url])
      })
    } fetchImages()

  }, []);




  return (
    <View style={{ flex: 1, backgroundColor:"grey", justifyContent: "center", alignItems:"center" }}>
    
      <ScrollView >
      
        {urls.map((item, key) => (
         
          <View style={styles.postCard} key={key}>
            <Image source={{ uri: item }} style={styles.Images} />
</View>
         
         
        ))}
      </ScrollView>
      
      <View style={{ padding: 35, position: "absolute", bottom: 0, right: 0 }}>
        <TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
          <Text><AntDesign name="pluscircle" size={70} color="#3457D5" /></Text>
        </TouchableOpacity>

      </View>

    </View>
  )
}

export default ShowPost

const styles = StyleSheet.create({
Images:
{
  justifyContent:"center",
  alignItems:"center",
  margin:5,
  padding:8,
  width: 300, height: 300

},
postCard:{
  
backgroundColor:"yellow",

}

})