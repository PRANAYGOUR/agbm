import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const Start = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const phoneNumber = await SecureStore.getItemAsync('phoneNumber');
      const password = await SecureStore.getItemAsync('password');
      const applicantName = await SecureStore.getItemAsync('applicantName');
      if (phoneNumber && password && applicantName) {
        navigation.navigate('Feed', { 
          userData: { 
            phoneNumber, 
            applicantName 
          } 
        });
      }
    };
    checkLoginStatus();
  }, []);
  
  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/bg3.png')} style={styles.backgroundImage} />
      <View style={styles.contentContainer}>
        <View style={styles.topContent}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../assets/logo3.png')} style={styles.logo} />
            <Text style={styles.headerText}>Adi Goud Brahmin Mahasabha</Text>
          </View>
        </View>
        <Image source={require('../assets/start.jpg')} style={styles.banner} />
        <View style={styles.content}>
          <View style={styles.group}>
            <Text style={styles.welcome}>Hello</Text>
            <Text style={styles.description}>Login to continue to your account</Text>
            <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Presented by PG Studio</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  topContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 60,
  },
  logo: {
    width: 100,
    height: 80,
    marginRight: 10,
    borderColor:'black',
    borderWidth:3
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  banner: {
    width: '100%',
    height: '40%',
    resizeMode: 'cover',
    marginBottom: 20,
    marginTop: 50,
    borderColor:'black',
    borderWidth:3
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  group: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 24,
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#7C0002',
    padding: 15,
    borderRadius: 30,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 18,
  },
});

export default Start;
