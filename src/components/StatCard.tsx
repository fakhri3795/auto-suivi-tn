import React from 'react';
import { View, Text } from 'react-native';

type Props = {
  title: string;
  value: number;
  color: string;
};

export default function StatCard({ title, value, color }: Props) {
  return (
    <View
      style={{
        flex: 1,
        padding: 15,
        borderRadius: 8,
        backgroundColor: color,
        marginHorizontal: 5,
      }}
    >
      <Text style={{ color: 'white', fontSize: 14 }}>
        {title}
      </Text>
      <Text
        style={{
          color: 'white',
          fontSize: 26,
          fontWeight: 'bold',
        }}
      >
        {value}
      </Text>
    </View>
  );
}
