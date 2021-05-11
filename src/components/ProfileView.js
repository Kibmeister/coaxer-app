import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

const ProfileView = () => {


  return (
    <View
      style={{
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 20,
        backgroundColor: 'white',
      }}
    >
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text>Sync with google calendar</Text>
        </TouchableOpacity>
        <Text>Støggen</Text>
      </View>
    </View>
  );
};
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
