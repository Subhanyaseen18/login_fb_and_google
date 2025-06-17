import {Linking, PermissionsAndroid, Platform} from 'react-native';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';

export const requestCamera = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          Linking.openSettings();
        }
      }
    } catch (err) {
      console.warn(err);
    }
  } else {
    const res = await check(PERMISSIONS.IOS.CAMERA);
    if (res === RESULTS.GRANTED) {
      return true;
    } else if (res === RESULTS.DENIED) {
      const res2 = await request(PERMISSIONS.IOS.CAMERA);
      if (res2 === RESULTS.GRANTED) {
        return true;
      } else {
        Linking.openSettings();
      }
    }
  }
};

export const requestWritePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('granted');
        return true;
      } else {
        if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          console.log('never ask again');
          Linking.openSettings();
        }
        console.log('denied');
      }
    } catch (err) {
      console.warn(err);
    }
  } else {
    return true;
  }
};
