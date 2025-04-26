import React from "react";
import { View, Text, Button } from 'react-native';
import { Stack } from 'expo-router';

export default function ResourceScreen() {
  return (
    <>
    <Stack.Screen options={{ title: 'Mental Health Resources' }} />
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Resources!</Text>
    </View>
    </>
  );
}