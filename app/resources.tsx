import AntDesign from '@expo/vector-icons/AntDesign';
import { Stack, useRouter } from 'expo-router';
import React from "react";
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ResourceScreen() {
  const router = useRouter();
  return (
    <>
      <Stack.Screen options={{ title: 'Mental Health Resources' }} />
      <View style={{ flex: 1 }}>
      <View style ={{flexDirection:"row", marginRight: 5}}>
      <AntDesign onPress={() => router.replace("/home")} name="home" size={30} color="black"/>
      </View>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.header}>Resources!</Text>

          <Text style={styles.title}>988 Suicide and Crisis Lifeline</Text>
          <Text style={styles.link} onPress={() => Linking.openURL('https://988lifeline.org/')}>https://988lifeline.org/</Text>

          <Text style={styles.title}>Al-Anon</Text>
          <Text style={styles.link} onPress={() => Linking.openURL('https://aisnm.org/index.html')}>https://aisnm.org/index.html</Text>

          <Text style={styles.title}>Nami New Mexico</Text>
          <Text style={styles.link} onPress={() => Linking.openURL('https://naminewmexico.org/')}>https://naminewmexico.org/</Text>

          <Text style={styles.title}>Patients Engage</Text>
          <Text style={styles.link} onPress={() => Linking.openURL('https://www.patientsengage.com/')}>https://www.patientsengage.com/</Text>

          <Text style={styles.title}>Heads Together</Text>
          <Text style={styles.link} onPress={() => Linking.openURL('http://headstogether.org.uk/')}>http://headstogether.org.uk/</Text>
          
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#E7E7E7',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
  },
  link: {
    fontSize: 14,
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
});
