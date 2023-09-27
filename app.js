import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import DrawerNavbar from './src/components/DrawerNavbar';
import PhotoGallery from './src/components/PhotoGallery';
import 'react-native-gesture-handler';
import AccountScreen from './src/screens/AccountScreen';
import auth from '@react-native-firebase/auth';
import configureFirebase from './src/firebase/configureFirebase';

const Drawer = createDrawerNavigator();

const App = () => {
  useEffect(() => {
    // Initialize Firebase by calling the configureFirebase function
    configureFirebase();
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="PhotoGallery"
          screenOptions={{
            headerStyle: {
              backgroundColor: 'grey', // Change the background color of the header
              color: 'black',
            },
            headerTintColor: 'white', // Change the text color of the header
            drawerActiveTintColor: 'blue', // Change the text color of the active screen in the drawer
            drawerInactiveTintColor: 'black', // Change the text color of inactive screens in the drawer
          }}>
          <Drawer.Screen name="PhotoGallery" component={PhotoGallery} />
          <Drawer.Screen name="Profile" component={AccountScreen} />
          {/* <Drawer.Screen name="DrawerNavbar" component={DrawerNavbar} /> */}
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
