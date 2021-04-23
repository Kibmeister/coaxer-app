import { combineReducers } from 'redux';
import bottomBarReducer from './bottomBarReducer';
import tasksReducer from './tasksReducer';
import shuffleModalReducer from './shuffleModalReducer';


const rootReducer = combineReducers({
  TasksR: tasksReducer,
  BottomBarR: bottomBarReducer,
  ShuffleModalR: shuffleModalReducer,
})
export default rootReducer;
