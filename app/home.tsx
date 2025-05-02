import axios from "axios";
import * as Notifications from 'expo-notifications';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import catImg from '../assets/images/itty_bitty_kitty.jpg';
import penguinImg from '../assets/images/npeng.png';
import turtleImg from '../assets/images/nturtle.png';
import pandaImg from '../assets/images/panda-colorcorrected.png';
import rockImg from '../assets/images/rock.png';
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
          seconds: 300,
          repeats: true
        } as any
      });
      await storeData('notifsOn', 'true');
      console.log("we getting here??");
    }
  };

  const getPetImage = () => {
    switch (petId) {
      case "1":
        return catImg;
      case "2":
        return pandaImg;
      case "3":
        return penguinImg;
      case "4":
        return rockImg;
      case "5":
        return turtleImg;
      default:
        return null;
    }
  };

  useEffect(() => {
    console.log("wtf");
    async function prepareNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
          console.log("in here?");
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
      <Stack.Screen options={{ title: 'Home' }} />

      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome!</Text>

        {/* Pet Display */}
        <View style={styles.imagePlaceholder}>
          {getPetImage() && (
            <Image
              source={getPetImage()}
              style={{ width: 200, height: 200, alignSelf: 'center' }}
              resizeMode="contain"
            />
          )}
        </View>

        {/* Button Grid */}
        <View style={styles.buttonGrid}>
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
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E7E7',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 40,
  },
  imagePlaceholder: {
    flex: 1,
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#cccccc55',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
  },
  customButton: {
    width: 140,
    height: 60,
    backgroundColor: '#DD856F',
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
