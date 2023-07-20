import * as React from 'react';
import { Text, View, TouchableOpacity, Button, useWindowDimensions, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import GenralRoutes from './Navigation/Stack/GenralRoutes';
import MapShow from './Components/CreatePostScreen/MapShow';


export default function App() {
  return (
    
    <NavigationContainer>
    <GenralRoutes/>
    {/* <DrawerNavigator/> */}
    </NavigationContainer>
  );
}
;
const styles = StyleSheet.create({

  button: {
    position: 'absolute',
    top: 0,
    left: 333,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: 4,
  },

})


// import * as React from 'react';
// import { View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';

// function Feed() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Feed Screen</Text>
//     </View>
//   );
// }

// function Notifications() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Notifications Screen</Text>
//     </View>
//   );
// }

// function Profile() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Profile Screen</Text>
//     </View>
//   );
// }

// const Drawer = createDrawerNavigator();

// function MyDrawer() {
//   return (
//     <Drawer.Navigator useLegacyImplementation initialRouteName="Feed">
//       <Drawer.Screen
//         name="Feed"
//         component={Feed}
//         options={{ drawerLabel: 'Home' }}
//       />
//       <Drawer.Screen
//         name="Notifications"
//         component={Notifications}
//         options={{ drawerLabel: 'Updates' }}
//       />
//       <Drawer.Screen
//         name="Profile"
//         component={Profile}
//         options={{ drawerLabel: 'Profile' }}
//       />
//     </Drawer.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <MyDrawer />
//     </NavigationContainer>
//   );
// }
