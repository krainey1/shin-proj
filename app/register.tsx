import React, {useEffect, useState} from "react";
import { View, Text, Button, TextInput } from 'react-native';
import {Stack, useRouter } from 'expo-router';
import axios from 'axios';
import {storeData, getData} from './index';
import { useNavigation } from '@react-navigation/native';



export default function RegisterScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');
  const regHandler = (user, pass, email) => {
    if(user.trim() === '' || pass.trim() === '' || email.trim() === '')
      {
        alert('Please Enter Username, Password, and Email to continue');
        return;
      }
  
      axios.post('http://10.0.2.2:5000/register', {username: user, password: pass, email: email})
      .then(response => {console.log("Received Data:", response.data);
        const userId = response.data.userId;
        if(userId !== -1)
        {
          //asych stores everything as strings
          storeData('userId', userId.toString())
          navigation.reset({
            index: 0,
            routes: [{ name: 'petpicker' }] as any, 
          });
    
        }
        else 
        {
          alert('Username and Password already exists. Try Again!')
        }
      })
      .catch(error => {console.error("Lost the Plot", error)})
  }
  return (
    <>
    <Stack.Screen options={{ title: 'Create Your Account!' }} />
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
      <Button title="Create Account" onPress={() => regHandler(user, pass, email)} />
    </View>
    </>
  );
}

   //useEffect Hook ~ lets you do stuff after the component renders
   //hook only in component 