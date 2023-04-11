import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchMosque = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    // Handle search functionality here
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="#777" style={{ marginRight: 10 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a mosque"
          placeholderTextColor="#777"
          onChangeText={text => setSearchText(text)}
          value={searchText}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.results}>
        {/* Display search results here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginLeft: 10,
  },
  searchButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  results: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchMosque;
