import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Image } from 'expo-image';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
  
      axios.post('https://appapi-production.up.railway.app/register', {username: user, password: pass, email: email})
      .then(response => {console.log("Received Data:", response.data);
        const userId = response.data.userId;
        if(userId !== -1)
        {
          //asych stores everything as strings
          storeData('userId', userId.toString())
          storeData('notifsOn', "false")
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
    <Stack.Screen options={{ title: 'Create Your Account!', headerShown: false }} />
    <View style={styles.container}>
      <View style ={{flexDirection:"row", marginRight: 5, alignSelf: "flex-start"}}>
      <AntDesign onPress={() => router.replace("/login")} name="arrowleft" size={30} color="black"/>
      </View>
      <Image source={require('../assets/banners/create.png')} style={styles.text_banner}></Image>
      <Image source={require('../assets/animations/happypenguin.gif')} style={styles.penguinImage}></Image>
      <TextInput 
        style={styles.input}
        placeholder="Username"
        placeholderTextColor='#DD856F'
        value = {user}
        onChangeText={(newText) => setUser(newText)}
      />
      <TextInput 
        style={styles.input}
        placeholder="Password"
        placeholderTextColor='#DD856F'
        value = {pass}
        secureTextEntry={true}
        onChangeText={(newText) => setPass(newText)}
      />
      <TextInput 
        style={styles.input}
        placeholder="Email"
        placeholderTextColor='#DD856F'
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
    width: 240,
    height: 50,
    backgroundColor: '#DD856F',
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  penguinImage: {
    width: 175,
    height: 250,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 30
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
  text_banner: {
    width: 350,
    height: 205,
    marginTop: -25,
    marginBottom: -50
  },
});
