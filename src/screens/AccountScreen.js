import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Button,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {loginUser, logoutUser} from '../redux/actions/authActions';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {LoginManager} from 'react-native-fbsdk-next';

const AccountScreen = () => {
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);
  const userLoggedIn = useSelector(state => state.auth.userLoggedIn);
  const userEmail = useSelector(state => state.auth.userEmail);
  console.log('userEmail', userEmail);
  const dispatch = useDispatch();

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {accessToken, idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const user = await auth().signInWithCredential(googleCredential);
      const email = user.user.email;
      dispatch(loginUser(email));
      setloggedIn(true);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const handleLogout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setloggedIn(false);
      setuserInfo([]);
      dispatch(logoutUser());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          // style={styles.scrollView}
        >
          <View
          // style={styles.body}
          >
            <View
            // style={styles.sectionContainer}
            >
              <GoogleSigninButton
                style={{width: 192, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={handleGoogleSignIn}
              />
            </View>
            <View style={styles.buttonContainer}>
              {!loggedIn && <Text>You are currently logged out</Text>}
              {loggedIn && (
                <View>
                  <Text>User Email: {userEmail}</Text>
                  <Button onPress={handleLogout} title="LogOut" color="red" />
                </View>
              )}
            </View>
            {/* <Button
              title={'Login with Facebook'}
              onPress={() => {
                LoginManager.logInWithPermissions([
                  'public_profile',
                  'email',
                ]).then(
                  function (result) {
                    if (result.isCancelled) {
                      alert('Login Cancelled ' + JSON.stringify(result));
                    } else {
                      alert(
                        'Login success with  permisssions: ' +
                          result.grantedPermissions.toString(),
                      );
                      alert('Login Success ' + result.toString());
                    }
                  },
                  function (error) {
                    alert('Login failed with error: ' + error);
                  },
                );
              }}
            /> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
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
    borderRadius: 10,
    marginBottom: 50,
  },
});

export default AccountScreen;
