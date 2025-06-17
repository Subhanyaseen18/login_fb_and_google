import {ListItem} from '@rneui/themed';
import {useThemeAwareObject} from '../theme';
import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RnModal from './RnModal';

const ImageInput = ({setUri, showPicker, hidePicker}) => {
  const list = [
    {
      title: 'Open Camera for Image',
      onPress: () => {
        ImagePicker.openCamera({
          width: 1000,
          height: 1000,
          compressImageMaxHeight: 900,
          compressImageMaxWidth: 900,
          mediaType: 'photo',
        })
          .then(image => {
            const newImageUri =
              Platform.OS === 'android'
                ? 'file:/' + image?.path?.split('file:///').join('')
                : !image?.sourceURL
                ? 'file:/' + image?.path
                : 'file:/' + image?.sourceURL?.split('file:///').join('');
            setUri({
              uri: newImageUri,
              path: image?.sourceURL ?? image?.path,
              type: image.mime,
              name: newImageUri.split('/').pop() || '',
            });
            hidePicker();
          })
          .catch(e => {
            console.log('🚀 ~ file: ImagePicker.tsx:53 ~ e:', e);
          });
      },
    },
    {
      title: 'Choose Gallery',
      onPress: () =>
        ImagePicker.openPicker({
          width: 1000,
          height: 1000,
          compressImageMaxHeight: 900,
          compressImageMaxWidth: 900,
          mediaType: 'photo',
          includeBase64: true,
        })
          .then(image => {
            const newImageUri =
              Platform.OS === 'android'
                ? 'file:/' + image?.path?.split('file:///').join('')
                : !image?.sourceURL
                ? 'file:/' + image?.path
                : 'file:/' + image?.sourceURL?.split('file:///').join('');
            setUri({
              path: image?.sourceURL ?? image?.path,
              uri: newImageUri,
              type: image.mime,
              name: newImageUri.split('/').pop() || '',
            });
            hidePicker();
          })
          .catch(e => {
            console.log('🚀 ~ file: ImagePicker.tsx:84 ~ e:', e);
          }),
    },
    {
      title: 'Cancel',
      onPress: () => hidePicker(),
    },
  ];

  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      containerStyle: {
        backgroundColor: theme.color.bottomSheet,
        borderRadius: theme.borders.radius3,
      },
      titleStyle: {
        alignSelf: 'center',
        color: theme.color.primaryText,
        fontFamily: `Mulish-${theme.family.bold}`,
      },
    });
    return themeStyles;
  };

  const styles = useThemeAwareObject(createStyles);

  return (
    <RnModal show={showPicker} backDrop={hidePicker} backButton={hidePicker}>
      <View style={styles.containerStyle}>
        {list.map((l, i) => (
          <ListItem
            key={i}
            onPress={l.onPress}
            containerStyle={styles.containerStyle}>
            <ListItem.Content>
              <ListItem.Title
                style={styles.titleStyle}
                allowFontScaling={false}>
                {l.title}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </RnModal>
  );
};

export default ImageInput;
