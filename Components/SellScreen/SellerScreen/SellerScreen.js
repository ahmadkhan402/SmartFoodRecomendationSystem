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

const SellerScreen = () => {
  const [id] = useState(uniqueId('Product id : '));

const [formData, setFormData] = useState({
  category: '',
  productName: '',
  productPrice: '',
  description: '',
  offPercentage: '',
  productImage: null,
  isAvailable: false,
  productImageList: [],
});
console.log(formData.id)
  /// for async storage50
  const handleSave = async () => {
    try {
      const formDataJson = JSON.stringify(formData);
      await AsyncStorage.setItem('@FormData', formDataJson);
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  };
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
   

  // Function to add the selected image to the productImageList
  const handleAddImageToList = () => {
    if (productImage) {
      setProductImageList([...productImageList, productImage]);
      setProductImage(null);
    }
  };

  const handleChangeId = (id) => {
    setFormData((prevFormData) => ({ ...prevFormData, id: id}));
  };

  const handleChangeCategory = (text) => {
    setFormData((prevFormData) => ({ ...prevFormData, category: text }));
  };

  const handleChangeProductName = (text) => {
    setFormData((prevFormData) => ({ ...prevFormData, productName: text }));
  };
  const handleProductPrice = (text) => {
    setFormData((prevFormData) => ({ ...prevFormData, productPrice: text }));
  };
  const handleDescription = (text) => {
    setFormData((prevFormData) => ({ ...prevFormData, description: text }));
  };
  const handleOffPercentage = (text) => {
    setFormData((prevFormData) => ({ ...prevFormData, offPercentage: text }));
  };
  return (
    <ScrollView contentContainerStyle={styles.SCROLL }>
    <StatusBar
        backgroundColor={COLOURS.backgroundLight}
        barStyle="dark-content"
      />
      <View style={{justifyContent:"center",alignItems:"center"}}>
      <Text style={{ color:COLOURS.black, fontWeight:900,fontSize:26}}>Sell Your item</Text>
      <Text style={{color:COLOURS.white, fontWeight:400,fontSize:15}}>Fill the form data according to yours selling product</Text></View>
      <Text>ID:</Text>
      <TextInput value={id} onChangeText={handleChangeId} style={styles.input} />

      <Text>Category:</Text>
      <TextInput value={formData.category} onChangeText={handleChangeCategory} style={styles.input} />

      <Text>Product Name:</Text>
      <TextInput
        value={formData.productName}
        onChangeText={handleChangeProductName}
        style={styles.input}
      />

      <Text>Product Price:</Text>
       <TextInput value={formData.productPrice} onChangeText={handleProductPrice} style={styles.input} /> 

      <Text>Description:</Text>
      <TextInput value={formData.description} onChangeText={handleDescription} style={styles.input} />

      <Text>Off Percentage:</Text>
      <TextInput value={formData.offPercentage} onChangeText={handleOffPercentage} style={styles.input} />

      <Text>Product Image:</Text>
      {formData.productImage ? (
        <Image source={{ uri: productImage }} style={styles.imagePreview} />
      ) : (
        <TouchableOpacity onPress={handleSelectImage} style={styles.imagePicker}>
          <Text>Select Image from Gallery</Text>
        </TouchableOpacity>
      )}

      {formData.productImage && (
        <TouchableOpacity onPress={handleAddImageToList} style={styles.addButton}>
          <Text>Add Image to List</Text>
        </TouchableOpacity>
      )}

      {formData.productImageList.length > 0 && (
        <View>
          <Text>Product Image List:</Text>
          {productImageList.map((imageUri, index) => (
            <Image key={index} source={{ uri: imageUri }} style={styles.imagePreview} />
          ))}
        </View>
      )}

      <Text>Is Available:</Text>
      <TextInput
        value={formData.isAvailable.toString()}
        onChangeText={(value) => setIsAvailable(value === 'true')}
        style={styles.input}
      />
    <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
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
