import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from '../constants/colors';

const LoginButton = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.onPress(true)}
      style={styles.appButtonContainer}
    >
      <Text style={styles.appButtonText}>Log In</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  appButtonContainer: {
    marginTop: 120,
    elevation: 8,
    backgroundColor: Colors.accent,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 45,
  },
  appButtonText: {
    fontSize: 25,
    color: '#fff',
    fontWeight: 'normal',
    alignSelf: 'center',
  },
});

export default LoginButton;
