import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import ListView from '../components/ListView';
import BottomNav from '../screens/BottomNav';


const ScreenProfile = ({navigation}) => {
  return (
    <>
    <StatusBar barStyle='light-content' />
    <View style={styles.container}>
      <Header title={'Profile'}/>
      <ListView /> 
      <View style={styles.fabContainer}>
        
      </View>
      <BottomNav navigation={navigation} />
    </View>
  </>
  );
};

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
    backgroundColor: 'blue',
    borderRadius: 35,
    paddingLeft: 2,
    width: 70,
    height: 70,
    
  },
});

export default ScreenProfile;
