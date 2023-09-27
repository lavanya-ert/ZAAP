import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

// Define your individual screens here (e.g., HomeScreen, AllJobsScreen, etc.)

const HomeScreen = ({navigation}) => (
  <View style={styles.screenContainer}>
    <Text>Home Screen</Text>
  </View>
);

const AllJobsScreen = ({navigation}) => (
  <View style={styles.screenContainer}>
    <Text>All Jobs Screen</Text>
  </View>
);

const AccountScreen = ({navigation}) => (
  <View style={styles.screenContainer}>
    <Text>Account Screen</Text>
  </View>
);

// Create a custom drawer content component
const CustomDrawerContent = props => (
  <DrawerContentScrollView {...props}>
    <DrawerItemList {...props} />
    <DrawerItem
      label="Custom Item"
      onPress={() => {
        // Handle custom item click
      }}
    />
  </DrawerContentScrollView>
);

// Create a Drawer Navigator
const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Account" component={AccountScreen} />
      <Drawer.Screen name="Home" component={HomeScreen} />
      {/* <Drawer.Screen name="Home" component={HomeScreen} /> */}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNavigator;
