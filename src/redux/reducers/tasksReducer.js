import produce from 'immer';

export const ADD_ITEM = 'ADD_ITEM';
export const SET_TASK_LIST = 'SET_TASK_LIST';
export const DECREMENT_ITERATIONS = 'DECREMENT_ITERATIONS';
export const SET_TOP_THREE = 'SET_TOP_THREE';

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const setTaskList = (list) => ({
  type: SET_TASK_LIST,
  payload: list,
});
export const decrementIterations = (id) => ({
  type: DECREMENT_ITERATIONS,
  payload: id,
});

export const setTopThree = (time) => ({
  type: SET_TOP_THREE,
  payload: time,
});

const initialState = {
  tasksList: [],
  topThreeTask: [],
  previousTime: {},
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
  mdate[3] + '/' + monthStringToNUmber(mdate[1]) + '/' + mdate[2];

const tasksReducer = (state = initialState, action) => {
  let task = action.payload;
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_ITEM:
        // console.log('DETTE ER ACTION TYPE : ' + action.type);
        if (task.duedate.cond) {
          // there is a duedate for the event
          if (draft.tasksList.length == 0) {
            // the list is empty
            draft.tasksList.push(action.payload);
            // console.log('Incomming task List empty');
          } else {
            let dueDate = difference(formattedDate, task.duedate.date);
            let validDate = dueDate >= 0 ? true : false;
            let loopRan = false;

            draft.tasksList.forEach((t, i) => {
              // console.log('For each kjører');
              // sjeke at tasken i arrayet har en duedate før difference funksjonen kjører
              let dueDateI = '';
              let lastTaskDate = '';
              if (t.duedate.cond) {
                dueDateI = difference(formattedDate, t.duedate.date);
              }
              if (draft.tasksList[draft.tasksList.length - 1].duedate.cond) {
                lastTaskDate = difference(
                  formattedDate,
                  draft.tasksList[draft.tasksList.length - 1].duedate.date
                );
              }

              //finne duedate til siste task i arrayet
              // console.log('Duedate :' + dueDate);
              // console.log('DuedateI :' + dueDateI);
              // console.log('Last task date :' + lastTaskDate);

              if (dueDate < dueDateI && validDate && !loopRan) {
                // incomming task is most urgent
                let newArray = draft.tasksList;
                newArray.splice(i, 0, task);
                draft.taskList = newArray;
                loopRan = true;
                // console.log('Incomming task is more urgent');
              } else if (lastTaskDate < dueDate && validDate && !loopRan) {
                // incomming task is less urgen than the least urgent task in list
                draft.tasksList.push(task);
                loopRan = true;
                // console.log('Incomming task is LESS urgent');
              }
            });
          }
        } else {
          draft.tasksList.push(task); // hvis det ikke er satt en duedat for tasken
          // console.log('Incomming task without duedate');
        }
        break;
      case SET_TASK_LIST:
        let newArray = action.payload;
        if (newArray.length !== 0) {
          draft.tasksList = newArray;
        }

        break;
      case DECREMENT_ITERATIONS:
        let arr = draft.tasksList;
        arr.forEach((task) => {
          if (task.id == action.payload) {
            task.iterations -= 1;
          }
        });
        draft.tasksList = arr.filter((task) => task.iterations > 0);
        break;

      case SET_TOP_THREE:

        let date = action.payload.toString().split(' '); // THIS OBJECT IS NOT THE CORRECT TYPE ON IOS, THUS THE BELOW FN DOES NOT WORK
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

        const correctHour = 23 >= parseInt(hour, 10) && parseInt(hour, 10) >= 8;
        const correctMinute = 59 >= parseInt(minute, 10) && parseInt(minute, 10) >= 0;

        if (correctHour && correctMinute) {
          draft.topThreeTask = draft.tasksList.slice(0, 3);
        }
        break;

      default:
    }
  });
};

export default tasksReducer;
