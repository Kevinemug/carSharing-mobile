import React, { useState } from 'react';
import { View, ActivityIndicator, TextInput, StyleSheet } from 'react-native';
import colors from '../config/colors';
import AppButton from '../components/AppButton';
import PageTitle from '../components/PageTitle';
import Screen from '../components/Screen';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiUrl } from '../utilis/ApiUrl';

export default function LoginPage ()  {
  
  const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(false); 
  const [state, setState] = useState({
    username: '', password: '', email: '', phone_number: ''
  });

  const onChangeText = (key, val) => {
    setState({ ...state, [key]: val });
  };

  const handleLogin = async () => {
    const { username, password, email, phone_number } = state;
    try {
      setIsLoading(true);
      const response = await axios.post(`${apiUrl}/api/auth/login`, {
        username,
        password,
        // email,
        // phone_number
      });
      AsyncStorage.setItem('token', response.data.token);
      AsyncStorage.setItem('userId', response.data.user.id);
      AsyncStorage.setItem('userName', response.data.user.username);
      
      console.log('user successfully login: ', response.data);
      navigation.navigate('AllCars');
    } catch (err) {
      console.log('error login: ', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Screen>
    <PageTitle title="Log in"/>

    </Screen>
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Username'
        autoCapitalize="none"
        placeholderTextColor='white'
        onChangeText={val => onChangeText('username', val)}
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        secureTextEntry={true}
        autoCapitalize="none"
        placeholderTextColor='white'
        onChangeText={val => onChangeText('password', val)}
      />
      <View style={styles.buttonContainer}>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.white} />
      ) : (
        <AppButton title="Login" onPress={handleLogin} color='primary' />
        )}


      </View>
    </View>
    </>
  );
};


  const styles = StyleSheet.create({
    input: {
      width: 400,
      height: 80,
      backgroundColor: colors.secondary,
      margin: 10,
      padding: 8,
      color: 'white',
      borderRadius: 20,
      fontSize: 18,
      fontWeight: '500',
    },
    buttonContainer: {
      },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:colors.primary
    }
  })