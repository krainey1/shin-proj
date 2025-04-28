import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Stack } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getData, storeData } from './index';

/*
  keeping the ids straight:
  cat - 1
  panda - 2
  penguin - 3
  rock - 4
  turtle - 5

*/


export default function PetScreen() {
  const navigation = useNavigation();
  const handlePress = async (petKey) => {
    //lets use that asynchstorage and get our userid!
    const id = await getData('userId')
    axios.post('http://10.0.2.2:5000/selectPet', {userId: id, pet: petKey})
    .then(response => {console.log("Received Data:", response.data);
      const petId = response.data.petId;
        //asych stores everything as strings
        storeData('petId', petId.toString())
        navigation.reset({ //some hocus pocus so people cant go back to account/creation login ~ resets the root to home
          index: 0,
          routes: [{ name: 'home' }] as any, 
        });
    })
    .catch(error => {console.error("Lost the Plot", error)})
    console.log(`${petKey} picked!`);
  };

  return (
    
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Pick Your Pet!' }} />
      <Text style={styles.title}>Pet Picking!</Text>
      <Text style={styles.text}>Touch a Pet to Pick One!</Text> 

      <View style={styles.grid}>
        {}
        <TouchableOpacity onPress={() => handlePress(1)} style={styles.button}>
          <Image
            source={require('../assets/images/itty_bitty_kitty.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress(2)} style={styles.button}>
          <Image
            source={require('../assets/images/panda-colorcorrected.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress(3)} style={styles.button}>
          <Image
            source={require('../assets/images/npeng.png')}
            style={styles.pimage}
            resizeMode="stretch"
          />
        </TouchableOpacity>

        {}
        <TouchableOpacity onPress={() => handlePress(4)} style={styles.button}>
          <Image
            source={require('../assets/images/rock.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress(5)} style={styles.button}>
          <Image
            source={require('../assets/images/nturtle.png')}
            style={styles.timage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F8DCC4',
    alignItems: 'center',
    padding: 20,
  },
  title:{
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    margin: 10,
    padding: 1,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: 'black',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: 110,
    height: 105, 
  }, 
  timage: {
    width: 250, 
    height: 100,
  },
  pimage: 
  {
    width: 110, 
    height: 105,
  }
});


