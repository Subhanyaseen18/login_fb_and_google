import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React from 'react';
import { Button, Text, View } from 'react-native';
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
function App() {
  const fbLogin = () => {
    LoginManager.logOut();
    return LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      result => {
        console.log('----', result);
        //       if(result.declinedPermissions && result.declinedPermissions.includes('email')){
        //  resCallback({message :'Email is required'})
        //       }
      },
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Facebook Login React Native Example</Text>
      <Button title={'Login with Facebook'} onPress={fbLogin} />
    </View>
  );
}
export default App;
