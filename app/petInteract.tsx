import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getData } from "./index";

export default function PetInteractScreen() {
  const router = useRouter();
  const [petId, setPetId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchPetId() {
      const idString = await getData('petId');
      if (idString) {
        setPetId(parseInt(idString));
      }
    }
    fetchPetId();
  }, []);

  const getPetImage = () => {
    switch (petId) {
      case 1:
        return require('../assets/images/itty_bitty_kitty.jpg');
      case 2:
        return require('../assets/images/panda-colorcorrected.png');
      case 3:
        return require('../assets/images/npeng.png');
      case 4:
        return require('../assets/images/rock.png');
      case 5:
        return require('../assets/images/nturtle.png');
      default:
        return null;
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Pet Interact' }} />
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Interact With Your Pet!</Text>

        <View style={styles.imagePlaceholder}>
          {getPetImage() && (
            <Image
              source={getPetImage()}
              style={styles.petImage}
              resizeMode="contain"
            />
          )}
        </View>

        <View style={styles.buttonGrid}>
          <TouchableOpacity style={styles.customButton}>
            <Text style={styles.buttonText}>Pet</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.customButton}>
            <Text style={styles.buttonText}>Feed</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.customButton}>
            <Text style={styles.buttonText}>Good Cry</Text>
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
  petImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
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
