import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { storeData } from './index';



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
    <View style={styles.container}>
      <Text style={styles.registerText}>Register for an account!</Text>
      <Image source={require('../assets/animations/happypenguin.gif')} style={styles.penguinImage}></Image>
      <TextInput 
        style={styles.input}
        placeholder="Username"
        value = {user}
        onChangeText={(newText) => setUser(newText)}
      />
      <TextInput 
        style={styles.input}
        placeholder="Password"
        value = {pass}
        onChangeText={(newText) => setPass(newText)}
      />
      <TextInput 
        style={styles.input}
        placeholder="Email"
        value = {email}
        onChangeText={(newText) => setEmail(newText)}
      />
      {}
      <View>
        <TouchableOpacity style = {styles.customButton} onPress={() => regHandler(user, pass, email)} >
          <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
}

   //useEffect Hook ~ lets you do stuff after the component renders
   //hook only in component
   
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#F8DCC4',
    alignItems: 'center',
    padding: 20,
  },
  registerText: {
    fontSize: 45,
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
  penguinImage: {
    width: 200,
    height: 310,
    marginRight: 35,
    marginBottom: 20

  },
  textContainer:{
    flex: 1,
    backgroundColor: '#E7E7E7',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    marginTop: 10,
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
