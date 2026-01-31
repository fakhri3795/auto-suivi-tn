import React from 'react';
import { View, Text, FlatList } from 'react-native';
import StatCard from '../components/StatCard';
import { getVehicleGlobalStatus } from '../utils/vehicleStatus';
import { getStatusColor } from '../utils/status';
import { getNextAction } from '../utils/nextAction';

export default function DashboardScreen({ route }: any) {
  const { vehicles } = route.params;
const isSingleVehicle = vehicles.length === 1;

  const total = vehicles.length;

  const counts = {
    VALIDE: 0,
    BIENTOT: 0,
    EXPIRE: 0,
  };

  vehicles.forEach((v: any) => {
  let status = getVehicleGlobalStatus(v);

  if (status === 'A_RENSEIGNER') {
    status = 'BIENTOT';
  }

  counts[status]++;
});


if (isSingleVehicle) {
  const vehicle = vehicles[0];
  const status = getVehicleGlobalStatus(vehicle);
  const nextAction = getNextAction(vehicle);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>
        Mon véhicule 🚗
      </Text>

      {/* Carte véhicule */}
      <View
        style={{
          padding: 25,
          borderRadius: 10,
          backgroundColor: '#f9f9f9',
          borderLeftWidth: 8,
          borderLeftColor: getStatusColor(status),
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 5 }}>
          {vehicle.brand} {vehicle.model}
        </Text>

        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: getStatusColor(status),
          }}
        >
          {status.replace('_', ' ')}
        </Text>
      </View>

      {/* Action recommandée */}
      {nextAction && (
        <View
          style={{
            marginTop: 20,
            padding: 15,
            borderRadius: 8,
            backgroundColor: '#f5f5f5',
            borderLeftWidth: 6,
            borderLeftColor: nextAction.color,
          }}
        >
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
            Action recommandée
          </Text>
          <Text style={{ color: nextAction.color }}>
            {nextAction.label}
          </Text>
        </View>
      )}
    </View>
  );
}

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Titre */}
      <Text style={{ fontSize: 22, marginBottom: 15 }}>
        Dashboard 🚗
      </Text>

      {/* Cartes statistiques */}
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 20,
        }}
      >
        <StatCard
          title="Total"
          value={total}
          color="#3498db"
        />
        <StatCard
          title="Valides"
          value={counts.VALIDE}
          color="#2ecc71"
        />
        <StatCard
          title="Bientôt"
          value={counts.BIENTOT}
          color="#f39c12"
        />
        <StatCard
          title="Expirés"
          value={counts.EXPIRE}
          color="#e74c3c"
        />
      </View>

      {/* Liste des véhicules */}
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Véhicules
      </Text>

      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const status = getVehicleGlobalStatus(item);

          return (
            <View
              style={{
                padding: 15,
                borderRadius: 6,
                marginBottom: 10,
                backgroundColor: '#f9f9f9',
                borderLeftWidth: 6,
                borderLeftColor: getStatusColor(status),
              }}
            >
              <Text style={{ fontSize: 16 }}>
                {item.brand} {item.model}
              </Text>
              <Text
                style={{
                  color: getStatusColor(status),
                  fontWeight: 'bold',
                }}
              >
                {status.replace('_', ' ')}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}
