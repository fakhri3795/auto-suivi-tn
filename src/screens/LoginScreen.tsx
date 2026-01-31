console.log('LOGIN SCREEN LOADED');

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const handleLogin = () => {
    navigation.navigate('Vehicles');
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 10 }}>
        Auto Suivi Tunisie 🚗
      </Text>

      <Text style={{ fontSize: 16, color: '#555', marginBottom: 40 }}>
        Gérez vos documents & entretiens
      </Text>

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: '#1e90ff',
          paddingVertical: 14,
          paddingHorizontal: 40,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
}
