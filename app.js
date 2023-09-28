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
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
// import {Settings} from 'react-native-fbsdk-next';

const Drawer = createDrawerNavigator();
// Settings.setAppID('663917075834962');

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
              // color: 'black',
            },
            headerTintColor: 'white', // Change the text color of the header
            drawerActiveTintColor: 'blue', // Change the text color of the active screen in the drawer
            drawerInactiveTintColor: 'black', // Change the text color of inactive screens in the drawer
          }}>
          <Drawer.Screen
            name="ZAAP"
            component={PhotoGallery}
            // options={{
            //   title: 'Gallery',
            //   drawerIcon: ({ color, size }) => (
            //     <Image
            //       source={require('./src/assets/zaaplogo.png')}
            //       style={{ width: size, height: size, tintColor: color }}
            //       />
            //       ),
            //     }}
          />
          <Drawer.Screen
            name="Profile"
            component={AccountScreen}
            // options={{
            //   title: 'Profile', // Set the title for this screen
            //   drawerIcon: ({color, size}) => (
            //     // Add an icon for this screen in the drawer
            //     // You can use a custom icon or an image
            //     <Icon name="image" size={size} color={color} />
            //   ),
            // }}
          />
          {/* <Drawer.Screen name="DrawerNavbar" component={DrawerNavbar} /> */}
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
