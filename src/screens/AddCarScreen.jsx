import React, { useState } from 'react';
import axios from 'axios';
import { View, ActivityIndicator, TextInput, StyleSheet,Button,Image } from 'react-native';
import colors from '../config/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppButton from '../components/AppButton';
import { useNavigation } from '@react-navigation/native'

export default function AddCarScreen ()  {
     
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false); 
  const [state, setState] = useState({
    carname: '', carprice: '',  licensePlate: ''
  });

  const onChangeText = (key, val) => {
    setState({ ...state, [key]: val });
  };
 
  const handleAddCar = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    const { carname, carprice,  licensePlate } = state;
    try {

      setIsLoading(true);
      const response = await axios.post(
        `http://localhost:3000/api/car/cars`,
        { carname,
           carprice,
           carimage: "https://s3.eu-central-1.amazonaws.com/assets.monishare.ojemba/cooper.png", 
           licensePlate
           },
        {
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        }
      );
  
      console.log('car Added!: ', response.data);
      navigation.navigate('AllCars');
    } catch (err) {
      console.log('adding car: ', err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Car Name'
        autoCapitalize="none"
        placeholderTextColor='white'
        onChangeText={val => onChangeText('carname', val)}
      />
      <TextInput
        style={styles.input}
        placeholder='Kilometers'
        secureTextEntry={false}
        autoCapitalize="none"
        placeholderTextColor='white'
        onChangeText={val => onChangeText('carprice', val)}
      />
        <Image source={{uri: 'https://s3.eu-central-1.amazonaws.com/assets.monishare.ojemba/cooper.png'}} style={styles.imagePreview}/>
      <TextInput
        style={styles.input}
        placeholder='License Plate'
        autoCapitalize="none"
        placeholderTextColor='white'
        onChangeText={val => onChangeText('licensePlate', val)}
      />
      <View style={styles.buttonContainer}>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.white} />
      ) : (
        <AppButton title="Create Car" onPress={handleAddCar} color='primary' />
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
    imagePreview: {
        width: 200,
        height: 100,
        marginVertical: 10,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:colors.primary
    }
  })