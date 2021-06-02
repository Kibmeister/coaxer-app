import { createStore } from 'redux';
import rootreducer from './reducers/reducer';
// STORE
// Creates the main store with the root reducer
// The Store is kind of a vault as well as a common state for the whole application
// The vault holds a common value for all the tasks, screens etc.. kindof like a webserver just runnnig locally 
// State is the same for all the components and screens as it is deployed in App, and sets a 
// common truth for these components. 
// REDUCERS
// the reducers role through Actions, is to manipulate the state of Store
// there are several reducers since there are different sub states under store.
// ACTIONS
// an action is an object that contains the payload and type of maipulation, dispatched from screens or components.
// the payload can be e.g be the task object that is submitted. the type could be ADD_ITEM to tell the reducer 
// to mainpulate the state with adding a new task, where the manipulation is adding the new task (payload) to the store. 
const store = createStore(rootreducer);

export default store;
