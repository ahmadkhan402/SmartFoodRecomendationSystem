import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLOURS } from '../../Database'
import { TouchableOpacity } from 'react-native'
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { auth, db } from '../../firebase';
import { ScrollView } from 'react-native-gesture-handler';

const NGOShowList = ({navigation}) => {

   const [NGOList, setNGOList] = useState([])
   
const ShowNGOList = async()=>{
    
    const querySnapshot = await getDocs(collection(db, "NGO_Register"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
       // console.log(doc.id, " => ", doc.data());
    //   if(auth.currentUser.uid=== doc.id){
        var data = doc.data()
      
        setNGOList([data])
        console.log(NGOList)
    //   }

       
      
      
    });
}

 useEffect(()=>{
        ShowNGOList()
      },[]) 

   
      const Item = ({PickUpPoint}) => (
        <View style={styles.item}>
          <Text style={styles.title}>{PickUpPoint.PickUpPoint}</Text>
        </View>
      );
      
   
     
  return (
    <View style={styles.container}>
      { NGOList.map((item)=>(
      
        <Text>{item.ngoName}</Text>
        
        
      ))

      }  
      <View >
      <TouchableOpacity style={styles.BtnReg2 } >
          <Text style={{
              color: COLOURS.white,
             
              fontSize: 16,
              fontWeight: "300",
            }}></Text>
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
  )
}

export default NGOShowList

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
         alignItems:"center",
        // backgroundColor:COLOURS.backgroundDarkBlue
        
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