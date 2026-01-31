import AsyncStorage from '@react-native-async-storage/async-storage';
import { Vehicle } from '../models/Vehicle';

const VEHICLES_KEY = 'VEHICLES_STORAGE_KEY';

// Sauvegarder les véhicules
export async function saveVehicles(vehicles: Vehicle[]) {
  try {
    await AsyncStorage.setItem(
      VEHICLES_KEY,
      JSON.stringify(vehicles),
    );
  } catch (e) {
    console.error('Erreur sauvegarde véhicules', e);
  }
}

// Charger les véhicules
export async function loadVehicles(): Promise<Vehicle[]> {
  try {
    const data = await AsyncStorage.getItem(VEHICLES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Erreur chargement véhicules', e);
    return [];
  }
}
