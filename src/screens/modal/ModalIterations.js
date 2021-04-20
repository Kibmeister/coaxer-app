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
import { addItem } from '../../redux/reducers/tasksReducer';
import { shuffleModals } from '../../redux/reducers/shuffleModalReducer';
import Slider1 from '../../components/Slider1';

function ModalIteration(props) {
  const [taskIteration, setTaskIteration] = useState('');

  const dispatch = useDispatch();

  const onSaveNote = (value) => {
    dispatch(addItem(value));
    navigation.navigate('Tasks');
  };
  const toggleScreen = (modalName) => {
    dispatch(shuffleModals(modalName));
    props.iteration(taskIteration);
  };
  return (
    <View style={styles.modalContainer}>
      <Text style={{ color: '#444', fontSize: 20 }}>Number of iterations</Text>

      <View style={styles.sliderContainer}>
        <Slider1
          iteration={(value) => {
            setTaskIteration(value);
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          marginTop: 3,
          backgroundColor: 'blue',
          width: 50,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
        }}
        onPress={() => toggleScreen('Iterations')}
      >
        <Ionicons name='ios-arrow-forward' size={40} color='#fff' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'lightblue',
    top: 10,
    height: 100,
  },

  sliderContainer: {
    //justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    //padding: 5,
    //borderColor: 'gray',
    //borderBottomWidth: 1,
  },
});

export default ModalIteration;
