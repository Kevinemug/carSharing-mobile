import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import axios from "axios";
import colors from "../config/colors";
import CarCard from "../components/CarCard";
import ListItemSeparator from "../components/ListItemSeparator";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function AllCarsScreen() {
    
  const navigation = useNavigation();

  const [cars, setCars] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const getAllCars = async () => {
        try {
          const token = await AsyncStorage.getItem("token");
          const response = await axios.get(
            `http://localhost:3000/api/car/cars`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setCars(response.data.cars);
        } catch (err) {
          console.log("Error fetching carskk:", err);
        }
      };

      getAllCars();
    }, [])
  );


  const performDeletion = async (carId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/car/cars/${carId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCars(cars.filter((car) => car.id !== carId));
    } catch (err) {
      console.log("Error deleting car:", err);
    }
  };
  return (
    <>
      <View style={styles.container}>
        <Button title="Add Car" onPress={() => navigation.navigate("AddCar")} />

        {cars.length === 0 ? (
          <Text style={styles.noCars}>You have not added any Car</Text>
        ) : (
          <FlatList
            data={cars}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <CarCard
                carTitle={item.carname}
                carId={item.id}
                carname={item.carprice}
                carowner={item.username}
                carimage={item.carimage}
                licensePlate={item.licensePlate || ""}
                onDelete={() => performDeletion(item.id)}
              />
            )}
            ItemSeparatorComponent={<ListItemSeparator />}
          />
        )}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  noCars: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
    textAlign: "center",
    marginTop: 20,
  },
});
