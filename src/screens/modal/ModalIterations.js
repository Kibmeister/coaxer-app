import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { shuffleModals } from '../../redux/reducers/shuffleModalReducer';
import Slider1 from '../../components/Slider1';

function ModalIteration(props) {
  const [taskIteration, setTaskIteration] = useState('');

  const dispatch = useDispatch();
  
  const toggleScreen = (modalName) => {
    dispatch(shuffleModals(modalName));
    if(taskIteration == 0){
      props.iteration(1);
    }
    props.iteration(taskIteration);
  };
  return (
    <View style={styles.modalContainer}>
      <Text style={{ color: '#444', fontSize: 20, fontWeight: 'bold'}}>Number of iterations</Text>

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
        <Text style={{ fontSize: 16 }}> {props.description}, {props.category}</Text>
        <Text style={{ fontSize: 16, color:'lightgrey'}}>, {taskIteration == 0 ? 1 : taskIteration}</Text>
      </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '85%',
    top: 10,
  },

  sliderContainer: {
    alignItems: 'center',
    width: '100%',
   
  },
});

export default ModalIteration;
