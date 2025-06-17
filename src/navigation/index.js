import { NavigationContainer } from '@react-navigation/native';
import { useThemeAwareObject } from '../theme';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import MainStack from './MainStack';

function Route() {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      main: {
        backgroundColor: theme.color.primaryBackground,
        flex: 1,
      },
      statusBar: {
        backgroundColor: theme.color.white,
      },
    });
    return themeStyles;
  };

  const styles = useThemeAwareObject(createStyles);

  return (
    <>
      <SafeAreaView style={styles.main}>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}

export default Route;
