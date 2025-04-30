import React, {useState, useCallback} from "react";
import {StyleSheet, View, Text, Button, ScrollView, Pressable, Modal, TouchableOpacity} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import {getData} from './index';
import axios from 'axios';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from "expo-status-bar";

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
  const [openModal, setOpenModal] = useState(false);
  const [marker, setMarker] = useState("");
  
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

  const checkoff = async (habit: string) => {
    const userid = await getData("userId") //Need to wait for the userId
    axios.post('http://10.0.2.2:5000/complete', {id: userid, habit: habit})
    .then(response => {console.log("Received Data:", response.data);
      if(response.data.valid == 1)
      {
        getHabits()
      }
      else
      {
        alert("Something went wrong..Try again")
        return 
      }
    })
    .catch(error => {console.error("Lost the Plot", error)})
    .finally(() => {setLoad(false)})
  }

  return (
    <>
    <Stack.Screen options={{ title: 'Your Habits!' }} />
    <StatusBar style="auto" />
      <Modal
        visible={openModal}
        statusBarTranslucent={true}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.title}></Text>
            <Text style={styles.desc}>
              Want To Mark Your Habit As Complete For Today?
            </Text>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  width: "100%",
                  marginTop: 24,
                  backgroundColor: "#DD856F",
                },
              ]}
              onPress={() => {checkoff(marker) ,setOpenModal(false)}}
            >
              <Text style={[styles.text, { color: "white" }]}>Complete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  width: "100%",
                  marginTop: 24,
                  backgroundColor:"#DD856F",
                },
              ]}
              onPress={() => setOpenModal(false)}
            >
              <Text style={[styles.text, { color: "white" }]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    <ScrollView style={{flex:1, backgroundColor:"#E7E7E7", padding:10}}>
      <View style ={{flexDirection:"row", alignItems: "center", justifyContent:"space-between", paddingBottom: 15}}>
      <View style ={{flexDirection:"row", marginRight: 5}}>
      <AntDesign onPress={() => router.replace("/home")} name="home" size={30} color="black"/>
      </View>
      <View style ={{flexDirection:"row", marginRight: 5, marginTop: 5}}>
      <AntDesign onPress={() => router.push("/create")}name="pluscircleo" size={26} color="black" />
      <Text style = {{fontSize: 20}}> Add </Text>
      </View>
      <View style ={{flexDirection:"row", marginRight: 5, marginTop: 5}}>
      <Ionicons onPress = {() => {router.push("/remove")}} name="remove-circle-outline" size={30} color="black" />
      <Text style = {{fontSize: 20}}> Del </Text>
      </View>
      </View>
      <View style = {{flexDirection: "row", alignItems: "center", gap:10, marginVertical: 8}}>
        <Pressable onPress={() => (optionSet('Todo'))} style = {{backgroundColor: option == 'Todo' ? "#DD856F": "transparent", paddingHorizontal: 20, paddingVertical:12, borderRadius:20}}>    
          <Text style = {{textAlign:"center", color: option == 'Todo' ? "white": "black", fontSize: 15}}> To-do </Text>
        </Pressable>
        <Pressable onPress={() => {optionSet('Completed'); getHabits()}}style = {{backgroundColor: option == 'Completed' ? "#DD856F": "transparent", paddingHorizontal: 20, paddingVertical:12, borderRadius:20}}> 
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
        onPress={() => {
          if (option === "Todo") {
            setMarker(habit.habit);
            setOpenModal(true);
          }}}>
        <Text style={{color: "white"}}> {habit.habit} </Text>
      </Pressable>
  )))}
    </ScrollView>
    </>
    
  );
}

//yoinking modeal/style sheet from a modal example repo https://github.com/liptonzuma/modal/blob/main/App.tsx
const styles = StyleSheet.create({
  desc: {
    fontSize: 16,
    lineHeight: 24,
    color: "black"
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 12,
  },
  card: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 8,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  text: {
    fontWeight: "600",
    fontSize: 16,
    color: "white",
  },
  button: {
    width: "90%",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    borderRadius: 8,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});