import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { bottomBarActive } from '../redux/reducers/bottomBarReducer';

// The bottom nav bar that is used in ProfileScreen and TasksScreen
const BottomNav = ({ navigation }) => {

  const selector = useSelector((state) => state.BottomBarR);
  const dispatch = useDispatch();
//funciton that shuffles between the two screens
  const buttonClick = (tabname) => {
    if (tabname == 'Tasks') {
      dispatch(bottomBarActive(tabname));
      navigation.navigate('Tasks');
    } else {
      dispatch(bottomBarActive(tabname));
      navigation.navigate('Profile');
    }
    
  };
  // function that renders the bottom bar with the two navigation options
  return (
    <View style={styles.navContaier}>
      <View style={styles.task}>
        <TouchableOpacity
          style={styles.taskButton}
          onPress={() => buttonClick('Tasks')}
        >
          <Text
            style={selector.activeButtons.tasksButton.active ? styles.activeButtonText : styles.buttonText}
          >
            Tasks
          </Text>
          <Ionicons
            name='ios-list-circle-outline'
            color={selector.activeButtons.tasksButton.active ? 'blue' : 'grey'}
            size={35}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.profile}>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => buttonClick('Profile')}
        >
          <Text
            style={
              selector.activeButtons.profileButton.active? styles.activeButtonText : styles.buttonText
            }
          >
            Profile
          </Text>
          <Ionicons
            name='ios-person-circle-outline'
            color={selector.activeButtons.profileButton.active ? 'blue' : 'grey'}
            size={40}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
// styling for the containers
const styles = StyleSheet.create({
  navContaier: {
    width: '100%',
    height: '7%',
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  task: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    borderRightWidth: 2,
    borderColor: '#BABABA',
  },
  taskButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  activeButtonText: {
    fontSize: 20,
    color: 'blue',
    marginRight: 5,
  },
  profile: {
    width: '50%',
    height: '100%',
    fontSize: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  profileButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 20,
    color: 'grey',
    marginRight: 5,
  },
});
export default BottomNav;
