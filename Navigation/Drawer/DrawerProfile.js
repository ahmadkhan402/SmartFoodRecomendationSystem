import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';

const  EditScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [profilePic, setProfilePic] = useState(null);


  const navigation = useNavigation();

  // function handlePress() {
  //   navigation.navigate("Form");
  // }


  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        setProfilePic(result.assets[0].uri);
      }
    }
  };

  const handleSubmit = () => {
    // submit user data to server or update local storage
  };

  return (
    
    <View style={styles.container}>
    
      <TouchableOpacity   style={styles.profilePic} onPress={handleImagePicker}> 
      <Text style={styles.icon}><Feather name="upload" size={34} color="black" />
        <Image  source={{ uri: profilePic }} />
        </Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
    
  );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    paddingTop:34,
    backgroundColor: "lightgray",
    alignItems: 'center',
    
  },
  icon:{
    marginTop:70
  },
 
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: '80%',
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor:'black',
    borderWidth:2,
    marginVertical: 20,
    backgroundColor:'gray'
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});
export default EditScreen