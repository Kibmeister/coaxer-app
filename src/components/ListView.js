import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setTaskList, removeItem } from '../redux/reducers/tasksReducer';
import { Ionicons } from '@expo/vector-icons';
import DraggableFlatList from 'react-native-draggable-flatlist';

function ListView() {
  const listItems = useSelector((state) => state.TasksR.tasksList);

  const dispatch = useDispatch();

  const dragComplete = (item) => {
    let itemArray = item.data;
    // from object is going to be replaced with to object and visa vreca

    let indexFrom = item.from; // indexet fra objeket som skal byttes
    let indexTo = item.to; // indexet som tar plassen over

    
    let objMovesFrom = itemArray[indexFrom];
    let objMovesTo = itemArray[indexTo];
    let sortedArray = itemArray;
    console.log('Object moves from : ' + objMovesFrom.description);
    console.log('Obejct moves to : ' + objMovesTo.description);

    sortedArray.map((task, i) => {
      if ((i = indexFrom)) {
        sortedArray.splice(indexFrom, 1, objMovesTo);
      }
      if ((i = indexTo)) {
        sortedArray.splice(indexTo, 1, objMovesFrom);
      }
    });

    console.log(sortedArray);

   //dispatch(setTaskList(item.data));
  };

  const taskListOrdered = listItems.map((task, index) => {
    //  console.log('Dette er taslist key :' + task.key);
    //  console.log(' ---Den skal gjerne være det samme som index :' + index);
    //  console.log('' );
    //  console.log('-----------------------------------------------------');
    //  console.log('-----------------------------------------------------');
    //  console.log('-----------------------------------------------------');

    const container = {};
    const duedateObject = {};
    container.description = task.description;
    container.category = task.category;
    container.iterations = task.iterations;
    duedateObject.cond = task.duedate.cond;
    duedateObject.date = task.duedate.date;
    container.duedate = duedateObject;
    container.id = task.id;
    container.key = `${index}`;
    container.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${
      index * 5
    }, ${132})`;
    //((task.category == 'Academic') ? 'red' : ((task.category == 'Practical') ? 'green' : 'blue'))
    return container;
  });

  const renderItem = ({ item, drag, isActive }) => (
    <View style={styles.listItemContainer}>
      <View style={styles.listItemMetaContainer}>
        <TouchableOpacity
          onLongPress={drag}
          style={{
            width: 250,
            height: 40,
            backgroundColor: isActive ? 'yellow' : item.backgroundColor,
          }}
        >
          <Text style={styles.itemTitle} numberOfLines={1}>
            {item.description}
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => dispatch(removeItem(item.id))}>
            {/* dispatch(removeItem(item.id)) */}
            <Ionicons name='ios-trash' color='#fff' size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

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
      {taskListOrdered.length !== 0 ? (
        <View style={styles.flatListContainer}>
          <View style={styles.priorityView}>
            <View style={styles.highP}>
              <Ionicons name='ios-beer-outline' color='black' size={40} />
            </View>
            <View style={styles.line}></View>

            <View style={styles.lowP}>
              <Ionicons name='ios-beer-outline' color='grey' size={30} />
            </View>
          </View>
          <View style={styles.flatListView}>
            <DraggableFlatList
              data={taskListOrdered}
              renderItem={renderItem}
              keyExtractor={(item) => `draggable-item-${item.description}`}
              onDragEnd={(item) => dragComplete(item)}
            />
          </View>
        </View>
      ) : (
        <Text style={{ fontSize: 30 }}>Let's fill this badboy up :'(</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    height: '85%',
    width: '100%',
    flexGrow: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  flatListView: {
    height: '100%',
    width: '85%',
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: '400',
    color: 'white',
  },
  button: {
    alignSelf: 'flex-end',
    borderRadius: 8,
    backgroundColor: '#ff333390',
    padding: 5,
  },
});

export default ListView;
