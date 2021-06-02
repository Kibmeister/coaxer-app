import React from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
// this is the view that is rendered in ProfileScreen
const ProfileView = () => {
  return (
    <View
      style={{
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 20,
        backgroundColor: 'white',
        alignItems: 'center',
      }}
    >
      {/* button for syncing with google calendar 'acording to concept' */}
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text>Sync with google calendar</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ color: 'grey', fontSize: 10, position: 'absolute', bottom: 0 }}>
        Version 1.2
      </Text>
    </View>
  );
};
// styling for the containers
const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 120,
    elevation: 8,
    backgroundColor: 'lightgrey',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 45,
  },
});

export default ProfileView;
