import React, {useState} from "react";
import {StyleSheet, View, Text, TextInput, Button, ScrollView, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
 //Ant is very cool UI design library

export default function createScreen() {
  const router = useRouter();
  const days = ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"]
  return (
    <>
    <View style={{padding: 15}}>
        <Text style = {{fontSize: 20, marginTop: 10, fontWeight: "500"}}> Create Habit </Text>
        <TextInput style = {{ width: '95%', marginTop: 15, padding: 15, borderRadius: 10, borderColor: "black", borderWidth: 2, backgroundColor: "white"}} placeholder="Habit Name"/>
        <Text style= {{fontSize: 18, fontWeight:"500"}}> Days To Complete </Text>
        <View style={{flexDirection: "row", alignItems:"center", gap:10, marginTop:10}}>
            {days?.map((item, index) => {
                return (
                <Pressable key={index} style={{width: 40, height: 40, borderRadius: 5, backgroundColor: "#DD856F", justifyContent: "center", alignItems: "center"}}>
                    <Text style = {{color: "white"}}>{item}</Text>
                </Pressable>
                );
            })}
        </View>
        <View style = {{marginTop: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
            <Text style={{fontSize: 17, fontWeight: "500"}}> Reminder </Text>
            <Pressable style={{width: 40, height: 40, borderRadius: 5, backgroundColor: "#DD856F", justifyContent: "center", alignItems: "center"}}>  <Text style = {{color: "white"}}> Yes</Text>  </Pressable>
        </View>
        <Pressable style = {{marginRight: 25, marginLeft: 25, backgroundColor: "#DD856F", padding: 10, borderRadius: 8}}>
            <Text style = {{textAlign: "center", color: "white", fontWeight: "bold"}}> CREATE </Text>
        </Pressable>
    </View>
    </>
    
  );
}

//need to change reminders portion to mark for back
const styles = StyleSheet.create({})