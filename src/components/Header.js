import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

// component that is rendered in TasksScreen and ProfileScreen
function Header(props) {
  const { title } = props; //title for the header
  const listItems = useSelector((state) => state.TasksR.tasksList); //retrive the tasks from the redux store
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      {props.title == 'Your tasks' ? ( //if there excist tasks, show how many there are left
        <Text style={styles.subTitle}>Left: {listItems.length}</Text> 
      ) : (
        <Text></Text>
      )}
    </View>
    
  );
}
// styling for the containers
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    height: 125,
    paddingTop: 20,
  },

  text: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '500',
  },
  subTitle: {
    paddingTop: 5,
    fontSize: 18,
    color: '#fff',
  },
});

export default Header;
