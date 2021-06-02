import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
// component that renders the buttons in for the date time picker
const DueDateButtons = (props) => {
  // sate variabels for the buttons 
  const [button1, setButton1] = useState('underline');
  const [button2, setButton2] = useState('none');
//function for the state variabels
  const setButtonLine = (button) => {
    if (button == 'button1') {
      setButton1('underline');
      setButton2('none');
      props.onHide();
    } else {
      setButton1('none');
      setButton2('underline');
      props.onShow();
    }
  };
// function that renders the buttons
  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => {
            setButtonLine('button1');
          }}
        >
          <Text
            style={{
              color: 'grey',
              textDecorationLine: button1,
              fontSize: 20,
              margin: 2,
              padding: 5,
              fontWeight: 'bold',
            }}
          >
            None
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setButtonLine('button2');
          }}
        >
          <Text
            style={{
              color: 'grey',
              textDecorationLine: button2,
              fontSize: 20,
              margin: 2,
              padding: 2,
              fontWeight: 'bold',
            }}
          >
            Specify
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
// styling for the containers
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
});

export default DueDateButtons;
