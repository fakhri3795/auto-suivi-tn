import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import VehiclesScreen from '../screens/VehiclesScreen';
import VehicleDetailsScreen from '../screens/VehicleDetailsScreen';
import DashboardScreen from '../screens/DashboardScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Connexion' }}
        />
        <Stack.Screen
          name="Vehicles"
          component={VehiclesScreen}
          options={{ title: 'Mes véhicules' }}
        />
        <Stack.Screen
  name="Dashboard"
  component={DashboardScreen}
  options={{ title: 'Dashboard' }}
/>
        <Stack.Screen
          name="VehicleDetails"
          component={VehicleDetailsScreen}
          options={{ title: 'Détails du véhicule' }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
