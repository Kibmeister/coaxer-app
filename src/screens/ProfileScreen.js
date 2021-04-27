import React, {useEffect, useState, useRef} from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import ProfileView from '../components/ProfileView';
import BottomNav from '../screens/BottomNav';


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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
});



export default ScreenProfile;
