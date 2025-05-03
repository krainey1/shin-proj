import { Image } from 'expo-image';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getData } from "./index";

export default function PetInteractScreen() {
  const router = useRouter();
  const [petId, setPetId] = useState<number | null>(null);
  const [currentImage, setCurrentImage] = useState<any>(null);
  const [isTempImage, setIsTempImage] = useState(false);

  useEffect(() => {
    async function fetchPetId() {
      const idString = await getData('petId');
      if (idString) {
        const id = parseInt(idString);
        setPetId(id);
        setCurrentImage(getStaticImage(id));
      }
    }
    fetchPetId();
  }, []);

  const getStaticImage = (id: number) => {
    switch (id) {
      case 1: return require('../assets/images/itty_bitty_kitty.jpg');
      case 2: return require('../assets/images/panda-colorcorrected.png');
      case 3: return require('../assets/images/npeng.png');
      case 4: return require('../assets/images/rock.png');
      case 5: return require('../assets/images/nturtle.png');
      default: return null;
    }
  };

  const getGif = (action: string) => {
    if (!petId) return null;

    const gifMap: Record<number, Record<string, any>> = {
      1: {
        pet: require('../assets/animations/petcat.gif'),
        feed: require('../assets/animations/fedcat.gif'),
        cry: require('../assets/animations/sadcat2.gif'),
      },
      2: {
        pet: require('../assets/animations/petpanda.gif'),
        feed: require('../assets/animations/fedpanda.gif'),
        cry: require('../assets/animations/sadpanda.gif'),
      },
      3: {
        pet: require('../assets/animations/petpen.gif'),
        feed: require('../assets/animations/fedpen.gif'),
        cry: require('../assets/animations/sadpenguin.gif'),
      },
      4: {
        pet: require('../assets/animations/petrock.gif'),
        feed: require('../assets/animations/fedrock.gif'),
        cry: require('../assets/animations/sadrock.gif'),
      },
      5: {
        pet: require('../assets/animations/petturtle.gif'),
        feed: require('../assets/animations/fedturtle.gif'),
        cry: require('../assets/animations/sadturtle.gif'),
      },
    };

    return gifMap[petId]?.[action] || null;
  };

  const handleAction = (action: string) => {
    if (!petId || isTempImage) return;

    const gif = getGif(action);
    if (gif) {
      setCurrentImage(gif);
      setIsTempImage(true);

      setTimeout(() => {
        setCurrentImage(getStaticImage(petId));
        setIsTempImage(false);
      }, 5000); // we can change the seconds here 
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Pet Interact' }} />
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Interact With Your Pet!</Text>

        <View style={styles.imagePlaceholder}>
          {currentImage && (
            <Image
              source={currentImage}
              style={styles.petImage}
              resizeMode="contain"
            />
          )}
        </View>

        <View style={styles.buttonGrid}>
          <TouchableOpacity style={styles.customButton} onPress={() => handleAction('pet')}>
            <Text style={styles.buttonText}>Pet</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.customButton} onPress={() => handleAction('feed')}>
            <Text style={styles.buttonText}>Feed</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.customButton} onPress={() => handleAction('cry')}>
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
