import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react'
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { ref, list, listAll, getDownloadURL } from "firebase/storage"
import { auth, storage, db } from '../../firebase';
import { TextInput } from 'react-native-gesture-handler';
import { Timestamp, collection, getDocs } from "firebase/firestore"; 


const ShowPost = ({ navigation }) => {

  const [Data, setData] = useState([])
  const [ID, setid] = useState([])
  console.log('the data is ', Data)
  
  // console.log('the description is ', Data.description)
  const [urls, seturl] = useState([])
  // console.log("here is the title", Data.title)
 
  const isFocused = useIsFocused()
  //setData(newArray)
  useEffect(() => {
    async function fetchImages() {
      const querySnapshot = await getDocs(collection(db, "Posts"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());

        // console.log('here is the datA',doc.data())
        const data =  doc.data()
        const id = doc.id
        Data.length=0;
        setid(id)
        if(id!==data.id){
          setData(Data => [...Data,data])
          console.log("i am here", )
        }

      })
      
    }  if(isFocused){ 
      fetchImages()
  }

  },[isFocused]);




  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.scrollContainer} >
        {Data.map((item, key) => (


          <View style={styles.card} >
            <View style={styles.textContainer} key={key}>
              <Text style={styles.textTitle}> {item.Title}</Text>
              <Text style={styles.txt}>{item.Description}</Text>
              <Text style={styles.txt}>Time: {item.Time}</Text>
              <Text style={styles.txt}>Quantity of Meal: {item.SelectedNumber}</Text>
              <Text style={styles.PickUpPoint}>Pick-Up Point: {item.PickUpPoint}</Text>
            </View>
            <Image source={{ uri: item.ImageUrl }} style={styles.Image} />
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    padding: 10,
  },
  textContainer: {
    padding: 10,
    marginLeft:2
  },
card: {
  backgroundColor: '#fff',
  borderRadius: 10,
  overflow: 'hidden',
  marginBottom: 20,
  shadowColor: 'black',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 1,
  shadowRadius: 2,
  elevation: 2,
},
Image: {
  height: 200,
  width: '100%',
},
textTitle:{
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
},
PickUpPoint:{
  backgroundColor:"#F0F8FF",
  borderRadius:5,
  padding:10,
  fontWeight:"500"
},
txt:{
fontSize:14,
fontWeight:"500",
padding:5
}

})

// const listRef = ref(storage, "DonationPosts/");
      // const res = await listAll(listRef);
      // res.items.forEach(async (itemRef) => {
      //   const url = await getDownloadURL(itemRef);
      //   seturl(urls => [...urls, url])
      // })