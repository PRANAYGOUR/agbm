import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Feed = ({ route }) => {
  const [users, setUsers] = useState([]); // Initialize the state with an empty array
  const { phoneNumber, applicantName } = route.params.userData;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetch('https://pranaygour.github.io/json/');
        const html = await response.text();
        
        // Extract JSON data using regular expressions
        const jsonRegex = /<pre id="json-data">([^<]+)<\/pre>/;
        const match = html.match(jsonRegex);
        if (!match || match.length < 2) {
          throw new Error('JSON data not found in HTML');
        }
        const jsonData = JSON.parse(match[1].trim());

        setUsers(jsonData);
      } catch (error) {
        console.error('Error fetching users data:', error);
      }
    };

    fetchUsersData();
  }, []);

  const handleBoxPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo3.png')} style={styles.logo} />
        <Text style={styles.title}>Adi Goud Brahmin Mahasabha</Text>
        <Image source={require('../assets/back.png')} style={styles.notification} />
      </View>
      <View style={styles.welcomeContainer}>
        <View style={styles.welcomeBox}>
          <Text style={styles.welcomeText}>
            {`Welcome, ${applicantName}`}
          </Text>
          <Text style={styles.welcomeText}>Tap here to modify your profile</Text>
        </View>
      </View>
      <View style={styles.gridContainer}>
        <View style={styles.gridRow}>
          <TouchableOpacity style={styles.box} onPress={() => handleBoxPress('Members')}>
            <Image source={require('../assets/members.png')} style={styles.boxIcon} />
            <Text style={styles.boxText}>Members</Text>
            {users.length > 0 ? (
              <Text style={styles.boxNumber}>{users.length}</Text>
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={() => handleBoxPress('OfficeBearers')}>
            <Image source={require('../assets/officeb.png')} style={styles.boxIcon} />
            <Text style={styles.boxText}>Office Bearers</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gridRow}>
          <TouchableOpacity style={styles.box} onPress={() => handleBoxPress('PastOfficeBearers')}>
            <Image source={require('../assets/officeb.png')} style={styles.boxIcon} />
            <Text style={styles.boxText}>Past Office Bearers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={() => handleBoxPress('Birthdays')}>
            <Image source={require('../assets/birthday.png')} style={styles.boxIcon} />
            <Text style={styles.boxText}>Birthdays</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gridRow}>
          <TouchableOpacity style={styles.box} onPress={() => handleBoxPress('Anniversaries')}>
            <Image source={require('../assets/anniversary.png')} style={styles.boxIcon} />
            <Text style={styles.boxText}>Anniversaries</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={() => handleBoxPress('Events')}>
            <Image source={require('../assets/event.png')} style={styles.boxIcon} />
            <Text style={styles.boxText}>Events</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gridRow}>
          <TouchableOpacity style={styles.box} onPress={() => handleBoxPress('Gallery')}>
            <Image source={require('../assets/gallery.png')} style={styles.boxIcon} />
            <Text style={styles.boxText}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={() => handleBoxPress('Business')}>
            <Image source={require('../assets/logo3.png')} style={styles.boxIcon} />
            <Text style={styles.boxText}>Business</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gridRow}>
          <TouchableOpacity style={styles.box} onPress={() => handleBoxPress('RedClub')}>
            <Image source={require('../assets/redclub.png')} style={styles.boxIcon} />
            <Text style={styles.boxText}>Red Club</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={() => handleBoxPress('AboutUs')}>
            <Image source={require('../assets/logo1.png')} style={styles.boxIcon} />
            <Text style={styles.boxText}>About Us</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DEC99D',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#DEC99D',
    marginTop: 20, // Move the header down
  },
  logo: {
    width: 40, // Reduced size
    height: 40, // Reduced size
    borderWidth: 1.5,
    borderColor: '#000', // Black border for the logo
  },
  title: {
    fontSize: 18, // Reduced size
    fontWeight: 'bold',
    color: '#333',
  },
  notification: {
    width: 16, // Reduced size
    height: 16, // Reduced size
  },
  welcomeContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  welcomeBox: {
    backgroundColor: '#800000', // Maroon color
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1.5,
    borderColor: '#000', // Black border for welcome box
  },
  welcomeText: {
    fontSize: 16,
    color: '#fff', // White text color for better contrast
  },
  gridContainer: {
    flex: 1,
    padding: 16,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  box: {
    backgroundColor: '#800000', // Maroon color
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    width: '45%', // Adjusted width for 2 columns
    alignItems: 'center',
    height: 120, // Fixed height
    justifyContent: 'center', // Center content vertically
    borderWidth: 3,
    borderColor: '#000', // Black border for boxes
  },
  boxIcon: {
    width: 30, // Increased size for better visibility
    height: 30, // Increased size for better visibility
    resizeMode: 'contain',
  },
  boxText: {
    fontSize: 14,
    color: '#fff', // White text color for better contrast
    textAlign: 'center',
    marginTop: 5, // Space between icon and text
  },
  boxNumber: {
    fontSize: 12,
    color: '#fff', // White text color for better contrast
  },
});

export default Feed;
