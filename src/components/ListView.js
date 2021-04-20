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
  const listItems = useSelector((state) => (state.TasksR.tasksList));
  const dispatch = useDispatch();
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}
    >
      {listItems.length !== 0 ? (
        <FlatList
          data={listItems}
          keyExtractor={(item) => item.priority.toString()}
          renderItem={({item}) => (
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
      ) : (
        <Text style={{ fontSize: 30 }}>You list is empty :'(</Text>
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#ff333390',
    padding: 5,
  },
});

export default ListView;
