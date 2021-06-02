import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/reducers/tasksReducer';
import { resetModal } from '../../redux/reducers/shuffleModalReducer';

import ModalCategory from './ModalCategory';
import ModalDescription from './ModalDescription';
import ModalIterations from './ModalIterations';
import ModalDuedate from './ModalDuedate';
import ModalConfirmation from './ModalConfirmation';
//Main modal that houses all the other modals used for creating the task
function Modal({ navigation }) {
  //retreive the active state of the modals
  const activeModals = useSelector((state) => state.ShuffleModalR.activeModals);
  const dispatch = useDispatch();
  //state variables for each of the prameters that constitute a task 
  const [taskDesctiption, setTaskDescription] = useState('');
  const [taskCategory, setTaskCategory] = useState('');
  const [taskIteration, setTaskIteration] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskDateF, setTaskDateF] = useState(''); //only to dipslay the date in the right order for modalconfirmation
  const [taskDateCond, setTaskCond] = useState(false);

  //check funciton for setting the duedate for a task
  const setDueDate = (value) => {
    setTaskDate(value);
    if (value.length == 9) {
      setTaskCond(true);
    }
  };
// function that dispatches the task with all variables to store
  const onSaveNote = () => {
    dispatch(
      addItem({
        description: taskDesctiption,
        category: taskCategory,
        iterations: taskIteration,
        duedate: {
          cond: taskDateCond,
          date: taskDate,
        },
        id: Math.random(),
        key: '', // superficial key parmeter that would been used for key if the tasks werer added on a webserver
      })
    );
  };
  //dispatched reset modal action to state to reset the order of the modals shown
  const exitModal = () => {
    navigation.navigate('Tasks');
    dispatch(resetModal());
  };
//Redner function that only shows one modal at a time depending on which are set to active
// from each the modals it retreives the input value the user has entered and adds it to the states variables
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
            description={taskDesctiption}
          />
        ) : null}
        {activeModals.iterations.active ? (
          <ModalIterations
            iteration={(value) => {
              setTaskIteration(value);
            }}
            description={taskDesctiption}
            category={taskCategory}
          />
        ) : null}
        {activeModals.duedate.active ? (
          <ModalDuedate
            date={(formatedDate, formatedDate2) => {
              setDueDate(formatedDate);
              setTaskDateF(formatedDate2);
            }}
            saveNote={() => onSaveNote()}
            description={taskDesctiption}
            category={taskCategory}
            iteration={taskIteration}
          />
        ) : null}
        {activeModals.confirmation.active ? (
          <ModalConfirmation
            exitModal={exitModal}
            description={taskDesctiption}
            category={taskCategory}
            iteration={taskIteration}
            duedate={taskDateF}
          />
        ) : null}
      </View>
    </View>
  );
}
// styling for the containers
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
    height: '90%',
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
