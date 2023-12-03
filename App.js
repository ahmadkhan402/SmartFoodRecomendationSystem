import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import GenralRoutes from './Navigation/Stack/GenralRoutes';
import MapShow from './Components/CreatePostScreen/MapShow';


export default function App() {
  return (
    
    <NavigationContainer>
    <GenralRoutes/>
    </NavigationContainer>
  );
}
;
