import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { CAR_BRANDS } from '../constants/carBrands';
import { CAR_MODELS } from '../constants/carModels';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useEffect } from 'react';
import { loadVehicles, saveVehicles } from '../storage/vehicleStorage';
import {
  scheduleInsuranceNotification,
} from '../notifications/vehicleNotifications';
import { createEmptyVehicle } from '../utils/createVehicle';

<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <View style={{ flex: 1, padding: 20 }}>
    {/* tout ton écran ici */}
  </View>
</TouchableWithoutFeedback>


import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';

import { Vehicle } from '../models/Vehicle';

export default function VehiclesScreen() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const navigation = useNavigation<any>();

  const [brand, setBrand] = useState('');
const [model, setModel] = useState('');
const [showModelList, setShowModelList] = useState(false);  const [year, setYear] = useState('');

  const [showBrandList, setShowBrandList] = useState(false);
useEffect(() => {
  loadVehicles().then((storedVehicles) => {
    setVehicles(storedVehicles);
  });
}, []);

const filteredBrands = CAR_BRANDS.filter((b) =>
  b.toLowerCase().includes(brand.toLowerCase()),
);

const availableModels = brand
  ? CAR_MODELS[brand] || []
  : [];

const filteredModels = availableModels.filter((m) =>
  m.toLowerCase().includes(model.toLowerCase()),
);


 const addVehicle = () => {
  if (!brand || !model || !year) return;

  Keyboard.dismiss();

  const newVehicle = createEmptyVehicle(brand, model, year);

  setVehicles((prev) => {
    const updated = [...prev, newVehicle];
    saveVehicles(updated);
    return updated;
  });

  // Reset formulaire
  setBrand('');
  setModel('');
  setYear('');
};


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={{ flex: 1, padding: 20 }}>
      {/* TOUT ton écran ici, inchangé */}

      <Text style={{ fontSize: 22, marginBottom: 10 }} >Mes véhicules 🚗</Text>

      {/* Formulaire */}
      {/* =======================
    Sélection de la marque
   ======================= */}
<Text style={{ marginBottom: 5, fontWeight: 'bold' }}>
  Marque
</Text>

<TextInput
  placeholder="Rechercher une marque"
  value={brand}
  onChangeText={(text) => {
    setBrand(text);
    setShowBrandList(true);
  }}
  onFocus={() => setShowBrandList(true)}
  style={{
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 5,
    backgroundColor: 'white',
  }}
/>

{showBrandList && brand.length > 0 && (
  <View
    style={{
      maxHeight: 180,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 6,
      marginBottom: 10,
      backgroundColor: 'white',
    }}
  >
    <FlatList
      data={filteredBrands}
      keyExtractor={(item) => item}
      keyboardShouldPersistTaps="handled"
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
  setBrand(item);
  setModel('');
  setShowBrandList(false);
}}
          style={{
            padding: 12,
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
          }}
        >
          <Text>{item}</Text>
        </TouchableOpacity>
      )}
    />
  </View>
)}

     {/* =======================
    Sélection du modèle
   ======================= */}
<Text style={{ marginBottom: 5, fontWeight: 'bold' }}>
  Modèle
</Text>

<TextInput
  placeholder={
    brand ? 'Rechercher un modèle' : 'Choisissez d’abord une marque'
  }
  value={model}
  editable={!!brand}
  onChangeText={(text) => {
    setModel(text);
    setShowModelList(true);
  }}
  onFocus={() => brand && setShowModelList(true)}
  style={{
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 5,
    backgroundColor: 'white',
  }}
/>

{showModelList && brand && model.length > 0 && (
  <View
    style={{
      maxHeight: 160,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 6,
      marginBottom: 10,
      backgroundColor: 'white',
    }}
  >
    <FlatList
      data={filteredModels}
      keyExtractor={(item) => item}
      keyboardShouldPersistTaps="handled"
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            setModel(item);
            setShowModelList(false);
          }}
          style={{
            padding: 12,
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
          }}
        >
          <Text>{item}</Text>
        </TouchableOpacity>
      )}
    />
  </View>
)}
<Text style={{ marginBottom: 5, fontWeight: 'bold' }}>
  Année
</Text>
      <TextInput
        placeholder="Année"
        value={year}
        onChangeText={setYear}
        keyboardType="numeric"
        style={{
         borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    backgroundColor: 'white',
        }}
      />

      <TouchableOpacity
        onPress={addVehicle}
        style={{
          backgroundColor: '#1e90ff',
          padding: 12,
          borderRadius: 6,
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>
          Ajouter le véhicule
        </Text>
      </TouchableOpacity>
<TouchableOpacity
  onPress={() =>
    navigation.navigate('Dashboard', { vehicles })
  }
  style={{
    backgroundColor: '#2ecc71',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 20,
  }}
>
  <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
    Voir le dashboard
  </Text>
</TouchableOpacity>


      {/* Liste */}
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ color: '#777' }}>Aucun véhicule ajouté</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('VehicleDetails', { vehicle: item,
  onSave: (updatedVehicle: Vehicle) => {
    setVehicles((prev) => {
      const updated = prev.map((v) =>
        v.id === updatedVehicle.id ? updatedVehicle : v
      );
      saveVehicles(updated);
      return updated;
    });
  }, })
            }
            style={{
              padding: 15,
              backgroundColor: '#f2f2f2',
              borderRadius: 6,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 16 }}>
              {item.brand} {item.model} ({item.year})
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  </TouchableWithoutFeedback>  );
}
