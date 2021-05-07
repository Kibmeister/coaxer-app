import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

function ModalConfirmation(props) {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.checkmarkContainer}>
        <Text style={styles.checkmarkText}>Well done, your task was added</Text>
        <Ionicons
          name='ios-checkmark-circle'
          size={40}
          color='green'
          marginBottom='5'
        />
      </View>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          width: '100%',
          borderColor: 'grey',
          borderStyle: 'solid',
          borderWidth: 2,
          borderRadius: 20,
          borderColor: 'green',
          backgroundColor: 'green',
          opacity: '70',
          height: '10%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 100,
        }}
        onPress={props.exitModal}
      >
        <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>
          {props.description}, {props.category}, {props.iteration},{' '}
          {props.duedate}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '85%',
    top: 10,
  },

  checkmarkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#444',
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default ModalConfirmation;
