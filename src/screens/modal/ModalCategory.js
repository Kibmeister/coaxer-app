import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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
      <Text style={{ color: '#444', fontSize: 20, fontWeight: 'bold' }}>
        Select a category
      </Text>

      <View style={styles.categoryButtonContainer}>
        <CategoryButtons
          category={(value) => {
            setTaskCategory(value);
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
        onPress={() => toggleScreen('Category')}
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
        <Text style={{ fontSize: 16 }}> {props.description}</Text>
        <Text style={{ fontSize: 16, color:'lightgrey'}}>, {category}</Text>
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

  categoryButtonContainer: {
    alignItems: 'center',
    width: '100%',
  },
});

export default ModalCategory;
