import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import axios from "axios";
import { Alert } from "react-native";
import colors from "../config/colors";
import CarCard from "../components/CarCard";
import PageTitle from "../components/PageTitle";
import ListItemSeparator from "../components/ListItemSeparator";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { apiUrl } from "../utilis/ApiUrl";

export default function AllCarsScreen() {
    
  const navigation = useNavigation();

  const [cars, setCars] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const getAllCars = async () => {
        try {
          const token = await AsyncStorage.getItem("token");
          const response = await axios.get(
            `${apiUrl}/api/car/cars`,
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

  const deleteCar = (carId) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this car?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => performDeletion(carId),
          style: "destructive",
        },
      ]
    );
  };

  const performDeletion = async (carId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.delete(`${apiUrl}/api/car/cars/${carId}`, {
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
      <PageTitle title="My Cars" />
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
                onDelete={() => deleteCar(item.id)}
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
    justifyContent: "center",
    alignItems: "center",
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
