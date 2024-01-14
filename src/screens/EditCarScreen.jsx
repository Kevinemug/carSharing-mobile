import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import colors from "../config/colors";
import {
  View,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import AppButton from "../components/AppButton";
import { useNavigation } from "@react-navigation/native";

export default function EditCarScreen({ route }) {

  const { carId } = route.params;
  const [carData, setCarData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  
  useEffect(() => {
    const getAllCars = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/api/car/cars/${carId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCarData(response.data.car);
      } catch (err) {
        console.log("Error fetching carskk:", err);
      }
    };
    getAllCars();
  }, [carId]);
  const onChangeText = (key, val) => {
    setCarData({ ...carData, [key]: val });
  };

  const handleEdit = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("token");
      await axios.patch(
        `http://localhost:3000/api/car/cars/${carId}`,
        carData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigation.goBack();
    } catch (err) {
      console.error("Error updating car:", err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Car Name"
          autoCapitalize="none"
          placeholderTextColor="white"
          value={carData.carname}
          onChangeText={(val) => onChangeText("carname", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Car Price"
          autoCapitalize="none"
          value={carData.carprice}
          placeholderTextColor="white"
          onChangeText={(val) => onChangeText("carprice", val)}
        />
        <Image
          source={{
            uri: "https://s3.eu-central-1.amazonaws.com/assets.monishare.ojemba/cooper.png",
          }}
          style={styles.imagePreview}
        />
        <TextInput
          style={styles.input}
          placeholder="License Plate"
          autoCapitalize="none"
          placeholderTextColor="white"
          value={carData.licensePlate}
          onChangeText={(val) => onChangeText("licensePlate", val)}
        />
        <View style={styles.buttonContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color={colors.white} />
          ) : (
            <AppButton title="Edit Car" onPress={handleEdit} color="primary" />
          )}
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  input: {
    width: 400,
    height: 80,
    backgroundColor: colors.secondary,
    margin: 10,
    padding: 8,
    color: "white",
    borderRadius: 20,
    fontSize: 18,
    fontWeight: "500",
  },
  imagePreview: {
    width: 200,
    height: 100,
    marginVertical: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
});
