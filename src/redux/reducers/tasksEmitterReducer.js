import produce from 'immer';

export const MOST_URGENT = 'MOST_URGENT';
export const SECOND_MOST_URGEN = 'SECOND_MOST_URGENT';

export const most_urgent = (tasks) => ({
  type: MOST_URGENT,
  payload: tasks,
})





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
  mdate[3] + '/' + monthStringToNUmber(mdate[1]) + '/' + mdate[2];

const tasksEmitterReducer = (state = initialState) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case MOST_URGENT:
        console.log('Most recent task that are emitted');
        break;
      case SECOND_MOST_URGENT:
        console.log('Second most recent task that are emitted');
        break;
      default:
        console.log('Bare bail out fast');
    }
  });
};

export default tasksEmitterReducer;