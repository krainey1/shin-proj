import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';


export default function PetScreen() {
  const handlePress = (petKey) => {
    console.log(`${petKey} picked!`);
  };

  return (
    
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Pick Your Pet!' }} />
      <Text style={styles.text}>Pet Picking! Touch a Pet to Pick One!</Text>

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
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
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


