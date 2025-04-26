import React, {useEffect} from "react";
import { Text, View } from "react-native";
import { useRouter, Redirect } from 'expo-router';


export default function Index() {
  const router = useRouter();
  return <Redirect href="/login" />;
}
