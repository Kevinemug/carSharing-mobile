import React, { useState } from 'react';
import axios from 'axios';
import { View, ActivityIndicator, Text,TextInput, StyleSheet } from 'react-native';
import colors from '../config/colors';
import AppButton from '../components/AppButton';
import { useNavigation } from '@react-navigation/native'
export default function SignUpPage ()  {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(''); 
  const [state, setState] = useState({
    username: '', password: '', email: '', phone_number: ''
  });

  const onChangeText = (key, val) => {
    setState({ ...state, [key]: val });
  };

  const handleSignUp = async () => {
    const { username, password, email, phone_number } = state;
    try {
      setIsLoading(true);
      const response = await axios.post(`http://localhost:3000/api/auth/signup`, {
        username,
        password,
        // email,
        // phone_number
      });
  
      console.log('user successfully signed up!: ', response.data);
      navigation.navigate('Login');
    } catch (err) {
      console.log('error signing up: ', err);
  setError(err.response.data.message)
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
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
      <TextInput
        style={styles.input}
        placeholder='Email'
        autoCapitalize="none"
        placeholderTextColor='white'
        onChangeText={val => onChangeText('email', val)}
      />
      <TextInput
        style={styles.input}
        placeholder='Phone Number'
        autoCapitalize="none"
        placeholderTextColor='white'
        onChangeText={val => onChangeText('phone_number', val)}
      />
      <Text style={{}}>{error}</Text>
      <View style={styles.buttonContainer}>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.white} />
      ) : (
        <AppButton title="Sign up" onPress={handleSignUp} color='primary' />
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
    },
    error:{
      backgroundColor: 'red',
    }
  })