import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

// this component handel the button press when choosing category for a given task
// it also rendres the buttons when the component is importet to a modal screen
const CategoryButtons = (props) => {
// states for the three buttons, button2 starts off with being underlined
  const [button1, setButton1] = useState('none');
  const [button2, setButton2] = useState('underline');
  const [button3, setButton3] = useState('none');
  // function for setting the undreline upon button press
  const setCategoryValue = (type) => {
    if (type == 'Academic') { 
      setButton1('underline');
      setButton2('none');
      setButton3('none');
    } else if (type == 'Practical') {
      setButton1('none');
      setButton2('underline');
      setButton3('none');
    } else {
      setButton1('none');
      setButton2('none');
      setButton3('underline');
    }
    props.category(type);
  };

  // returns a render of the three category buttons
  return (
    <View style={styles.tabsContainer}>
      <TouchableOpacity
        onPress={() => {
          setCategoryValue('Academic');
        }}
      >
        <Text
          style={{
            color: 'grey',
            textDecorationLine: button1,
            textDecorationColor: 'grey',
            fontSize: 20,
            margin: 2,
            padding: 5,
            fontWeight: 'bold',      
          }}
        >
          Academic
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setCategoryValue('Practical');
        }}
      >
        <Text
          style={{
            color: 'grey',
            textDecorationLine: button2,
            textDecorationColor: 'grey',
            fontSize: 20,
            margin: 2,
            padding: 5,
            fontWeight: 'bold',
          }}
        >
          Practical
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setCategoryValue('Leisure');
        }}
      >
        <Text
          style={{
            color: 'grey',
            textDecorationLine: button3,
            textDecorationColor: 'grey',
            fontSize: 20,
            margin: 2,
            padding: 5,
            fontWeight: 'bold',
          }}
        >
          Leisure
        </Text>
      </TouchableOpacity>
    </View>
  );
};
// styling for the container
const styles = StyleSheet.create({
  tabsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '5%',
  },
});

export default CategoryButtons;
