import axios from 'axios'; //because requests are a pain w/fetch
import { Stack, useRouter } from 'expo-router';
import React, { useState } from "react";
import {Image} from 'expo-image';
import {StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { storeData } from './index';

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
  //follow up -> components ~ the thing we are in right now! its function that returns UI ~ <Text> is a react-native component
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
      const petId = response.data.petId;
      console.log(petId);
      if(userId !== -1)
      {
        //asych stores everything as strings
        storeData('userId', userId.toString())
        storeData('petId', petId.toString()) //petId is in asynch storage, use getData where needed to take it out
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
    <View style={styles.container}>
      <Text style={styles.loginText}>Calm Stuff Everyday</Text>
      <Image source={require('../assets/animations/happycat.gif')} style={styles.catImage}></Image>
      <TextInput
        style={styles.input} 
        placeholder="Username"
        value = {username}
        onChangeText={(newText) => setUsername(newText)}
        />
        <TextInput
        style={styles.input} 
        placeholder="Password"
        value = {password}
        onChangeText={(newText) => setPassword(newText)}
        />
      {}
      <View>
        <TouchableOpacity style = {styles.customButton} onPress={() => loginHandler(username, password)}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.customButton} onPress={() => router.push('/register')} >
        <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#F8DCC4',
    alignItems: 'center',
    padding: 20,
  },
  loginText: {
    fontSize: 60,
    fontWeight: 'bold',
    marginTop: 40,
    textAlign: 'center'
  },
  customButton:{
    width: 200,
    height: 60,
    backgroundColor: '#DD856F',
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  catImage: {
    width: 255,
    height: 255,
    marginLeft: 15

  },
  textContainer:{
    flex: 1,
    backgroundColor: '#E7E7E7',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: 300,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: '#F5FCFF',
    margin: 5,
    fontSize: 18
  },
});
