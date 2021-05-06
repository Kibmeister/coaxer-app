import React, { useEffect, useState, useRef } from 'react';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { View, StyleSheet, Text, Button } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';


const ProfileView = () => {
 
  return (
    <View
      style={{
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 20,
        backgroundColor: 'white',
      }}
    >
      {/* <Text>Your expo push token: {expoPushToken}</Text> */}
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      
      </View>
     <Text>Fete faen</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  flatListContainer: {
    height: '85%',
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  flatListView: {
    height: '100%',
    width: '98%',
    alignSelf: 'flex-start',
    flexGrow: 1,
  },

  priorityView: {
    height: '100%',
    width: '15%',
    backgroundColor: 'white',
    flexGrow: 0,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },

  highP: {
    alignSelf: 'center',
  },

  line: {
    borderColor: 'black',
    borderLeftWidth: 1,
    height: '75%',
    alignSelf: 'center',
  },
  lowP: {
    alignSelf: 'center',
  },

  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 5,
    paddingRight: 5,
    justifyContent: 'space-between',
    width: '100%',

    borderBottomWidth: 0.25,
  },
  listItemMetaContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: '400',
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#ff333390',
    padding: 5,
  },
});

export default ProfileView;
