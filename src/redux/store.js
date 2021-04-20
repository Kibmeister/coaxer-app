import { createStore } from 'redux';
import rootreducer from './reducers/reducer';

const store = createStore(rootreducer);

export default store;
