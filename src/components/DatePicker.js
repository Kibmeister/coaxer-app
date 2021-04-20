import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DueDateButtons from './DueDateButtons';
import DateTimePicker from 'react-native-modal-datetime-picker';

const DueDatePicker = (props) => {
  const [isDateTimePickerVisible, setDatePickerVisibility] = useState(false);
  const [chosenDate, setChoseDate] = useState('');
 

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
    setChoseDate('');
  };

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

  const handleConfirm = (date) => {
    const mdate = date.toString().split(' ');
    setDatePickerVisibility(false);

    const formatedDate = mdate[3] + '-' + monthStringToNUmber(mdate[1]) + '-' + mdate[2];
    const formatedDate2 = mdate[2] + ' ' + mdate[1] + ' ' + mdate[3];
   
    if(date.length == 0){
      formatedDate = '';
    }
    setChoseDate(formatedDate2);
    props.date(formatedDate);

  };
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
