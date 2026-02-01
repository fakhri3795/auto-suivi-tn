import AsyncStorage from '@react-native-async-storage/async-storage';
import { Vehicle } from '../models/Vehicle';
import { createEmptyVehicle } from '../utils/createVehicle';

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
    if (!data) return [];

    const parsed = JSON.parse(data);
    return parsed.map(normalizeVehicle);
  } catch (e) {
    console.error('Erreur chargement véhicules', e);
    return [];
  }
}


function normalizeVehicle(vehicle: any): Vehicle {
  const base = createEmptyVehicle(
    vehicle.brand,
    vehicle.model,
    vehicle.year,
  );

  return {
    ...base,
    ...vehicle,
    maintenance: {
      ...base.maintenance,
      ...vehicle.maintenance,
      vidange: {
        ...base.maintenance.vidange,
        ...vehicle.maintenance?.vidange,
      },
      filtres: {
        ...base.maintenance.filtres,
        ...vehicle.maintenance?.filtres,
      },
    },
    documents: {
      ...base.documents,
      ...vehicle.documents,
    },
  };
}