import React, { useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { Header } from 'react-native-elements';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('https://pranaygour.github.io/json/');
      const html = await response.text();
      const jsonRegex = /<pre id="json-data">([^<]+)<\/pre>/;
      const match = html.match(jsonRegex);
      if (!match || match.length < 2) {
        throw new Error('JSON data not found in HTML');
      }
      const jsonData = JSON.parse(match[1].trim());

      const matchedMember = jsonData.find(member =>
        member['Email of Applicant/आवेदक का ईमेल'] === phoneNumber &&
        member['Unique Id'].toString() === password // Convert to string for comparison
      );

      if (matchedMember) {
        console.log('Login successful:', matchedMember);

        await SecureStore.setItemAsync('phoneNumber', phoneNumber);
        await SecureStore.setItemAsync('password', password);
        await SecureStore.setItemAsync('applicantName', matchedMember['Name/नाम']);

        navigation.navigate('Feed', { 
          userData: { 
            phoneNumber, 
            applicantName: matchedMember['Name/नाम'] 
          } 
        });
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Error logging in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#E2C196' }}>
      <Header
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/back.png')} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
        }
        backgroundColor='#E2C196'
        containerStyle={{ borderBottomWidth: 0, height: 100 }}
      />
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingTop: 20 }}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('../assets/logo3.png')} style={{ width: 250, height: 200, borderRadius: 30, borderColor: 'black', borderWidth: 5 }} />
        </View>
        <View style={{ marginTop: 20, paddingHorizontal: 20, paddingVertical: 30, backgroundColor: '#fff', borderColor: '#333', borderWidth: 5, borderRadius: 10, width: '80%' }}>
          <Text style={{ fontSize: 24, color: '#333', marginBottom: 20 }}>Enter details to login</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#333', paddingBottom: 10 }}>
            <Image source={require('../assets/email.png')} style={{ width: 30, height: 30, marginRight: 10 }} />
            <TextInput
              style={{ flex: 1, fontSize: 20, color: '#333' }}
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              placeholder="Email"
              placeholderTextColor="#333"
              keyboardType="email-address"
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#333', paddingBottom: 10 }}>
            <Image source={require('../assets/pass.png')} style={{ width: 25, height: 25, marginRight: 10 }} />
            <TextInput
              style={{ flex: 1, fontSize: 20, color: '#333' }}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor="#333"
            />
          </View>
          <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: '#007bff', padding: 15, borderRadius: 30, marginTop: 20, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: '#fff' }}>Login</Text>
          </TouchableOpacity>
          {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}
          {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} />}
        </View>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: 18, color: 'black', marginTop: 20 }}>Presented by PG Studio</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
