import { combineReducers } from 'redux';
import bottomBarReducer from './bottomBarReducer';
import tasksReducer from './tasksReducer';
import shuffleModalReducer from './shuffleModalReducer';

// The main reducer that combines all the sub reducers
const rootReducer = combineReducers({
  TasksR: tasksReducer,
  BottomBarR: bottomBarReducer,
  ShuffleModalR: shuffleModalReducer,
})
export default rootReducer;
