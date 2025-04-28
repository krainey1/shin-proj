import React, {useState} from "react";
import {StyleSheet, View, Text, TextInput, Button, ScrollView, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
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
  return (
    <>
    <View style={{padding: 15}}>
        <Text style = {{fontSize: 20, marginTop: 10, fontWeight: "500"}}> Create Habit </Text>
        <TextInput  value = {hname}
        onChangeText={(newText) => sethname(newText)} style = {{ width: '95%', marginTop: 15, marginBottom: 10, padding: 15, borderRadius: 10, borderColor: "black", borderWidth: 2, backgroundColor: "white"}} placeholder="Habit Name"/>
        <Text style= {{fontSize: 20, fontWeight:"500"}}> Days To Complete </Text>
        <View style={{marginLeft: 10, marginRight: 10,flexDirection: "row", alignItems:"center", gap:12, marginTop:10}}>
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
            <Text style={{fontSize: 20, fontWeight: "500"}}> Want a Reminder? </Text>
            <Pressable onPress = {() => handleReminderPress()} style={{width: 40, height: 40, marginBottom: 10, borderRadius: 10, backgroundColor: reminder ? "#FFCC00" : "#DD856F", justifyContent: "center", alignItems: "center"}}> 
                <Text style = {{color: "white"}}>Yes</Text>  
            </Pressable>
        </View>
        <Pressable style = {{width: '95%', marginTop: 15, marginBottom: 10, backgroundColor: "#DD856F", padding: 10, borderRadius: 8}}>
            <Text style = {{textAlign: "center", color: "white", fontWeight: "bold"}}> CREATE </Text>
        </Pressable>
    </View>
    </>
    
  );
}

//need to change reminders portion to mark for back
const styles = StyleSheet.create({})