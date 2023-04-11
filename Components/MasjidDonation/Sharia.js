import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import SearchMosque from './SearchMosque';
const mosqueData = [
  {
    id: '1',
    name: 'Jamia Masjid, CUI Attock (New Campus)',
    imageSource:'https://lh5.googleusercontent.com/p/AF1QipPaOvshVvA5_6ZPKvZ_4zc7KtPJB-y77MupHw4Y=w480-h300-k-n',
  },
  {
    id: '2',
    name: 'Markazi Jamia Masjid Attock City',
    imageSource: 'https://scontent.fisb5-2.fna.fbcdn.net/v/t1.6435-9/121028987_3546509645460753_5785816356864776966_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=730e14&_nc_ohc=gQk8yMu6eCUAX-wCkQ0&_nc_ht=scontent.fisb5-2.fna&oh=00_AfAeeVjB2R6WhTVp5C0hCk7JPx2qz8oq00lr88jSNzb7RA&oe=645B2B44',
  },
  {
    id: '3',
    name: 'Jamia Masjid Attock',
    imageSource: 'data:image/jpeg;base64,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'
  },
  // {
  //   id: '4',
  //   name: 'Example Mosque 4',
  //   imageSource: require('./example-mosque-4.jpg'),
  // },
];

const MosqueScreen = () => {

  const handleDonateFood = (id) => {
    // Handle the "Donate Food" button press for the mosque with the given ID
  };

  const renderMosqueCard = (mosque) => {
    return (
      
      <TouchableOpacity key={mosque.id} style={styles.card} onPress={() => handleDonateFood(mosque.id)}>
        <Image source={{uri: mosque.imageSource}}  style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{mosque.name}</Text>
          <TouchableOpacity style={styles.button} onPress={() => handleDonateFood(mosque.id)}>
            <Text style={styles.buttonText}>Donate Food</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
    <View style={styles.SearchMosque}>
    <SearchMosque/>
    </View>
    <View style={{marginTop:"32%"}}>
    
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      
        {mosqueData.map((mosque) => renderMosqueCard(mosque))}
      </ScrollView>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    padding: 10,
    
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
  SearchMosque:{
    position:"absolute",
    top:0,
    width:"100%"
  },
  image: {
    height: 150,
    width: '100%',
  },
  textContainer: {
    padding: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MosqueScreen;
