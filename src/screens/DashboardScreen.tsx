import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
import { buildDashboard, DashboardCard } from '../utils/dashboardCalculations';
import { saveVehicles } from '../storage/vehicleStorage';
import { scheduleNotification } from '../services/notificationService';

export default function DashboardScreen({ route }: any) {
  const { vehicles } = route.params;
  const vehicle = vehicles[0]; // V1 = 1 véhicule

const initialKm =
  vehicle?.maintenance?.vidange?.currentKm ?? 0;

const [currentKm, setCurrentKm] = useState(
  initialKm.toString()
);

  const [showKmModal, setShowKmModal] = useState(false);

  const cards = buildDashboard(vehicle);

  const urgentCards = cards.filter(
    (c) => c.status === 'DANGER' || c.status === 'WARNING'
  );

  const handleUpdateKm = () => {
    const km = Number(currentKm);
    if (isNaN(km)) return;

    vehicle.maintenance.vidange.currentKm = km;
    vehicle.maintenance.vidange.lastUpdateDate =
      new Date().toISOString().split('T')[0];

    saveVehicles([vehicle]);
    setShowKmModal(false);
  };

  return (
    
    <View style={{ flex: 1, padding: 20 }}>
      <TouchableOpacity
  onPress={async () => {
    await scheduleNotification(
      'Test AutoSuivi',
      'Si tu vois ça en popup + son, c’est OK ✅',
      new Date(Date.now() + 3000),
    );
  }}
  style={{
    backgroundColor: '#111',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  }}
>
  <Text style={{ color: 'white', fontWeight: 'bold' }}>
    Tester une notification
  </Text>
</TouchableOpacity>

      {/* TITRE */}
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 15 }}>
        Aujourd’hui 🚗
      </Text>

      {/* ACTIONS PRIORITAIRES */}
      {urgentCards.length > 0 && (
        <>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>
            Actions prioritaires
          </Text>

          {urgentCards.map((card: DashboardCard) => (

            <TouchableOpacity
              key={card.id}
              onPress={() => {
                if (card.actionType === 'UPDATE_KM') {
                  setShowKmModal(true);
                }
              }}
              style={{
                backgroundColor: card.color,
                padding: 16,
                borderRadius: 12,
                marginBottom: 12,
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                {card.title}
              </Text>
              <Text style={{ color: 'white' }}>{card.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </>
      )}

      {/* SUIVI */}
      <Text style={{ fontSize: 16, marginVertical: 10 }}>
        Suivi du véhicule
      </Text>

      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: '#f5f5f5',
              padding: 14,
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.subtitle}</Text>
          </View>
        )}
      />

      {/* MODAL KM */}
      <Modal visible={showKmModal} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{ marginBottom: 10 }}>
              Kilométrage actuel
            </Text>

            <TextInput
              value={currentKm}
              onChangeText={setCurrentKm}
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                padding: 10,
                borderRadius: 6,
                marginBottom: 15,
              }}
            />

            <TouchableOpacity
              onPress={handleUpdateKm}
              style={{
                backgroundColor: '#1e90ff',
                padding: 12,
                borderRadius: 6,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                Valider
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
