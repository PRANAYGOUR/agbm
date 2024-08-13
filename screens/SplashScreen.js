// SplashScreen.js
import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLogo(false);
      navigation.navigate('Start');
    }, 3500); // 5 seconds
  }, []);

  return (
    <View style={styles.container}>
      {showLogo && (
        <>
          <Image
            source={require('../assets/logo3.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.footerText}>Presented by PG Studio</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2C196', // light cream color
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20, // add some space between the logo and the footer text
  },
  footerText: {
    fontSize: 25,
    marginTop:80,
    fontWeight:'Bold',
    color: '#333', // dark gray color
  },
});

export default SplashScreen;