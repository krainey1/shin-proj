import React from "react";
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login!</Text>
      <Button title="Login" onPress={() => router.replace('/home')} />
      <Button title="Create Account" onPress={() => router.push('/register')} />
    </View>
  );
}
