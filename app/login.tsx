import React, {useState} from "react";
import axios from 'axios'; //because requests are a pain w/fetch
import { View, Text, Button, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

//What is asynchstorage, cool thing that saves data when the app closes
//func for setting key/value pair in async storage
const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Error saving data', error);
  }
};

//getting key value pair from async storage
const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error('Error getting data', error);
    return null;
  }
};

/*
general plan: set userId in asyncstorage so we can reference user data later
              How do we do that?
              Need to send get (valid ~ cant be blank) user info from text input + send request to backend, check if username/password is in the sys
              -> if it is send back the userId as a response/-1 if not found - flask_side
              make a request here via axios
              get the response, if valid ID store data in async and go to home via router
              if invalid send an alert to user
*/
export default function LoginScreen() {
  //cool hooks ~ special functions that allow for state/navigation features inside components (useState & useRouter are hooks!)
  //follow up -> components ~ the thing we are in right now! its function that returns UI
  //styling stuff ~ similar to traditional css but react-native-y
  //state ~ data belonging to components
  const router = useRouter();  
  const [username, setUsername] = useState(''); //<- so we can track/save the state of the username!
  const [password, setPassword] = useState('');
  
  const loginHandler = (username, password) => {
    if(username.trim() === '' || password.trim() === '')
    {
      alert('Please Enter Both Username and Password');
      return;
    }
// === forces type coercion
    axios.post('http://10.0.2.2:5000/login', {username: username, password: password})
    .then(response => {console.log("Received Data:", response.data);
      const userId = response.data.userId;
      if(userId !== -1)
      {
        //asych stores everything as strings
        storeData('userId', userId.toString())
        router.replace('/home');
      }
      else 
      {
        alert('Invalid Username or password. Try again or Create Account!')
      }
    })
    .catch(error => {console.error("Lost the Plot", error)})
    
  } 
  return (
    <>
    <Stack.Screen options={{ title: 'Login' }} />
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
      <Button title="Login" onPress={() => loginHandler(username, password)} />
      <Button title="Create Account" onPress={() => router.push('/register')} />
    </View>
    </>
  );
}
