import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { shuffleModals } from '../../redux/reducers/shuffleModalReducer';
import DatePicker from '../../components/DatePicker';

function ModalDuedate(props) {

  const dispatch = useDispatch();

  const onSaveNote = (value) => {
    toggleScreen(value);
    setTimeout(() => {
       props.saveNote(); //props to parrent component
    }, 500)
  };
  
  const toggleScreen = (modalName) => {
    dispatch(shuffleModals(modalName));
  };
  return (
    <View style={styles.modalContainer}>
      <Text style={{ color: '#444', fontSize: 20 }}>DueDate</Text>

      <View style={styles.sliderContainer}>
        <DatePicker
          date={(value) => {
            props.date(value);
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => onSaveNote('DueDate')}
        style={styles.fabButton}
      >
        <Ionicons name='ios-add' color='#fff' size={50} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
    height: 100,
  },

  sliderContainer: {
    alignItems: 'center',
    width: '100%',
  },

  fabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    borderRadius: 35,
    paddingLeft: 2,
    width: 50,
    height: 50,
    
  },

});

export default ModalDuedate;
