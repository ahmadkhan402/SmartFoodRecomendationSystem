import React, { useId, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from 'react-native';

 // For picking images from the gallery
import * as ImagePicker from 'expo-image-picker';
import uniqueId from 'lodash/uniqueId';
import { StatusBar } from 'react-native';
import { nativeID } from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { COLOURS, Items } from '../../../Database';
import { auth, db, storage } from '../../../firebase';
import { addDoc, collection, doc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { Picker } from '@react-native-picker/picker';


const SellerScreen = ({navigation}) => {
 // const [id, setid] = useState(uniqueId('Product id : '));

  const [blobImage, setblob] = useState(null)
  const [ category, setcategory] = useState("")
  const [ productName, setproductName ] = useState("")
  const [ productPrice,setproductPrice ] = useState("")
  const [ description,setdescription ] = useState("")
  const [ offPercentage, setoffPercentage] = useState("")
  const [productImage, setProductImage] = useState("")
  const [isAvailable, setisAvailable] = useState(false)
  const [productImageList,setproductImageListsetset ] = useState([])
const [Download,setDownload]  = useState("")


// console.log(formData.id)
  /// for async storage50
  // const handleSave = async () => {
  //   try {
  //     const formDataJson = JSON.stringify(formData);
  //     await AsyncStorage.setItem('@FormData', formDataJson);
  //   } catch (error) {
  //     console.error('Error saving form data:', error);
  //   }
  // };
  // Function to open the gallery and select an image
  const handleSelectImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        title: 'Select Product Image',
        mediaTypes: ImagePicker.MediaTypeOptions.All, // We can  specify whether we need only Images or Videos
        allowsEditing: true,
        aspect: [1,1],
        quality: 1,   // 0 means compress for small size, 1 means  compress for maximum quality
      });
  
      console.log(result.assets[0].uri);
  
     
    if (!result.canceled) {
      setProductImage(result.assets[0].uri);
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      setblob(blob)
    }
}

  const SaveDataToDatabase = async () => {
 
    const metadata = {
      contentType: 'image/jpeg'
    };
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'SellItems/' + Date.now());
    const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       alert('Upload is ' + progress + '% done');

        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          
           setSellDataToFireStore(downloadURL)
          // console.log("Image"+ShowImage);
  
          // Add title and description to Firebase database
       
         
          
        },[]);
        alert("Post is Uploaded")
    navigation.navigate("Buyer")
        
      }
     
    );
    
  }
  const setSellDataToFireStore = async (downloadURL)=>{
    try {
      const docRef = await addDoc(collection(db, "SellItems"), {
        // ID: id,
        Category : category,
      ProductName : productName,
      ProductPrice: productPrice,
      Description: description,
      ImageUrl: downloadURL,
      OffPercentage: offPercentage,
     

    });
      
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  return (
    <ScrollView contentContainerStyle={styles.SCROLL }>
    <StatusBar
        backgroundColor={COLOURS.backgroundLight}
        barStyle="dark-content"
      />
      <View style={{justifyContent:"center",alignItems:"center"}}>
      <Text style={{ color:COLOURS.black, fontWeight:900,fontSize:26}}>Sell Your item</Text>
      <Text style={{color:COLOURS.white, fontWeight:400,fontSize:15}}>Fill the form data according to yours selling product</Text></View>
      {/* <Text>ID:</Text>
      <TextInput value={id} style={styles.input} /> */}

      <Text>Category:</Text>
      <Picker
           style={styles.input}
        selectedValue={category}
        onValueChange={(itemValue) => setcategory(itemValue)}>
        <Picker.Item label="Fruit" value="Fruit" />
        <Picker.Item label="Food" value="Food" />
        <Picker.Item label="Other" value="Other" />
      </Picker>


      <Text>Product Name:</Text>
      <TextInput
        placeholder="Enter the text"
        onChangeText={(e)=>setproductName(e)}
        style={styles.input}
      />

      <Text>Product Price:</Text>
       <TextInput placeholder="Enter the text" onChangeText={(e)=>setproductPrice(e)} style={styles.input} /> 

      <Text>Description:</Text>
      <TextInput placeholder="Enter the text" onChangeText={(e)=>setdescription(e)} style={styles.input} />

      <Text>Off Percentage:</Text>
      <TextInput placeholder="Enter the text" onChangeText={(e)=>setoffPercentage(e)} style={styles.input} />

      <Text>Product Image:</Text>
      {productImage ? (
        <Image source={{ uri: productImage }} style={styles.imagePreview} />
      ) : (
        <TouchableOpacity onPress={handleSelectImage} style={styles.imagePicker}>
          <Text>Select Image from Gallery</Text>
        </TouchableOpacity>
      )}

      

      {/* <Text>Is Available:</Text>
      <TextInput
        value={isAvailable.toString()}
        onChangeText={(value) => setisAvailable(value === 'true')}
        style={styles.input}
      /> */}
    <TouchableOpacity onPress={SaveDataToDatabase}  style={styles.saveButton}>
        <Text>Save Data</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = {
  SCROLL:{
    padding:20,
    backgroundColor:COLOURS.backgroundMedium

  },
  input: {
    borderColor: COLOURS.backgroundMedium,
    backgroundColor:COLOURS.backgroundLight,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  imagePicker: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginBottom: 10,
    marginVertical:10,
  alignSelf:"center"
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButton:{
    backgroundColor: COLOURS.backgroundDark,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  }
};

export default SellerScreen;
