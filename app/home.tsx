import axios from "axios";
import { Image } from 'expo-image';
import * as Notifications from 'expo-notifications';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import catGif from '../assets/animations/happycat.gif';
import pandaGif from '../assets/animations/happypanda2.gif';
import penguinGif from '../assets/animations/happypenguin.gif';
import rockGif from '../assets/animations/happyrock2.gif';
import turtleGif from '../assets/animations/happyturtle2.gif';

import { getData, storeData } from "./index";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function HomeScreen() {
  const router = useRouter();

  type Habit = {
    user_id: number;
    habit: string;
    days: string[];
    reminder: number;
    completed: number;
  };

  const showHappyPopup = () => {
    const messages = [
      "You're doing amazing! <3",
      "Keep smiling, sunshine! :)",
      "One step at a time, you're getting there!",
      "You're stronger than you think <3",
      "Take a deep breath and feel the peace :)",
      "Today is full of possibilities!",
      "Your effort matters. Always.",
      "Go you!! <3",
      "Your Pet believes in you!",
      "Sending good vibes your way :)"
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    Alert.alert("Happiness!", randomMessage);
  };

  const [habits, setHabits] = useState<Habit[]>();
  const [petId, setPetId] = useState<string | null>(null);

  const getHabits = async () => {
    const userid = await getData("userId");
    return axios.post('https://appapi-production.up.railway.app/getTodo', { id: userid })
      .then(response => {
        console.log("Received Data:", response.data);
        const filteredHabits = response.data.habits?.filter((habit: Habit) => habit.reminder === 1) || [];
        setHabits(filteredHabits);
        return filteredHabits;
      })
      .catch(error => {
        console.error("Lost the Plot", error);
        return [];
      });
  };

  const scheduleNotificationOnce = async () => {
    console.log("wtf2");
    const alreadyScheduled = await getData("notifsOn");
    console.log(alreadyScheduled);
    if (alreadyScheduled === "false") {
      const rehabits = await getHabits();
      const habitNames = rehabits.map((habit: Habit) => habit.habit).join(", ");
      const message = habitNames.length > 0
        ? `Here's your reminder for: ${habitNames} For Today! You can do it!`
        : "No habits to remind you about...but your pet misses you <3";
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Reminder:",
          body: message,
        },
        trigger: {
          type: 'timeInterval',
          seconds: 300, // 5 minutes
          repeats: true
        } as any
      });
      await storeData('notifsOn', 'true');
      console.log("we getting here??");
    }
  };

  const getPetGif = () => {
    switch (petId) {
      case "1":
        return catGif;
      case "2":
        return pandaGif;
      case "3":
        return penguinGif;
      case "4":
        return rockGif;
      case "5":
        return turtleGif;
      default:
        return null;
    }
  };

  useEffect(() => {
    async function prepareNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
          alert('Permission for notifications was not granted.');
          return;
        }
      }
      scheduleNotificationOnce();
    }

    async function loadPetId() {
      const storedPetId = await getData("petId");
      setPetId(storedPetId);
    }

    prepareNotifications();
    loadPetId();
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />

      <View style={styles.container}>
        <Image source={require('../assets/banners/welcome.png')} style={styles.text_banner}></Image>
        {getPetGif() && (
            <Image
              source={getPetGif()}
              style={styles.petImage}
              contentFit="contain"
            />
          )}

          <TouchableOpacity style={styles.customButton} onPress={showHappyPopup}>
            <Text style={styles.buttonText}>Happy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.customButton} onPress={() => router.push('/petInteract')}>
            <Text style={styles.buttonText}>Pet Interact</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.customButton} onPress={() => router.push('/resources')}>
            <Text style={styles.buttonText}>Resources</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.customButton} onPress={() => router.push('/habits')}>
            <Text style={styles.buttonText}>Habits</Text>
          </TouchableOpacity>
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E7E7',
    alignItems: 'center',
    padding: 5,
  },
  //welcomeText: {
    //fontSize: 32,
    //fontWeight: 'bold',
    //marginTop: 40,
  //},
  //imagePlaceholder: {
    //flex: 1,
    //width: '100%',
    //marginTop: 5,
    //marginBottom: 20,
    //backgroundColor: '#E7E7E7',
    //borderRadius: 20,
    //justifyContent: 'center',
    //alignItems: 'center',
  //},
  petImage: {
    width: 500,
    height: 300,
    marginLeft: 30,
    marginTop: 10,
    marginBottom: -18
  },
  //buttonGrid: {
    //flexDirection: 'row',
    //flexWrap: 'wrap',
    //justifyContent: 'center',
    //marginBottom: 30,
  //},
  customButton: {
    width: 240,
    height: 50,
    backgroundColor: '#DD856F',
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  text_banner: {
    width: 350,
    height: 205,
    marginTop: 20,
    marginBottom: -60
  },
});