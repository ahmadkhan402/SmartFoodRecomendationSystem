import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    Image,
    TouchableOpacity,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
 
  import { query, where, collection, getDocs } from 'firebase/firestore';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import {useIsFocused, useNavigation} from '@react-navigation/native';
import { auth, db } from '../../firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { COLOURS } from '../../Database';
  let id = '';
  const User = () => {
    const [users, setUsers] = useState([]);
    const navigation = useNavigation();
    const [mode, setMode] = useState('LIGHT');


    const isFocued = useIsFocused();
    useEffect(() => {
      if (isFocued) {
        getUsers();
      }
    }, [isFocued]);
    useEffect(() => {
      getMode();
    }, [isFocued]);
    const getMode = async () => {
      setMode(await AsyncStorage.getItem("MODE"));
    };


const getUsers = async () => {
  try {
    id =  await AsyncStorage.getItem('onLogin');
   // console.log(id)
    const tempData = [];
     email = await AsyncStorage.getItem('ShowEmail');
    // console.log(email)
    const usersCollection = collection(db,'users');
    const usersQuery = query(usersCollection, where('email', '!=', email));
    const querySnapshot = await getDocs(usersQuery);

    querySnapshot.forEach((doc) => {
      tempData.push(doc.data());
      console.log(doc.data())
    });

    setUsers(tempData);
     console.log(users)
  } catch (error) {
    // Handle errors
    console.error('Error fetching users:', error);
  }
};

    return (
      <LinearGradient
      colors={["#4db5ff", "#4c669f", "#2c2c6c"]}
      style={[
          styles.container,
          {backgroundColor: mode == 'LIGHT' ? 'white' : '#212121'},
        ]}
      >
      
        <View style={styles.header}>
          <Text style={styles.title}>Chat Available</Text>
        </View>
        <FlatList
          data={users}
          renderItem={({item, index}) => {
            console.log("this is ..." ,item)
            return (
              <TouchableOpacity
                style={[styles.userItem, {backgroundColor: 'white'}]}
                onPress={() => {
                  navigation.navigate('ChatSceens', {data: item, id: id});
                }}>
                {item.ImageUrl ? (
                <Image
                  source={{uri:item.ImageUrl}}
                  style={styles.userIconImage}
                />
                ):(
                  <Image
                  source={require('../../assets/user.png')}
                  style={styles.userIcon}
                />
                )
                }
                <Text style={styles.name}>{item.Display_Name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </LinearGradient>
    );
  };
  
  export default User;
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
    },
    header: {
      width: '100%',
      height: 60,
      backgroundColor: COLOURS.backgroundLiteBlue,
      elevation: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: COLOURS.white,
      fontSize: 20,
      fontWeight: '600',
    },
    userItem: {
      width: Dimensions.get('window').width - 50,
      alignSelf: 'center',
      marginTop: 20,
      flexDirection: 'row',
      height: 60,
      borderWidth: 0.5,
      borderRadius: 10,
      paddingLeft: 20,
      alignItems: 'center',
    },
    userIconImage:{
      borderRadius:25,
      width: 50,
      height: 50,
    },
    userIcon: {
      borderRadius:20,
      width: 50,
      height: 50,
    },
    name: {color: 'black', marginLeft: 20, fontSize: 20},
  });
  