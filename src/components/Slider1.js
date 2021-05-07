import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

const Slider1 = (props) => {
  const [sliderValue, setSliderValue] = useState(1);

  const setIterationNumber = (value) => {
    props.iteration(value);
  };

  return (
    <View style={styles.sliderContainer}>
      <Slider
        style={{ width: 200, height: 30}}
        step={1}
        onValueChange={(value) => {
          setSliderValue(value);
          setIterationNumber(value);
        }}
        minimumValue={1}
        maximumValue={5}
        minimumTrackTintColor='#c7c7c7'
        maximumTrackTintColor='#808080'
      />
      <View style={styles.valueContainer}>
        <Text style={styles.sliderValue}>{sliderValue}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    paddingTop: '5%',
    alignItems: 'center',
    //backgroundColor: 'purple',
  },
  valueContainer: {
    alignItems: 'center',
  },
  sliderValue: {
    fontSize: 25,
    color: 'grey',
    fontWeight: 'normal',
    alignSelf: 'center',
  },
});
export default Slider1;
