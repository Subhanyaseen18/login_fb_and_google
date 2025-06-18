import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getApp } from '@react-native-firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  deleteUser,
  signOut,
} from '@react-native-firebase/auth';

export default function LoginWithGoogle() {
  const [userInfo, setUserInfo] = useState(null);
  const authInstance = getAuth(getApp());

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '991673773243-akvoocjsopfpdbgcsidedgh0qob19m4r.apps.googleusercontent.com',
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      const { idToken } = await GoogleSignin.getTokens();

      const googleCredential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(authInstance, googleCredential);

      setUserInfo(user);
      console.log('Logged in user:', user.data.user);
    } catch (error) {
      console.log('Google Sign-In Error:', error);
    }
  };

  const signOutFromGoogle = async () => {
    try {
      await GoogleSignin.signOut();
      await signOut(authInstance);
      setUserInfo(null);
      console.log('User signed out');
    } catch (error) {
      console.log('Google Sign-Out Error:', error);
    }
  };

  const confirmDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              const currentUser = authInstance.currentUser;

              if (currentUser) {
                await deleteUser(currentUser);
                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut();
                setUserInfo(null);
                console.log('User account deleted');
              } else {
                Alert.alert('No user is logged in');
              }
            } catch (error) {
              console.log('Delete Account Error:', error);
              Alert.alert(
                'Error deleting account. Please re-authenticate and try again.',
              );
            }
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Google Login</Text>

      {!userInfo ? (
        <Button title="Login with Google" onPress={signInWithGoogle} />
      ) : (
        <>
          <Text style={styles.userText}>
            Welcome, {userInfo.data.user.name}
          </Text>
          <Text style={styles.userText}>
            Family Name: {userInfo.data.user.familyName}
          </Text>
          <Text style={styles.email}>{userInfo.data.user.email}</Text>
          <Button title="Logout" onPress={signOutFromGoogle} />
          <View style={{ marginTop: 50 }}>
            <Button
              title="Delete Account"
              color="red"
              onPress={confirmDeleteAccount}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  userText: {
    fontSize: 16,
    marginBottom: 10,
  },
  email: {
    fontSize: 14,
    marginBottom: 30,
    color: 'gray',
  },
});
