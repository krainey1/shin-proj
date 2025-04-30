import React, {useState} from "react";
import {StyleSheet, View, Text, TextInput, Button, ScrollView, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import axios from 'axios';
import {getData} from './index';
import AntDesign from '@expo/vector-icons/AntDesign';
 //Ant is very cool UI design library

export default function createScreen() {
  const router = useRouter();
  const days = ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"]
  const[hname, sethname] = useState('');
  const[dayss, setDays] = useState<string[]>([]);
  const[reminder, setReminder] = useState(0);
  //.filter and .includes ~ returns filtered array & does it have it respectively
  const handleDayPress = (day) => {
    if (dayss.includes(day)) {
      // Already selected -> unselect it
      setDays(dayss.filter(d => d !== day));
    } else {
      // Not selected yet add it ~ spread operator kinda cool ...
      setDays([...dayss, day]);
    }
  };

  const handleReminderPress = () => {
    if(reminder == 0)
    {
        setReminder(1);
    }
    else{
        setReminder(0);
    }
  }

  const addHabit = async (hname, dayss, reminder) => { //async execution
    const id = await getData('userId'); //wait until we have the user id
    if(hname.trim() === '' || dayss.length == 0)
        {
          alert('Please Enter A Name and The Days You Would Like to complete Your Habit');
          return;
        }
    axios.post('http://10.0.2.2:5000/add', {userid: id, hname: hname, days: dayss, reminder: reminder}) //post request w/json body
    .then(response => {console.log("Received Data:", response.data);
      const check = response.data.valid;
      if(check !== 0)
      {
        router.replace("/habits");
      } 
      else{
        alert('A Habit with this name already exists!');
        return;
      }
    })
    .catch(error => {console.error("Lost the Plot", error)})

  }
  return (
    <>
    <View style={{padding: 15}}>
        <View style ={{flexDirection:"row", alignItems: "center", justifyContent:"space-between", paddingBottom: 5}}>
          <View style ={{flexDirection:"row"}}>
          <AntDesign onPress={() => router.replace("/habits")} name="back" size={30} color="black"/>
          </View>
        </View> 
        <Text style = {{fontSize: 20, marginTop: 10, fontWeight: "500"}}>Create A Habit! </Text>
        <TextInput  value = {hname}
        onChangeText={(newText) => sethname(newText)} style = {{ width: '100%', marginTop: 15, marginBottom: 10, padding: 15, borderRadius: 10, borderColor: "black", borderWidth: 2, backgroundColor: "white"}} placeholder="Habit Name"/>
        <Text style= {{fontSize: 20, fontWeight:"500"}}>Days To Complete Per Week</Text>
        <View style={{ marginLeft: 12, marginRight: 10,flexDirection: "row", alignItems:"center", gap:12, marginTop:10}}>
            {days?.map((item, index) => {
                const isSelected = dayss.includes(item);
                return (
                <Pressable key={index} onPress = {() => handleDayPress(item)}style={{width: 40, height: 40, borderRadius: 5,  backgroundColor: isSelected ? "#FFCC00" : "#DD856F", justifyContent: "center", alignItems: "center"}}>
                    <Text style = {{color: "white"}}>{item}</Text>
                </Pressable>
                );
            })}
        </View>
        <View style = {{marginTop: 20, flexDirection: "row", alignItems: "center", gap: 20}}>
            <Text style={{fontSize: 20, fontWeight: "500"}}>Want A Reminder? </Text>
            <Pressable onPress = {() => handleReminderPress()} style={{width: 40, height: 40, marginBottom: 10, borderRadius: 10, backgroundColor: reminder ? "#FFCC00" : "#DD856F", justifyContent: "center", alignItems: "center"}}> 
                <Text style = {{color: "white"}}>Yes</Text>  
            </Pressable>
        </View>
        <Pressable onPress = {() => addHabit(hname, dayss, reminder)} style = {{width: '100%', marginTop: 15, marginBottom: 10, backgroundColor: "#DD856F", padding: 10, borderRadius: 8}}>
            <Text style = {{textAlign: "center", color: "white", fontWeight: "bold"}}> CREATE </Text>
        </Pressable>
    </View>
    </>
    
  );
}

const styles = StyleSheet.create({})