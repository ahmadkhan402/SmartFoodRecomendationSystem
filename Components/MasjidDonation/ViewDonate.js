import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';
import {  useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';
const ViewDonate = ({navigation}) => {
    const route = useRoute()
    const link = route.params.Link
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: link }} // Replace with your website URL
        style={styles.webview}
      />
    </View>
  )
}

export default ViewDonate

const styles = StyleSheet.create({ 
    container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
});