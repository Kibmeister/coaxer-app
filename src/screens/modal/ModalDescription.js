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
// Modal for the description input
function ModalDescription(props) {
  const [value, setValue] = useState('');

  const dispatch = useDispatch();
//toggles the modal by dispatching its name to the store
  const toggleScreen = (modalName) => {
    props.description(value);
    dispatch(shuffleModals(modalName));
  };
  // function that renders the input field for task description
  return (
    <View style={styles.modalContainer}>
      <Text style={{ color: '#444', fontSize: 20, fontWeight: 'bold'}}>
        What do you want to do?
      </Text>
      <TextInput
        style={styles.textInputContainer}
        numberOfLines={1}
        onChangeText={(value) => setValue(value)}
        value={value}
        clearButtonMode='while-editing'
      />
      <TouchableOpacity
        style={{
          marginTop: 20,
          backgroundColor: 'blue',
          width: 50,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
        }}
        onPress={() => toggleScreen('Description')}
      >
        <Ionicons name='ios-arrow-forward' size={40} color='#fff' />
      </TouchableOpacity>
    </View>
  );
}
// styling for the containers
const styles = StyleSheet.create({
  modalContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    
    height: 100,
    top: 10,
  },
  textInputContainer : {
    height: 50,
    width: 200,
    padding: 5,
    borderColor: 'gray',
    borderBottomWidth: 1,

  }
});

export default ModalDescription;
