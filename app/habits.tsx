import React, {useState, useCallback} from "react";
import {StyleSheet, View, Text, Button, ScrollView, Pressable} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import {getData} from './index';
import axios from 'axios';
import AntDesign from '@expo/vector-icons/AntDesign';
//Ant is very cool UI design library
//Get day of current day of the week, for each habit extract the user days of their habits from their JSON, check against day of week, if match put habits in JSON object + send in response 
//got to check if their habit name already exists back in create habit


export default function HabitScreen() {
  type Habit = {
    user_id: number;
    habit: string;
    days: string[]; 
    reminder: number;
    completed: number;
  };
  const router = useRouter();
  const [option, optionSet] = useState('Todo');
  const [habits, setHabits] = useState<Habit[]>([])
  const [load, setLoad] = useState(true);
  
  const getHabits = async () => {
    const userid = await getData("userId") //Need to wait for the userId
    axios.post('http://10.0.2.2:5000/getTodo', {id: userid})
    .then(response => {console.log("Received Data:", response.data);
      setHabits(response.data.habits || [])
    })
    .catch(error => {console.error("Lost the Plot", error)})
    .finally(() => {setLoad(false)})
  }
  useFocusEffect( //render side effect on screen focus
    useCallback(() => { //ensures render doesnt happen unless required
      getHabits();
    }, [])
  );
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
        <Pressable onPress={() => (optionSet('Todo'))} style = {{backgroundColor: option == 'Todo' ? "#DD856F": "transparent", paddingHorizontal: 10, paddingVertical:8, borderRadius:25}}>    
          <Text style = {{textAlign:"center", color: option == 'Todo' ? "white": "black", fontSize: 15}}> Todo </Text>
        </Pressable>
        <Pressable onPress={() => {optionSet('Completed'); getHabits()}}style = {{backgroundColor: option == 'Completed' ? "#DD856F": "transparent", paddingHorizontal: 10, paddingVertical:8, borderRadius:25}}> 
          <Text style = {{textAlign:"center", color: option == 'Completed' ? "white": "black", fontSize: 15}}> Completed </Text>
        </Pressable>
      </View>
      { load? (
  <Text style={{ textAlign: "center", fontSize: 16 }}> </Text>
): habits.length === 0 ? (
          <Text style={{ textAlign: "center", fontSize: 16 }}> No Habits For Today! Go ahead and add some!</Text>
        ) : (
      habits
      .filter(habit => option === 'Todo' ? habit.completed === 0 : habit.completed === 1)
      .map((habit, index) => (
      <Pressable 
        key={index}  
        style={{height: 50, marginBottom: 15, backgroundColor: "#DD856F", borderRadius: 15, justifyContent: "center", alignItems: "center"}}
        onPress={() => console.log(`Habit: ${habit.habit}`)}> 
        <Text style={{color: "white"}}> {habit.habit} </Text>
      </Pressable>
  )))}
    </ScrollView>
    </>
    
  );
}


const styles = StyleSheet.create({})