import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../redux/reducers/tasksReducer';
import { Ionicons } from '@expo/vector-icons';

function ListView() {
  const listItems = useSelector((state) => state.TasksR.tasksList);
  const dispatch = useDispatch();
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
      {listItems.length !== 0 ? (
        <View style={styles.flatListContainer}>
          <View style={styles.priorityView}>
            <View style={styles.highP}>
              <Ionicons name='ios-beer-outline' color='black' size={40} />
            </View>
            <View style={styles.line}> 
            </View>

            <View style={styles.lowP}>
              <Ionicons name='ios-beer-outline' color='grey' size={30} />
            </View>
          </View>
          <FlatList
            style={styles.flatListView}
            data={listItems}
            keyExtractor={(item) => item.priority.toString()} //TODO: sette prioriteten til tasksene til den indexen de har
            renderItem={({ item }) => (
              <View style={styles.listItemContainer}>
                <View style={styles.listItemMetaContainer}>
                  <Text style={styles.itemTitle} numberOfLines={1}>
                    {item.description}
                  </Text>
                  <TouchableOpacity
                    onPress={() => dispatch(removeItem(item.id))}
                    style={styles.button}
                  >
                    <Ionicons name='ios-trash' color='#fff' size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
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

  highP :{
    alignSelf: 'center',
  },

  line: {
    borderColor: 'black',
    borderLeftWidth: 1,
    height: '75%',
    alignSelf: 'center',
  
  },
  lowP :{
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
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: '400',
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#ff333390',
    padding: 5,
  },
});

export default ListView;
