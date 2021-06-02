import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
//slider component that houses an imported slider - rendered in ModalIterations
const Slider1 = (props) => {
  // state variable for slider value
  const [sliderValue, setSliderValue] = useState(1);
 // passes slider value to parrent component
  const setIterationNumber = (value) => {
    props.iteration(value);
  };

  return (
    <View style={styles.sliderContainer}>
      {/* slider which has a minimum value of 1, goes to 5 */}
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
// styling for the containers
const styles = StyleSheet.create({
  sliderContainer: {
    paddingTop: '5%',
    alignItems: 'center',
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
