import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';

const Map = () => {
  const route = useRoute();
  const id = route.params.id;
  const Coords = route.params.Coords;
  const ListNgo = route.params.NGOList;
  
  console.log(Coords.latitude)
  const [longitudeValue, setLongitudeValue] = useState(null);
  const [latitudeValue, setLatitudeValue] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [ Title ,  setTitle ] = useState(null);
  const [ ID ,  setid ] = useState(null);
  useEffect(() => {
    const Title = ListNgo.find((i)=>i.locationData !== undefined )
    if(Title){
        setTitle(Title.locationData)
    }
   
  }, [ListNgo]);

  const latitude = Coords.latitude
  const longitude = Coords.longitude;

  const region = {
    latitude: Coords.latitude,
    longitude: Coords.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };
  const circle = {
    center: {
      latitude,
      longitude,
    },
    radius: 250, 
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        <Marker
          coordinate={{ latitude, longitude }}
          title="NGO Location"
          description= {Title} 
        />
          <Circle
          center={circle.center}
          radius={circle.radius}
          strokeWidth={2}
          strokeColor="rgba(0, 0, 255, 0.5)"
          fillColor="rgba(0, 0, 255, 0.2)"
        />
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Show Location Details</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Location Details</Text>
          <Text>Location: {Title}</Text>
          <Text>Latitude: {latitude}</Text>
          <Text>Longitude: {longitude}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
});

export default Map;
