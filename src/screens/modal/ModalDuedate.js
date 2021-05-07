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

  const [date, setDate] = useState('');

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
      <Text style={{ color: '#444', fontSize: 20, fontWeight: 'bold' }}>DueDate</Text>

      <View style={styles.sliderContainer}>
        <DatePicker
          date={(formatedDate, formatedDate2) => {
            props.date(formatedDate, formatedDate2);
            setDate(formatedDate2);
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => onSaveNote('DueDate')}
        style={styles.fabButton}
      >
        <Ionicons name='ios-add' color='#fff' size={50} />
      </TouchableOpacity>
    
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          borderColor: 'grey',
          borderStyle: 'dashed',
          borderWidth: 1,
          borderRadius: 20,
          height: '10%',
          alignItems: 'center',
          justifyContent:'center',
          position: 'absolute',
          bottom: 10,

        }}
      >
        <Text style={{ fontSize: 16 }}> {props.description}, {props.category}, {props.iteration}</Text>

        <Text style={{ fontSize: 16, color:'lightgrey'}}>, {date}</Text>
      </View>
    
    
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
    width: '90%',
    height: '85%',
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
