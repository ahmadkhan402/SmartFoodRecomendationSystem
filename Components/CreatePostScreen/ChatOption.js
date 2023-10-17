import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../../firebase';
import { query, where, collection, getDocs } from 'firebase/firestore';

let id = '';
const ChatOption = () => {
    const [users, setUsers] = useState([]);
    const [_Id, setid] = useState([]);
    const navigation = useNavigation();
    useEffect(()=>{getUsers()},[])
    const getUsers = async () => {
        try {
          id =  await AsyncStorage.getItem('onLogin');
          console.warn("This is login id",id)
          const tempData = [];
           email = await AsyncStorage.getItem('ShowEmail');
          // console.log(email)
          const usersCollection = collection(db,'users');
          const PostCollection = collection(db,'Posts');
          const usersQuery = query(usersCollection, where('email', '!=', email));
          //const PostQuery = query(PostCollection, where('Id', '!=', id));
          const PostquerySnapshot = await getDocs(PostCollection);
          const querySnapshot = await getDocs(usersQuery);
      
          PostquerySnapshot.forEach((i)=>{
            
              console.log("This is id",i.data().Id)
              querySnapshot.forEach((doc)=>{
                if(i.data().Id == doc.data().Id){
                  console.log(doc.data().Display_Name)
                    // tempData.push(doc.data());
                  }
               
                // console.log("this is User id",doc.data().Id)
                // console.log("This is pOst ids",i.data().Id)
                  // if(i.data().ID === doc.data().ID){
                  //   tempData.push(doc.data());
                  // }
              })
            })
           
            
          // querySnapshot.forEach((doc) => {
          //   tempData.push(doc.data());
          //   // PostquerySnapshot.forEach((i)=>{
          //   //   if(doc.data().Id == i.data().Id){
          //   //     // console.log(doc.data())
          //   //     tempData.push(doc.data());
          //   //   }
          //   })
            
      
          setUsers(tempData);
         console.log("thuis is the user",tempData)
        } catch (error) {
          // Handle errors
          console.error('Error fetching users:', error);
        }
      };
  return (
    <View
      style={{
        elevation: 40,
        borderColor: "#fff",
        borderWidth: 1,
        padding: 8,
        borderRadius: 20,
        backgroundColor: "#3457D5",
      }}>
      <TouchableOpacity 
      onPress={()=> navigation.navigate("Chat", { data: users, id: id })}>
        <Text>
          <Ionicons name="md-chatbox-ellipses-outline" size={25} color="#FFF" />
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default ChatOption

const styles = StyleSheet.create({})