import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IconDone from 'react-native-vector-icons/MaterialIcons';
import {useThemeAwareObject} from '../theme';
import {hp, wp} from '../utils';

const CustomKeyboard = ({onKeyPress, onDeletePress, onDonePress}) => {
  const handleKeyPress = key => {
    onKeyPress(key);
  };

  const handleDeletePress = () => {
    onDeletePress();
  };

  const handleDonePress = () => {
    onDonePress();
  };
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: hp(1.2),
      },
      key: {
        backgroundColor: 'lightgray',
        paddingHorizontal: wp(10),
        paddingVertical: hp(2),
        marginHorizontal: wp(1.2),
        borderRadius: wp(3),
      },
      keyText: {
        fontSize: wp(8),
      },
      icon: {
        size: wp(7),
        color: theme.color.primaryText,
      },
      specialkey: {
        backgroundColor: theme.color.secondaryText,
        paddingHorizontal: wp(9),
        paddingVertical: hp(3),
        marginHorizontal: 5,
        borderRadius: wp(3),
      },
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => handleKeyPress('1')}
          style={styles.key}>
          <Text style={styles.keyText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleKeyPress('2')}
          style={styles.key}>
          <Text style={styles.keyText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleKeyPress('3')}
          style={styles.key}>
          <Text style={styles.keyText}>3</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => handleKeyPress('4')}
          style={styles.key}>
          <Text style={styles.keyText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleKeyPress('5')}
          style={styles.key}>
          <Text style={styles.keyText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleKeyPress('6')}
          style={styles.key}>
          <Text style={styles.keyText}>6</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => handleKeyPress('7')}
          style={styles.key}>
          <Text style={styles.keyText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleKeyPress('8')}
          style={styles.key}>
          <Text style={styles.keyText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleKeyPress('9')}
          style={styles.key}>
          <Text style={styles.keyText}>9</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={handleDonePress} style={styles.specialkey}>
          <IconDone
            name="done"
            size={styles.icon.size}
            color={styles.icon.color}
          />

          {/* <Text style={styles.keyText}>Done</Text> */}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleKeyPress('0')}
          style={styles.key}>
          <Text style={styles.keyText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeletePress} style={styles.specialkey}>
          <Icon
            name="delete"
            size={styles.icon.size}
            color={styles.icon.color}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomKeyboard;
