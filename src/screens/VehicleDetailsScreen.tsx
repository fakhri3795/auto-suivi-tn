// =======================
// Imports
// =======================
import React, { useState } from 'react';
import { View, Text,TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getDateStatus, getStatusColor } from '../utils/status';
import { Platform } from 'react-native';

// Écran Détails Véhicule

export default function VehicleDetailsScreen({ route }: any) {
  const { vehicle } = route.params;

  // Sécurisation des données
  // (anciens véhicules possibles)

  const documents = vehicle.documents || {
    assurance: { startDate: '', endDate: '' },
    vignette: { year: '', paid: false },
    visiteTechnique: { lastDate: '', nextDate: '' },
  };

  const maintenance = vehicle.maintenance || {
    vidange: { lastKm: 0, intervalKm: 10000 },
    filtres: { huile: 0, air: 0, gasoil: 0, habitacle: 0 },
  };

  // =======================
  // États – Assurance (DatePicker)
  // =======================
  const [assuranceStart, setAssuranceStart] = useState<Date | null>(
    documents.assurance.startDate
      ? new Date(documents.assurance.startDate)
      : null,
  );

  const [assuranceEnd, setAssuranceEnd] = useState<Date | null>(
    documents.assurance.endDate
      ? new Date(documents.assurance.endDate)
      : null,
  );

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // =======================
  // État – Vidange
  // =======================
  const [lastKm, setLastKm] = useState(
    maintenance.vidange.lastKm.toString(),
  );

  // =======================
  // Calcul du statut assurance
  // (string ISO obligatoire)
  // =======================
  const insuranceStatus = getDateStatus(
    assuranceEnd
      ? assuranceEnd.toISOString().split('T')[0]
      : '',
  );

  // =======================
  // Sauvegarde locale
  // =======================
  const saveChanges = () => {
    vehicle.documents = {
      ...documents,
      assurance: {
        startDate: assuranceStart
          ? assuranceStart.toISOString().split('T')[0]
          : '',
        endDate: assuranceEnd
          ? assuranceEnd.toISOString().split('T')[0]
          : '',
      },
    };

    vehicle.maintenance = {
      ...maintenance,
      vidange: {
        ...maintenance.vidange,
        lastKm: Number(lastKm),
      },
    };

    alert('Modifications enregistrées (localement)');
  };

  // =======================
  // Rendu UI
  // =======================
  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Titre véhicule */}
      <Text style={{ fontSize: 22, marginBottom: 10 }}>
        {vehicle.brand} {vehicle.model}
      </Text>

      {/* =======================
          Assurance
         ======================= */}
      <Text style={{ fontSize: 18, marginBottom: 5 }}>
        📄 Assurance
      </Text>

      <Text
        style={{
          color: getStatusColor(insuranceStatus),
          marginBottom: 10,
          fontWeight: 'bold',
        }}
      >
        Statut : {insuranceStatus.replace('_', ' ')}
      </Text>

      {/* Date début assurance */}
      <TouchableOpacity
        onPress={() => setShowStartPicker(true)}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 12,
          borderRadius: 6,
          marginBottom: 10,
        }}
      >
        <Text>
          {assuranceStart
            ? assuranceStart.toLocaleDateString('fr-FR')
            : 'Date début assurance'}
        </Text>
      </TouchableOpacity>

      {showStartPicker && (
  <DateTimePicker
    value={assuranceStart || new Date()}
    mode="date"
    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
    onChange={(_, selectedDate) => {
      setShowStartPicker(false);
      if (selectedDate) setAssuranceStart(selectedDate);
    }}
  />
)}

      {/* Date fin assurance */}
      <TouchableOpacity
        onPress={() => setShowEndPicker(true)}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 12,
          borderRadius: 6,
          marginBottom: 20,
        }}
      >
        <Text>
          {assuranceEnd
            ? assuranceEnd.toLocaleDateString('fr-FR')
            : 'Date fin assurance'}
        </Text>
      </TouchableOpacity>

      {showEndPicker && (
  <DateTimePicker
    value={assuranceEnd || new Date()}
    mode="date"
    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
    onChange={(_, selectedDate) => {
      setShowEndPicker(false);
      if (selectedDate) setAssuranceEnd(selectedDate);
    }}
  />
)}


      {/* =======================
          Vidange
         ======================= */}
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        🔧 Vidange
      </Text>


<TextInput
  placeholder="Kilométrage dernière vidange"
  value={lastKm}
  onChangeText={setLastKm}
  keyboardType="numeric"
  style={{
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 20,
    backgroundColor: 'white',
  }}
/>


      {/* Bouton sauvegarde */}
      <TouchableOpacity
        onPress={saveChanges}
        style={{
          backgroundColor: '#1e90ff',
          padding: 14,
          borderRadius: 6,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>
          Enregistrer
        </Text>
      </TouchableOpacity>
    </View>
  );
}
