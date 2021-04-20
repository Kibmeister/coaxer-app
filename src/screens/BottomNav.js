import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import Colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { bottomBarActive } from '../redux/reducers/bottomBarReducer';

const BottomNav = ({ navigation }) => {
  

  const selector = useSelector((state) => state.BottomBarR);
  const dispatch = useDispatch();

  const buttonClick = (tabname) => {
    if (tabname == 'Tasks') {
      dispatch(bottomBarActive(tabname));
      navigation.navigate('Tasks');
    } else {
      dispatch(bottomBarActive(tabname));
      navigation.navigate('Profile');
    }
    
  };
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

const styles = StyleSheet.create({
  navContaier: {
    width: '100%',
    height: '7%',
    backgroundColor: Colors.bottomNav,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  task: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    borderRightWidth: 2,
    borderColor: Colors.fine,
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
