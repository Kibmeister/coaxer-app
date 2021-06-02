import React, {useEffect, useState, useRef} from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import ProfileView from '../components/ProfileView';
import BottomNav from '../screens/BottomNav';

//This screen diplays the profileview component, header and bottomnavbar
const ScreenProfile = ({navigation}) => {
  return (
    <>
    <StatusBar barStyle='light-content' />
    <View style={styles.container}>
      <Header title={'Profile'}/>
      <ProfileView /> 
      
      <BottomNav navigation={navigation} />
    </View>
  </>
  );
};
// styling for the containers
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
});



export default ScreenProfile;
