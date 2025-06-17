import React, { useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '9991673773243-akvoocjsopfpdbgcsidedgh0qob19m4r.apps.googleusercontent.com',
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo);
      // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // const user = await auth().signInWithCredential(googleCredential);
      console.log('Logged in user: ', userInfo);
    } catch (error) {
      console.log('Google Sign-In Error:', error);
    }
  };

  return (
    <View>
      <Text>Google Login</Text>
      <Button title="Login with Google" onPress={signInWithGoogle} />
    </View>
  );
}
