import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

const DueDateButtons = (props) => {
  const [button1, setButton1] = useState('underline');
  const [button2, setButton2] = useState('none');

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
