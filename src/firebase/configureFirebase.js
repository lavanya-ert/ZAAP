// firebaseConfig.js
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const configureFirebase = () => {
  GoogleSignin.configure({
    webClientId:
      '192083102814-ii4gm9r0pi053e897uls8nkj8vegal7o.apps.googleusercontent.com', // Replace with your web client ID
  });
};

export default configureFirebase;
