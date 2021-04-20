import produce from 'immer';

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});
export const removeItem = (id) => ({
  type: REMOVE_ITEM,
  payload: id,
});

const initialState = {
  tasksList: [],
};

function difference(date1, date2) {
  const date1new = new Date(date1);
  const date2new = new Date(date2);
  const date1utc = Date.UTC(
    date1new.getFullYear(),
    date1new.getMonth(),
    date1new.getDate()
  );
  const date2utc = Date.UTC(
    date2new.getFullYear(),
    date2new.getMonth(),
    date2new.getDate()
  );

  const day = 1000 * 60 * 60 * 24;
  return (date2utc - date1utc) / day;
}
const monthStringToNUmber = (month) => {
  let stringToNumber = 0;
  if (month == 'Jan') {
    stringToNumber = 1;
  } else if (month == 'Feb') {
    stringToNumber = 2;
  } else if (month == 'Mar') {
    stringToNumber = 3;
  } else if (month == 'Apr') {
    stringToNumber = 4;
  } else if (month == 'May') {
    stringToNumber = 5;
  } else if (month == 'Jun') {
    stringToNumber = 6;
  } else if (month == 'Jul') {
    stringToNumber = 7;
  } else if (month == 'Aug') {
    stringToNumber = 8;
  } else if (month == 'Sep') {
    stringToNumber = 9;
  } else if (month == 'Oct') {
    stringToNumber = 10;
  } else if (month == 'Nov') {
    stringToNumber = 11;
  } else if (month == 'Dec') {
    stringToNumber = 12;
  }
  return stringToNumber;
};

var d = new Date();
const mdate = d.toString().split(' ');
const formattedDate =
  mdate[3] + '-' + monthStringToNUmber(mdate[1]) + '-' + mdate[2];

const tasksReducer = (state = initialState, action) => {
  let task = action.payload;
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_ITEM:
        if (task.duedate.cond) { // there is a duedate for the event
          if (draft.tasksList.length == 0) { // the list is empty 
            draft.tasksList.push(action.payload);
          } else {
            let dueDate = difference(formattedDate, task.duedate.date); 
            let validDate = ((dueDate >= 0) ? true : false)          
            
            draft.tasksList.forEach((t, i) => {
              let dueDateI = difference(formattedDate, t.duedate.date); 
              let lastTaskDate = difference(formattedDate, draft.tasksList[draft.tasksList.length-1].duedate.date) //finne duedate til siste task i arrayet 

              if (dueDate < dueDateI && validDate) { // incomming task is most urgent
                let newArray = draft.tasksList;
                newArray.splice(i, 0, task);
                draft.taskList = newArray;

              } else if(lastTaskDate < dueDate && validDate){ // incomming task is less urgen than the least urgent task in list
                draft.tasksList.push(task);
              }
            });
          }
        } else {
          draft.tasksList.push(task);       // hvis det ikke er satt en duedat for tasken
        }
        console.log('State list : ');
        console.log(state.tasksList);
        console.log('---------------------------------');
      case REMOVE_ITEM:

      default:
    }
  });
};

export default tasksReducer;
// return {
//   ...state,
//   itemList: state.itemList.concat({
//     id: Math.random(),
//     name: action.payload,
//   }),
// };

// return {
//   ...state,
//   itemList: state.itemList.filter((item) => item.id !== action.payload),
// };

// return state;
