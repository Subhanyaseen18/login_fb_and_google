import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';

export default function App() {
  const [userInfo, setUserInfo] = useState({});

  const logoutWithFacebook = () => {
    LoginManager.logOut();
    setUserInfo({});
  };

  const getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name,email,picture.type(large)',
      },
    };

    const profileRequest = new GraphRequest(
      '/me',
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, user) => {
        if (error) {
          console.log('Login info has error: ', error);
          Alert.alert('Error', 'Failed to fetch user info');
        } else {
          console.log('User Info: ', user);
          setUserInfo(user);
        }
      },
    );

    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const loginWithFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (result.isCancelled) {
        console.log('Login cancelled');
        return;
      }

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        Alert.alert('Error', 'Failed to get access token');
        return;
      }

      const accessToken = data.accessToken.toString();
      getInfoFromToken(accessToken);
    } catch (error) {
      console.log('Login failed with error:', error);
      Alert.alert('Login Error', error.message || error.toString());
    }
  };

  const isLoggedIn = !!userInfo.name;
  const buttonText = isLoggedIn
    ? 'Logout From Facebook'
    : 'Login With Facebook';
  const onPressButton = isLoggedIn ? logoutWithFacebook : loginWithFacebook;

  return (
    <View style={{ flex: 1, margin: 50 }}>
      <TouchableOpacity
        onPress={onPressButton}
        style={{
          backgroundColor: 'blue',
          padding: 16,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: 'white' }}>{buttonText}</Text>
      </TouchableOpacity>

      {userInfo.name && (
        <Text style={{ fontSize: 16, marginVertical: 16 }}>
          Logged in as {userInfo.name}
        </Text>
      )}
    </View>
  );
}
