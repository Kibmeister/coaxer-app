import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import ListView from '../components/ListView';
import BottomNav from './BottomNav';


function TasksScreen({ navigation }) {
  return (
    <>
      <StatusBar barStyle='light-content' />
      <View style={styles.container}>
        <Header title={'Your tasks'} />
        <ListView /> 
        <View style={styles.fabContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ModalDescription' )}
            style={styles.fabButton}
          >
            <Ionicons name='ios-add' color='#fff' size={70} />
          </TouchableOpacity>
        
        </View>
        <BottomNav navigation={navigation}/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },

  fabContainer: {
    position: 'absolute',
    right: 150,
    bottom: 60,
  },

  fabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 35,
    paddingLeft: 2,
    width: 70,
    height: 70,
    
  },
});

export default TasksScreen;
