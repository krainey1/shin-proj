import React, {useEffect} from "react";
import { Text, View } from "react-native";
import {Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

//What is asynchstorage, cool thing that saves data when the app closes /set here import in other files
//func for setting key/value pair in async storage
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Error saving data', error);
  }
};

//getting key value pair from async storage
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error('Error getting data', error);
    return null;
  }
};

export default function Index() {
  return <Redirect href="/login" />;
}

