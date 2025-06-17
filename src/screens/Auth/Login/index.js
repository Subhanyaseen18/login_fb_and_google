import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import IconMoney from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconemail from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import RnButton from '../../../components/RnButton';
import RnInput from '../../../components/RnInput';
import RnText from '../../../components/RnText';
import ScrollContainer from '../../../components/ScrollContainer';
import { usePostApiMutation } from '../../../service';
import { useThemeAwareObject } from '../../../theme';
import createStyles from './style';
import Snackbar from '../../../components/Snackbar';

export default function Login() {
  const styles = useThemeAwareObject(createStyles);
  const [showPassword, setShowPassword] = useState(true);
  const navigation = useNavigation();

  const handleLogin = values => {
    console.log(values);
  };
  const LoginValidation = yup.object().shape({
    email: yup
      .string()
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1}\.[0-9]{1}\.[0-9]{1}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/,
        'Invalid email',
      )
      .required('Please enter email'),
    password: yup
      .string()
      .required('Please enter password')
      .min(8, 'Password must be at least 8 characters long'),
  });
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validateOnMount={true}
      onSubmit={values => handleLogin(values)}
      validationSchema={LoginValidation}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
      }) => (
        <ScrollContainer>
          <IconMoney
            name="money-bill-wave-alt"
            size={styles.appIcon.height}
            color={styles.appIcon.color}
            style={styles.appIcon}
          />
          <View style={[styles.containerInput]}>
            <RnInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              error={errors.email && touched.email && errors.email}
              inputStyle={styles.input}
              placeholder="Email"
              leftIcon={
                <Iconemail
                  style={styles.iconColor}
                  name="email"
                  size={styles.icon.size}
                />
              }
            />
          </View>
          <View style={[styles.containerInput]}>
            <RnInput
              secureTextEntry={showPassword}
              inputStyle={styles.input}
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={errors.password && touched.password && errors.password}
              value={values.password}
              leftIcon={
                <IconMoney
                  style={styles.iconColor}
                  name="lock"
                  size={styles.icon.size}
                />
              }
              rightIcon={
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    style={styles.iconColor}
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={styles.icon.size}
                  />
                </TouchableOpacity>
              }
            />
          </View>
          <View style={styles.containerforgot}>
            <RnText
              style={styles.forgot}
              //   onPress={() => navigation.navigate('ForgotEmail')}
            >
              Forgot Password?
            </RnText>
          </View>
          <View>
            <RnButton
              title="Login"
              style={[styles.buttonContainer]}
              loading={loginResponse.isLoading}
              onPress={() => {
                handleSubmit();
              }}
            />
          </View>
          <View style={styles.containerSignup}>
            <RnText style={styles.signUpText}>
              Don't have an account?
              <RnText style={styles.signUpPressAble}>SignUp</RnText>
            </RnText>
          </View>
        </ScrollContainer>
      )}
    </Formik>
  );
}
