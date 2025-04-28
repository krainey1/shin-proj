import React, {useState} from "react";
import {StyleSheet, View, Text, Button, ScrollView, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
 //Ant is very cool UI design library

export default function HabitScreen() {
  const router = useRouter();
  const [option, optionSet] = useState('Todo');
  return (
    <>
    <Stack.Screen options={{ title: 'Your Habits!' }} />
    <ScrollView style={{flex:1, backgroundColor:"#E7E7E7", padding:10}}>
      <View style ={{flexDirection:"row", alignItems: "center", justifyContent:"space-between"}}>
      <AntDesign name="hearto" size={26} color="black" />
      <AntDesign onPress={() => router.push("/create")}name="pluscircleo" size={24} color="black" />
      </View>
      <Text style = {{marginTop:5, fontSize: 23, fontWeight:"500"}}> Habits</Text>
      <View style = {{flexDirection: "row", alignItems: "center", gap:10, marginVertical: 8}}>
        <Pressable onPress={() => optionSet('Todo')} style = {{backgroundColor: option == 'Todo' ? "#DD856F": "transparent", paddingHorizontal: 10, paddingVertical:8, borderRadius:25}}>    
          <Text style = {{textAlign:"center", color: option == 'Todo' ? "white": "black", fontSize: 15}}> Todo </Text>
        </Pressable>
        <Pressable onPress={() => optionSet('Completed')}style = {{backgroundColor: option == 'Completed' ? "#DD856F": "transparent", paddingHorizontal: 10, paddingVertical:8, borderRadius:25}}> 
          <Text style = {{textAlign:"center", color: option == 'Completed' ? "white": "black", fontSize: 15}}> Completed </Text>
        </Pressable>
      </View>
    </ScrollView>
    </>
    
  );
}


const styles = StyleSheet.create({})