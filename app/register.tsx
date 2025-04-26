import React, {useState} from "react";
import { View, Text, Button, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Register an account!</Text>
      <TextInput 
        placeholder="Username"
        value = {user}
        onChangeText={(newText) => setUser(newText)}
      />
      <TextInput 
        placeholder="Password"
        value = {pass}
        onChangeText={(newText) => setPass(newText)}
      />
      <TextInput 
        placeholder="Email"
        value = {email}
        onChangeText={(newText) => setEmail(newText)}
      />
      <Button title="Create Account" onPress={() => router.push('/home')} />
    </View>
  );
}