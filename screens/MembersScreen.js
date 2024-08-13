import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MembersScreen = () => {
  const navigation = useNavigation();
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const url = 'https://pranaygour.github.io/json/'; // Replace with your HTML URL containing JSON
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const html = await response.text();
      // Extract JSON data using regular expressions
      const jsonRegex = /<pre id="json-data">([^<]+)<\/pre>/;
      const match = html.match(jsonRegex);
      if (!match || match.length < 2) {
        throw new Error('JSON data not found in HTML');
      }
      const jsonData = JSON.parse(match[1].trim());
      setMembers(jsonData);
      setFilteredMembers(jsonData);
    } catch (error) {
      setError(`Error fetching member data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredMembers(members);
    } else {
      const filtered = members.filter(member =>
        member['Name/नाम'].toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMembers(filtered);
    }
  };

  const handleMemberPress = (member) => {
    navigation.navigate('MemberDetails', { member });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  }

  if (error) {
    return <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="Search by name"
      />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {filteredMembers.map((member, index) => (
          <TouchableOpacity
            key={index}
            style={styles.memberItem}
            onPress={() => handleMemberPress(member)}
          >
            <Text style={styles.memberName}>{member['Name/नाम']}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2C196',
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#800000',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 100,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  memberItem: {
    backgroundColor: '#800000',
    padding: 15,
    borderRadius: 5,
    borderColor: '#333',
    borderWidth: 1,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  memberName: {
    fontSize: 18,
    color: '#fff',
  },
});

export default MembersScreen;
