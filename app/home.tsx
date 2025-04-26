import React from "react";
import { View, Text, Button } from 'react-native';
import { Stack, useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <>
    <Stack.Screen options={{ title: 'Home' }} />
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>HOME MAYBE!</Text>
        <Button title="Habits" onPress={() => router.push('/habits')} />
        <Button title="Resources" onPress={() => router.push('/resources')} />
    </View>
    </>
  );
}