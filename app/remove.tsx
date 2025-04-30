import React, {useState, useCallback} from "react";
import {StyleSheet, View, Text, Button, ScrollView, Pressable, Modal, TouchableOpacity} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import {getData} from './index';
import axios from 'axios';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from "expo-status-bar";

//mostly the same as the previous page but now deletion be cool


export default function RemoveScreen() {
  type Habit = {
    user_id: number;
    habit: string;
    days: string[]; 
    reminder: number;
    completed: number;
  };
  const router = useRouter();
  const [habits, setHabits] = useState<Habit[]>([])
  const [load, setLoad] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [marker, setMarker] = useState("");
  
  const getHabits = async () => {
    const userid = await getData("userId") //Need to wait for the userId
    axios.post('https://appapi-production.up.railway.app/selectAll', {id: userid})
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

  //removing habit
  const rhabit = async (habit: string) => {
    const userid = await getData("userId") //Need to wait for the userId
    axios.post('https://appapi-production.up.railway.app/remove', {id: userid, habit: habit})
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
    <Stack.Screen options={{ title: 'Habit Deletion!' }} />
    <StatusBar style="auto" />
      <Modal
        visible={openModal}
        statusBarTranslucent={true}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.title}> </Text>
            <Text style={styles.desc}>Want to delete this Habit Permanently? It will not show up in your To-do any day of the week. </Text>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  width: "100%",
                  marginTop: 24,
                  backgroundColor: "#DD856F",
                },
              ]}
              onPress={() => {rhabit(marker) ,setOpenModal(false)}}
            >
              <Text style={[styles.text, { color: "white" }]}>Delete</Text>
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
      <View style ={{flexDirection:"row", alignItems: "center", justifyContent:"space-between", paddingBottom: 5}}>
      <View style ={{flexDirection:"row"}}>
      <AntDesign onPress={() => router.push("/habits")} name="back" size={30} color="black"/>
      </View>
       </View> 
       <Text style = {{fontSize: 20, marginTop: 10, fontWeight: "500", marginBottom: 8}}>Delete A Habit! </Text>
      <Text style = {{fontWeight: "400"}}>All Existing Habits, Tap one to Confirm Deletion! </Text>
      <View style = {{flexDirection: "row", alignItems: "center", gap:10, marginVertical: 8}}>

      </View>
      { load? (
        <Text style={{ textAlign: "center", fontSize: 16 }}> </Text>
    ): habits.length === 0 ? (
          <Text style={{ textAlign: "center", fontSize: 16 }}> No Habits Available!</Text>
        ) : (
        habits
      .map((habit, index) => (
      <Pressable 
        key={index}  
        style={{height: 50, marginBottom: 15, backgroundColor: "#DD856F", borderRadius: 15, justifyContent: "center", alignItems: "center"}}
        onPress={() => {
            setMarker(habit.habit);
            setOpenModal(true);
          }}>
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