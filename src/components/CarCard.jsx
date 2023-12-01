import React from 'react';
import {View,StyleSheet, Image, Button, TouchableOpacity } from 'react-native'
import colors from '../config/colors'
import AppText from './AppText'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import AppButton from './AppButton';
import { useNavigation } from '@react-navigation/native';

export default function CarCard({carTitle,carname,carowner,carimage,onDelete,licensePlate,carId}) {
      const navigation = useNavigation();
    return (
        <View style={styles.cardContainer}>
         <TouchableOpacity onPress={() =>navigation.navigate('EditCar',{
          carId 
         })}>
          <MaterialCommunityIcons 
            name="circle-edit-outline" 
            size={25} 
            color={colors.slate[150]}/>
            </TouchableOpacity>
         
        <View style={styles.card}>
            <Image style={styles.image} source={{uri:carimage}}/>
            <View style={styles.detailsContainer}>
            <AppText style={styles.title}>{carTitle}</AppText>
            <View style={styles.iconContainer}>
            <MaterialCommunityIcons 
            name="road" 
            size={25} 
            color={colors.slate[150]}/>
            <AppText style={styles.subTitle}>{carname}</AppText>
            </View>
            <View style={styles.iconContainer}>
            <MaterialCommunityIcons 
            name="account-outline" 
            size={25} 
            color={colors.slate[150]}/>
            <AppText style={styles.subTitle}>{carowner}</AppText>
            </View>
            <View style={styles.iconContainer}>
            <MaterialCommunityIcons 
            name="car-hatchback" 
            size={25} 
            color={colors.slate[150]}/>
            <AppText style={styles.subTitle}>{licensePlate}</AppText>
            </View>
            
            <AppText style={styles.details}>show details</AppText>
            </View>
        </View>
        <AppButton color="orange" title="Delete Car" onPress={onDelete}/>
        </View>
    );
} 
const styles = StyleSheet.create({
   cardContainer:{
      backgroundColor: colors.secondary,
      borderRadius: 8,
      shadowColor:colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 3,
      marginVertical: 8,
      padding:10

  

   },
 card:{
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
 },

 detailsContainer:{
    padding:20,
    flex:1,
 },
 image:{
    width:'60%',
    height:200,
 } ,
 subTitle:{
    color:colors.slate[150],
    fontWeight:'bold',

 },
 title:{
    color:colors.white,
    fontWeight:'bold',
    marginBottom: 20,
    fontSize:25,
 },
 iconContainer:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom: 20,
    gap:10,
 },
 details:{
      color:colors.amber[150],
      fontWeight:'bold',
      fontSize:15
 }
})

