import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setTaskList, decrementIterations } from '../redux/reducers/tasksReducer';
import { Ionicons } from '@expo/vector-icons';
import DraggableFlatList from 'react-native-draggable-flatlist';
// component that renders the taks list in TasksScreen 
function ListView() {
  const listItems = useSelector((state) => state.TasksR.tasksList); // retrive tasks

  const dispatch = useDispatch(); //user for dispatching tasks to the store.

  //fuction that handle the tasks once one taks has been dragged up or down in the list 
  const dragComplete = (item) => {
    const { from: sourceIndex, to: targetIndex, data: dragList } = item;

    const dragItem = dragList[sourceIndex]; // swapList[sourceIndex];
    const swapItem = dragList[targetIndex]; // swapList[targetIndex];

    //swaps the dragged task with the task at its dragged to position, in order for the store to receive the tasks
    // - in the updated order after drag. 
    dragList.forEach((task, i) => {
      if ((i = targetIndex)) {
        dragList.splice(targetIndex, 1, swapItem);
      }
    });

    dispatch(setTaskList(dragList));// dispatches the newly updated list to redux store.
  };
// function that is used to re create the task retrieved form redux store
// this adds underline color the taks based on its category and assignes the index as key.
  const taskListOrdered = listItems.map((task, index) => {
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
    container.backgroundColor =
      task.category == 'Academic'
        ? 'red'
        : task.category == 'Practical'
        ? 'green'
        : 'blue';
    return container;
  });
// function for rendering the items in draggableflatlist 
  const renderItem = ({ item, drag, isActive }) => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 5,
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: item.backgroundColor,
        transform: isActive ? [{ scale: 1.05 }] : null,
      }}
    >
      <View style={styles.listItemMetaContainer}>
        <TouchableOpacity
        //dispatches the id of tasks being pressed to decrement itreation count
        onPress={() => dispatch(decrementIterations(item.id))}
          style={{
            width: 240,
            height: 40,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}
        >
          <Text style={styles.itemTitle} numberOfLines={1}>
            {item.description}
          </Text>
  
        </TouchableOpacity>
        <View style={styles.itemIterations} >
            <Text style={styles.itemIterationsText} numberOfLines={1}>
              {item.iterations > 1 ? item.iterations : ''}
            </Text>
          </View>

        <View style={styles.dragButton}>
        {/* when longpressing the drag icon of a task the drag function is initiated  */}
          <TouchableOpacity onLongPress={drag}> 
            <Ionicons name='ios-menu' color='grey' size={40} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
// renders the list if its not empty 
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
              <Ionicons name='ios-warning-outline' color='black' size={40} />
            </View>
            <View style={styles.line}></View>

            <View style={styles.lowP}>
              <Ionicons name='ios-warning-outline' color='grey' size={30} />
            </View>
          </View>
          <View style={styles.flatListView}>
            {/* deploys the draggable flatlist from the imported package */}
            <DraggableFlatList
              data={taskListOrdered}
              renderItem={renderItem}
              keyExtractor={(item) => `draggable-item-${item.key}`}
              //passes the dragged item to dragComplete function with indexes of move from - move to
              onDragEnd={(item) => dragComplete(item)} 
            />
          </View>
        </View>
      ) : (
        //displayed text if the list is empty 
        <Text style={{ fontSize: 30, textAlign: 'center' }}> 
          Let's fill this badboy up :'(
        </Text>
      )}
    </View>
  );
}
// styling for the containers
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

  listItemMetaContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 22,
    color: 'grey',
    fontWeight: 'bold',
    padding: 0,
  },
  itemIterations : {
    width: 20,
    height: 30,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    
  },
  itemIterationsText: {
    fontSize: 22,
    color: 'grey',
    fontWeight: 'bold',
  },
  
  dragButton: {
    alignSelf: 'flex-end',
    borderRadius: 8,
    
  },
});

export default ListView;
