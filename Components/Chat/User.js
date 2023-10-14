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
  let id = '';
  const User = () => {
    const [users, setUsers] = useState([]);
    const navigation = useNavigation();
    const [mode, setMode] = useState('LIGHT');
    const isFocued = useIsFocused();
    useEffect(() => {
      getUsers();
    }, []);
    useEffect(() => {
      getMode();
    }, [isFocued]);
    const getMode = async () => {
      setMode(await AsyncStorage.getItem('MODE'));
    };


const getUsers = async () => {
  try {
    id =  await AsyncStorage.getItem('onLogin');
    console.log(id)
    const tempData = [];
     email = await AsyncStorage.getItem('ShowEmail');
     console.log(email)
    // Assuming you have already initialized Firebase v9
    const usersCollection = collection(db,'users');
    const usersQuery = query(usersCollection, where('email', '!=', email));
    const querySnapshot = await getDocs(usersQuery);

    querySnapshot.forEach((doc) => {
      tempData.push(doc.data());
    });

    setUsers(tempData);
  } catch (error) {
    // Handle errors
    console.error('Error fetching users:', error);
  }
};

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: mode == 'LIGHT' ? 'white' : '#212121'},
        ]}>
        <View style={styles.header}>
          <Text style={styles.title}>Chat Available</Text>
        </View>
        <FlatList
          data={users}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={[styles.userItem, {backgroundColor: 'white'}]}
                onPress={() => {
                  navigation.navigate('Chat', {data: item, id: id});
                }}>
                <Image
                  source={require('../../assets/user.png')}
                  style={styles.userIcon}
                />
                <Text style={styles.name}>{item.Display_Name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
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
      backgroundColor: 'white',
      elevation: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: 'purple',
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
    userIcon: {
      width: 40,
      height: 40,
    },
    name: {color: 'black', marginLeft: 20, fontSize: 20},
  });
  