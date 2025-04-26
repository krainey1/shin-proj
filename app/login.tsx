import React, {useState} from "react";
import { View, Text, Button, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Error saving data', error);
  }
};


export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login!</Text>
      <TextInput 
        placeholder="Username"
        value = {username}
        onChangeText={(newText) => setUsername(newText)}
        />
        <TextInput 
        placeholder="Password"
        value = {password}
        onChangeText={(newText) => setPassword(newText)}
        />
      <Button title="Login" onPress={() => router.replace('/home')} />
      <Button title="Create Account" onPress={() => router.push('/register')} />
    </View>
  );
}
