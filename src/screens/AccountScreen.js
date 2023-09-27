import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {loginUser, logoutUser} from '../redux/actions/authActions';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const AccountScreen = () => {
  const userLoggedIn = useSelector(state => state.auth.userLoggedIn);
  const userEmail = useSelector(state => state.auth.userEmail);
  console.log('userEmail', userEmail);
  const dispatch = useDispatch();
  const handleGoogleSignIn = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log('googleCredential', googleCredential);
      const user = await auth().signInWithCredential(googleCredential);
      console.log('user', user);
      // Sign in with Firebase
      if (user) {
        const email = user.user.email;
        console.log('User Email:', email);
        dispatch(loginUser(email));
      } else {
        console.log('User not found or not signed in.');
      }
    } catch (error) {
      console.error('Google Sign-In Error: ', error);
    }
  };
  const handleLogout = () => {
    // Sign out from Firebase
    auth().signOut();

    dispatch(logoutUser());
  };
  return (
    <View style={styles.screenContainer}>
      <Image source={require('../assets/zaaplogo.png')} style={styles.image} />
      {userLoggedIn ? (
        <View>
          <Text>User Email: {userEmail}</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity style={styles.button} onPress={handleGoogleSignIn}>
            <Text>Login with Google</Text>
          </TouchableOpacity>

          {/* Add Facebook login button or other login methods here */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightcoral',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    // maxWidth: 100,
    marginTop: 30,
    borderRadius:10,
    marginBottom:50,

  },
});

export default AccountScreen;
