import { StyleSheet,  } from 'react-native';
import LoginPage from './src/screens/LoginPage';
import AllCarsScreen from './src/screens/AllCarsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddCarScreen from './src/screens/AddCarScreen';
import EditCarScreen from './src/screens/EditCarScreen';
import SignUpPage from './src/screens/SignUpPage';
export default function App() {
  const Stack = createStackNavigator();

  return (
    <>
<NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen name="SignUp" component={SignUpPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="AllCars" component={AllCarsScreen} />
        <Stack.Screen name="AddCar" component={AddCarScreen} />
        <Stack.Screen name="EditCar" component={EditCarScreen} />
      </Stack.Navigator>
    </NavigationContainer>  
    </>
    );
}

