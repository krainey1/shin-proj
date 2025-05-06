import axios from 'axios'; //because requests are a pain w/fetch
import { Image } from 'expo-image';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
  
  const loginHandler = () => {
    if(username.trim() === '' || password.trim() === '')
    {
      alert('Please Enter Both Username and Password');
      return;
    }
// === forces type coercion
    axios.post('https://appapi-production.up.railway.app/login', {username: username, password: password})
    .then(response => {console.log("Received Data:", response.data);
      const userId = response.data.userId;
      const petId = response.data.petId;
      console.log(petId);
      if(userId !== -1)
      {
        //asych stores everything as strings
        storeData('userId', userId.toString())
        storeData('petId', petId.toString()) //petId is in asynch storage, use getData where needed to take it out
        storeData('notifsOn', "false")
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
    <Stack.Screen options={{ title: 'Login', headerShown: false }} />
    <View style={styles.container}>
      <Image source={require('../assets/animations/happycat.gif')} style={styles.catImage}></Image>
      <TextInput
        style={styles.input} 
        placeholder="Username"
        placeholderTextColor='#DD856F'
        value = {username}
        onChangeText={(newText) => setUsername(newText)}
        />
        <TextInput
        style={styles.input} 
        placeholder="Password"
        placeholderTextColor='#DD856F'
        value = {password}
        secureTextEntry={true}
        onChangeText={(newText) => setPassword(newText)}
        />
      {}
      <View style={styles.container_2}>
          <TouchableOpacity style = {styles.customButton} onPress={() => loginHandler()}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.customButton} onPress={() => router.push('/register')} >
          <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
      </View>
      <Image source={require('../assets/images/turtlelogo.png')} style={styles.turtleImage}></Image>
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
    marginTop: 30,
    textAlign: 'center'
  },
  customButton:{
    width: 140,
    height: 40,
    backgroundColor: '#DD856F',
    borderRadius: 23,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginTop: 12
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  turtleImage: {
    width: 350,
    height: 260,
    marginTop: 10,
    marginBottom: 45
  },
  catImage: {
    width: 245,
    height: 245,
    marginLeft: 10,
    marginTop: 65
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
    borderColor: '#DD856F',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#E7E7E7',
    margin: 5,
    fontSize: 14,
    color: '#DD856F'
  },
  container_2: {
    flexDirection:'row',
    gap: 10
    },
});
