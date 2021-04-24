import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import {
  shuffleModals,
  
} from '../../redux/reducers/shuffleModalReducer';

function ModalConfirmation({ navigation }) {
  const [value, setValue] = useState('');

  const dispatch = useDispatch();


  return (
    <View style={styles.modalContainer}>
      <View style={styles.checkmarkContainer}>
        <Text style={styles.checkmarkText}>Well done, your task was added</Text>
        <Ionicons
          name='ios-checkmark-circle'
          size={40}
          color='green'
          marginBottom='5'
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    top: 10,
  },

  checkmarkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#444',
    fontSize: 20,
    marginTop: 10,
  },
});

export default ModalConfirmation;
