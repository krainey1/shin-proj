import React, {useEffect} from "react";
import { Text, View } from "react-native";
import {Redirect } from 'expo-router';


export default function Index() {
  return <Redirect href="/login" />;
}

