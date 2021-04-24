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
import CategoryButtons from '../../components/CategoryButtons';

function ModalCategory(props) {
  const [category, setTaskCategory] = useState('Practical');

  const dispatch = useDispatch();

  const toggleScreen = (modalName) => {
    props.category(category);
    dispatch(shuffleModals(modalName));
  };
  return (
    <View style={styles.modalContainer}>
      <Text style={{ color: '#444', fontSize: 20 }}>Select a category</Text>

      <View style={styles.categoryButtonContainer}>

        <CategoryButtons category={(value) => {
              setTaskCategory(value);
            }}/>

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
        onPress={() => toggleScreen('Category')}
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

  categoryButtonContainer: {
    //justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    //padding: 5,
    //borderColor: 'gray',
    //borderBottomWidth: 1,
  },
});

export default ModalCategory;
