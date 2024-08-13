import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const MemberDetailsScreen = ({ route }) => {
  const { member } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.detailText}>Name: {member['Name/नाम']}</Text>
      <Text style={styles.detailText}>Email: {member['Email of Applicant/आवेदक का ईमेल']}</Text>
      <Text style={styles.detailText}>Phone Number: {member['Phone No. of Applicant/आवेदक का फ़ोन नंबर']}</Text>
      <Text style={styles.detailText}>Unique ID: {member['Unique Id']}</Text>
      {/* Add other member details here */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2C196',
    padding: 20,
  },
  detailText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
});

export default MemberDetailsScreen;
