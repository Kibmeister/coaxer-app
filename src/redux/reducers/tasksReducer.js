import produce from 'immer';

export const ADD_ITEM = 'ADD_ITEM';
export const SET_TASK_LIST = 'SET_TASK_LIST';
export const DECREMENT_ITERATIONS = 'DECREMENT_ITERATIONS';
export const SET_TOP_THREE = 'SET_TOP_THREE';

//ACTIONS
// Adding a new task
export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});
//After a task has been dragged, the stores version of the list has to be the same as what is rendered
export const setTaskList = (list) => ({
  type: SET_TASK_LIST,
  payload: list,
});
//when a task is pressed and its counter is decremented
export const decrementIterations = (id) => ({
  type: DECREMENT_ITERATIONS,
  payload: id,
});
//sets the top three tasks to its own sub-state in store since these are the ones used for sonification
export const setTopThree = (time) => ({
  type: SET_TOP_THREE,
  payload: time,
});
//main state of store that holds all the taks that are rendered, the top three tasks with the highes priority
// - as welll as a time state for when tasks are submitted 
const initialState = {
  tasksList: [],
  topThreeTask: [],
  previousTime: {},
};
// function that measured the date different between two dates
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
// function that converts month number to string
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
//date variable used as of todys date to compare to the date of the submitted tasks
var d = new Date();
const mdate = d.toString().split(' ');
const formattedDate =
  mdate[3] + '/' + monthStringToNUmber(mdate[1]) + '/' + mdate[2];

const tasksReducer = (state = initialState, action) => {
  let task = action.payload;
  return produce(state, (draft) => {
    switch (action.type) {
      // reducer for adding a task 
      case ADD_ITEM:
        // if a task has a due date its index in the list has to be calcaulted based on its urgency compared to the other tasks
        if (task.duedate.cond) {
          if (draft.tasksList.length == 0) {
            draft.tasksList.push(action.payload);
          } else {
            let dueDate = difference(formattedDate, task.duedate.date);
            let validDate = dueDate >= 0 ? true : false;
            let loopRan = false;

            draft.tasksList.forEach((t, i) => {
              // loops through the list at checks if the other tasks has a due date
              let dueDateI = '';
              let lastTaskDate = '';
              if (t.duedate.cond) {
                dueDateI = difference(formattedDate, t.duedate.date);
              }
              //checks the date differnece between the current date and the date of the last task in the array
              if (draft.tasksList[draft.tasksList.length - 1].duedate.cond) {
                lastTaskDate = difference(
                  formattedDate,
                  draft.tasksList[draft.tasksList.length - 1].duedate.date
                );
              }


              if (dueDate < dueDateI && validDate && !loopRan) {
                // incomming task is most urgent
                let newArray = draft.tasksList;
                newArray.splice(i, 0, task);
                draft.taskList = newArray;
                loopRan = true;
              } else if (lastTaskDate < dueDate && validDate && !loopRan) {
                // incomming task is less urgen than the least urgent task in list
                draft.tasksList.push(task);
                loopRan = true;
              }
            });
          }
        }  else {
          draft.tasksList.push(task); // add the task to the end of the list if it does not have a due date
        }
        break;
      // reducer that updates the task state to what is being rendered 
      case SET_TASK_LIST:
        let newArray = action.payload;
        if (newArray.length !== 0) {
          draft.tasksList = newArray;
        }

        break;
      // reducer that decrements the iteration count to the task that is pressed
      case DECREMENT_ITERATIONS:
        let arr = draft.tasksList;
        arr.forEach((task) => {
          if (task.id == action.payload) {
            task.iterations -= 1;
          }
        });
        // console.log('After decrement')
        // console.log(arr);
        // console.log('After removed')
        // console.log(arr.filter(task => task.iterations > 0))

        draft.tasksList = arr.filter(task => task.iterations > 0);
        break;
      // reducer for setting the top three tasks with the highest priority ready for sonification 
      case SET_TOP_THREE:

        let date = action.payload.toString().split(' '); // THIS OBJECT IS NOT THE CORRECT TYPE ON IOS, THUS THE BELOW FN DOES NOT WORK  IN IOS
        const incommingFormattedDate =
          date[4] +
          '/' +
          monthStringToNUmber(date[1]) +
          '/' +
          date[2] +
          '/' +
          date[3];
        if (Object.keys(incommingFormattedDate).length == 0) {
          // 2021/5/10/17:14:12
          draft.previousTime = incommingFormattedDate;
        }
  
        let hour;
        let minute;
        if (date[3].length !== 0) {
          hour = date[3].split(':')[0];
          minute = date[3].split(':')[1];
        }
        // the valid timespan for when the top three tasks are set 
        const correctHour = 23 >= parseInt(hour, 10) && parseInt(hour, 10) >= 8;
        const correctMinute = 59 >= parseInt(minute, 10) && parseInt(minute, 10) >= 0;
        // set the top three tasks of taskslist to the topthreeTasks list to  prepare them for sonificaiton
        if (correctHour && correctMinute) {
          draft.topThreeTask = draft.tasksList.slice(0, 3);
        }
        break;

      default:
    }
  });
};

export default tasksReducer;
