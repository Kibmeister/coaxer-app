import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DueDateButtons from './DueDateButtons';
import DateTimePicker from 'react-native-modal-datetime-picker';

// component that renders and handles date time picker event in the  Modalduedate picker
const DueDatePicker = (props) => {
  // state variabels for showing the date time picker and the value set
  const [isDateTimePickerVisible, setDatePickerVisibility] = useState(false);
  const [chosenDate, setChoseDate] = useState('');
 
// setter funtions for the above states
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
    setChoseDate('');
  };
// converts a month number into string value
  const monthStringToNUmber = (month) => {
    let stringToNumber = 0;
    if(month == 'Jan'){
      stringToNumber = 1;
    } else if (month == 'Feb'){
      stringToNumber = 2;
    }else if (month == 'Mar'){
      stringToNumber = 3;
    }else if (month == 'Apr'){
      stringToNumber = 4;
    }else if (month == 'May'){
      stringToNumber = 5;
    }else if (month == 'Jun'){
      stringToNumber = 6;
    }else if (month == 'Jul'){
      stringToNumber = 7;
    }else if (month == 'Aug'){
      stringToNumber = 8;
    }else if (month == 'Sep'){
      stringToNumber = 9;
    }else if (month == 'Oct'){
      stringToNumber = 10;
    }else if (month == 'Nov'){
      stringToNumber = 11;
    }else if (month == 'Dec'){
      stringToNumber = 12;
    }
    return stringToNumber;
  }
// function that handles the choosen date
//the displayed date is in format : 10/June/2021
// date passed to the store is: 10/05/2021
  const handleConfirm = (date) => {
    const mdate = date.toString().split(' ');
    setDatePickerVisibility(false);

    const formatedDate = mdate[3] + '/' + monthStringToNUmber(mdate[1]) + '/' + mdate[2];
    const formatedDate2 = mdate[2] + ' ' + mdate[1] + ' ' + mdate[3];
   
    if(date.length == 0){
      formatedDate = '';
    }
    setChoseDate(formatedDate2); // set the the date state 
    props.date(formatedDate, formatedDate2);// passes the dates as props to parrent componet

  };
  // renders the date time picker in parrent coponent together selection buttons
  return (
    <View style={styles.container}>
      <DateTimePicker
        isVisible={isDateTimePickerVisible}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <DueDateButtons onHide={hideDatePicker} onShow={showDatePicker} />
      <Text style={styles.dateContainer}>{chosenDate}</Text>
    </View>
  );
};
// styling for the containers
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  dueDateText: {
    fontSize: 25,
    color: 'grey',
  },
  dateContainer: {
    width: 200,
    height: 30,
    textAlign: 'center',
    fontSize: 20,
    color: 'grey',
  },
});

export default DueDatePicker;
