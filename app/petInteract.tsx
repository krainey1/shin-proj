import AntDesign from '@expo/vector-icons/AntDesign';
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
      case 1: return require('../assets/images/itty_bitty_kitty_nobackground.png');
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
        cry: require('../assets/animations/sadpanda2.gif'),
      },
      3: {
        pet: require('../assets/animations/petpen.gif'),
        feed: require('../assets/animations/fedpen.gif'),
        cry: require('../assets/animations/sadpenguin.gif'),
      },
      4: {
        pet: require('../assets/animations/petrock.gif'),
        feed: require('../assets/animations/fedrock.gif'),
        cry: require('../assets/animations/sadrock2.gif'),
      },
      5: {
        pet: require('../assets/animations/petturtle.gif'),
        feed: require('../assets/animations/fedturtle.gif'),
        cry: require('../assets/animations/sadturtle2.gif'),
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
      }, 5000); // we can change the seconds here (in milliseconds)
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Pet Interact', headerShown: false }} />
      <View style={styles.container}>
        <View style ={{flexDirection:"row", marginRight: 5, marginTop: 30, alignSelf: "flex-start"}}>
        <AntDesign onPress={() => router.replace("/home")} name="home" size={30} color="black"/>
        </View>
        <Image source={require('../assets/banners/interact.png')} style={styles.text_banner}></Image>

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
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: '#E7E7E7', 
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
    petImage: {
      width: 500,
      height: 300,
      marginTop: 5,
      marginBottom: 5
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 100,
  },
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
    width: 365,
    height: 220,
    marginTop: -12,
    marginBottom: -70
  },
});
