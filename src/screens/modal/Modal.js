import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/reducers/tasksReducer';
import { resetModal } from '../../redux/reducers/shuffleModalReducer';

import ModalCategory from './ModalCategory';
import ModalDescription from './ModalDescription';
import ModalIterations from './ModalIterations';
import ModalDuedate from './ModalDuedate';
import ModalConfirmation from './ModalConfirmation';

function Modal({ navigation }) {
  const activeModals = useSelector((state) => state.ShuffleModalR.activeModals);
  const dispatch = useDispatch();

  const [taskDesctiption, setTaskDescription] = useState('');
  const [taskCategory, setTaskCategory] = useState('');
  const [taskIteration, setTaskIteration] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskDateCond, setTaskCond] = useState(false);

  const setDueDate = (value) => {
    setTaskDate(value);
    if (value.length == 9) {
      setTaskCond(true);
    }
  };
  
  const onSaveNote = () => {
    dispatch(addItem({
      description: taskDesctiption,
      category: taskCategory,
      iterations: taskIteration,
      duedate: {
        cond: taskDateCond,
        date: taskDate,
      },
      priority: 1,
    }));    
  };
  const exitModal = () => {
    navigation.goBack();
    dispatch(resetModal());
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => exitModal()}
          >
            <Ionicons name='ios-close' color='#101010' size={40} />
          </TouchableOpacity>
        </View>

        {activeModals.description.active ? (
          <ModalDescription
            description={(value) => {
              setTaskDescription(value);
            }}
          />
        ) : null}
        {activeModals.category.active ? (
          <ModalCategory
            category={(value) => {
              setTaskCategory(value);
            }}
          />
        ) : null}
        {activeModals.iterations.active ? (
          <ModalIterations
            iteration={(value) => {
              setTaskIteration(value);
            }}
          />
        ) : null}
        {activeModals.duedate.active ? (
          <ModalDuedate
            date={(value) => {
              setDueDate(value);
            }}
            saveNote={() => onSaveNote()}
          />
        ) : null}
        {activeModals.confirmation.active ? (
          <ModalConfirmation navigation={navigation} />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: '30%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
  },

  closeButtonContainer: {
    position: 'absolute',
    alignItems: 'flex-end',
    right: 10,
    top: 10,
  },

  closeButton: {
    backgroundColor: '#d3d3d3',
    borderRadius: 20,
    width: 40,
    height: 40,
    top: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Modal;
