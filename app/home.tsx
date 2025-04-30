import { Stack, useRouter } from 'expo-router';
import React, {useEffect} from "react";
import * as Notifications from 'expo-notifications';
import {getData, storeData} from "./index";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function HomeScreen() {
  const router = useRouter();

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

  const scheduleNotificationOnce = async () => {
    console.log("wtf2");
    const alreadyScheduled = await getData("notifsOn");
    console.log(alreadyScheduled);
    if (!alreadyScheduled) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Time to check in!",
          body: "How are you feeling?",
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 60, // every 5 minutes for testing
          repeats: true,
        }
      });
      await storeData('notifsOn', 'true');
      console.log("we getting here??")
    }
  };

  useEffect(() => {
    console.log("wtf");
    async function prepareNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
          console.log("in here?")
          alert('Permission for notifications was not granted.');
          return;
        }
      }
      // Now call your scheduling function
      scheduleNotificationOnce();
    }
    prepareNotifications();
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome!</Text>

        {/* Image spacer */}
        <View style={styles.imagePlaceholder}>
          {/* Pet gif? */}
        </View>

        {}
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
