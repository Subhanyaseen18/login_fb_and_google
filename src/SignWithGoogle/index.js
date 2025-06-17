import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithCredential,
} from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '909486087649-84dhivmv76l8f33gnvtu9liq9j9qck4j.apps.googleusercontent.com', // for web sign-in
});

// export async function onGoogleButtonPress() {
//   // Check if your device supports Google Play
//   await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//   // Get the users ID token
//   const signInResult = await GoogleSignin.signIn();

//   // Try the new style of google-sign in result, from v13+ of that module
//   idToken = signInResult.data?.idToken;
//   if (!idToken) {
//     // if you are using older versions of google-signin, try old style result
//     idToken = signInResult.idToken;
//   }
//   if (!idToken) {
//     throw new Error('No ID token found');
//   }

//   // Create a Google credential with the token
//   const googleCredential = GoogleAuthProvider.credential(
//     signInResult.data.idToken,
//   );

//   // Sign-in the user with the credential
//   return signInWithCredential(getAuth(), googleCredential);
// }
