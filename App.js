import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import MainStackNavigator from './src/navigation/AppNavigator';
import { Provider as StateProvider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import store from './src/redux/store';
import { setTopThree } from './src/redux/reducers/tasksReducer';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { Audio } from 'expo-av';

// async function for the academic earcon
async function playAcademic() {
  const { sound } = await Audio.Sound.createAsync(
    require('./src/assets/sounds/academic.mp3')
  );
  sound.setVolumeAsync(1.0);

  await sound.playAsync();
}
// async function for the leisure earcon
async function playLeisure() {
  const { sound } = await Audio.Sound.createAsync(
    require('./src/assets/sounds/leisure.mp3')
  );
  sound.setVolumeAsync(1.0);
  await sound.playAsync();
}
// async function for the practical earcon
async function playPractical() {
  const { sound } = await Audio.Sound.createAsync(
    require('./src/assets/sounds/practical.mp3')
  );
  sound.setVolumeAsync(1.0);
  await sound.playAsync();
}
// array with boolean conditions representing the 12 hour span earcons are played
//- this is to prevent the earcons for playing more than once during an hour
let soundPlayed = [
  { value: false },
  { value: false },
  { value: false },
  { value: false },
  { value: false },
  { value: false },
  { value: false },
  { value: false },
  { value: false },
  { value: false },
  { value: false },
  { value: false },
];

export default function App() {
  // function that is executed once the component is mounted 
  useEffect(() => {
    //set the settings for audio play, background sound
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
    // registert the async task which is called in with Backgroundfetch
    registerTaskAsync();

  }, []);
  // register the BackgrounFetch funciton to be call the 'vesken' task at minimum of 180s between each call once the app 
  // - is in the background
  registerTaskAsync = async () => {
    await BackgroundFetch.registerTaskAsync('vesken', {
      minimumInterval: 180, //pass the call to taskmanager every third minute
      stopOnTerminate: false,
      startOnBoot: true,
    });
    // console.log('task registered');
  };
//Reders the whole app with the mainstacknavigator together with the Store object, so it is accessable in every component
  return (
    <StateProvider store={store}>
      <MainStackNavigator />
    </StateProvider>
  );
}
// styling for the containers
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
// this task is called once the app is in the background and starts a chain of funcitons that eventually playes the earcon
TaskManager.defineTask('vesken', () => {
  try {
    // the earcons are not played if the task i empty 
    const taskArray = store.getState().TasksR.tasksList;
    if (taskArray.length !== 0) {
      arrayNotEmpty();
    } else {
      console.log('Empty array');
    }
    return taskArray
      ? BackgroundFetch.Result.NewData
      : BackgroundFetch.Result.NoData;
  } catch (err) {
    return BackgroundFetch.Result.Failed;
  }
});
//if the task list isn't empty the function dispatches to the store to set the top three tasks
arrayNotEmpty = () => {
  let cphDate = new Date().toLocaleString('en-GB', {
    timeZone: 'Europe/Copenhagen',
  });
  store.dispatch(setTopThree(cphDate));

  let date = cphDate.toString().split(' ');
  let hour = date[3].split(':')[0];
  let minute = date[3].split(':')[1];
 // here it retreives the top three tasks from the store 
  let topThree = store.getState().TasksR.topThreeTask;

  if (topThree.length == 3) {
    // check if top three task is empty
    playSounds(hour, topThree);
  }
};
// for testing purposes a earcon is played once every hour(to distribute to earcons over a longer timespan while not having access to google calendar)
playSounds = (time, topThree) => {
  let timeToPlay = parseInt(time, 10); //string to int
  // the top three tasks and their category
  const topThreeArr = topThree;
  let firstPriCategory = topThreeArr[0].category;
  let secondPriCategory = topThreeArr[1].category;
  let thirdPriCategory = topThreeArr[2].category;
  
  // switch statement that playes one of the three earcons every hour from 9 - 20 o clock 
  // how often and what earcon is played depends on the priority to the task it belongs to
  // in each of the cases a fuction checks what category the task is singed with 

  switch (timeToPlay) {
    case 21: // set all play conditions to false when the clock in 21 so teh earcons can play the next day 
      soundPlayed.map((t) => {
        t.value = false;
      });
      break;
    case 9:
      // check if sound has been played at hour 10
      if (!soundPlayed[0].value) {
        // checks the category of the task and plays the corresponding earcon
        firstPriCategory == 'Leisure'
          ? playLeisure()
          : firstPriCategory == 'Academic'
          ? playAcademic()
          : playPractical();
        soundPlayed[0].value = true;
      }
      break;
    case 10:
      // check if sound has been played at hour 12
      if (!soundPlayed[1].value) {
         // checks the category of the task and plays the corresponding earcon
        secondPriCategory == 'Leisure'
          ? playLeisure()
          : secondPriCategory == 'Academic'
          ? playAcademic()
          : playPractical();
        soundPlayed[1].value = true;
      }
      break;
    case 11:
      // check if sound has been played at hour 14
      if (!soundPlayed[2].value) {
        // checks the category of the task and plays the corresponding earcon
        firstPriCategory == 'Leisure'
          ? playLeisure()
          : firstPriCategory == 'Academic'
          ? playAcademic()
          : playPractical();
        soundPlayed[2].value = true;
      }
      break;
    case 12:
       // check if sound has been played at hour 16
      if (!soundPlayed[3].value) {
         // checks the category of the task and plays the corresponding earcon
        secondPriCategory == 'Leisure'
          ? playLeisure()
          : secondPriCategory == 'Academic'
          ? playAcademic()
          : playPractical();
        soundPlayed[3].value = true;
      }
      break;
    case 13:
      // check if sound has been played at hour 18
      if (!soundPlayed[4].value) {
        // checks the category of the task and plays the corresponding earcon
        firstPriCategory == 'Leisure'
          ? playLeisure()
          : firstPriCategory == 'Academic'
          ? playAcademic()
          : playPractical();
        soundPlayed[4].value = true;
      }
      break;
    case 14:
      // check if sound has been played at hour 20
      if (!soundPlayed[5].value) {
        // checks the category of the task and plays the corresponding earcon
        thirdPriCategory == 'Leisure'
          ? playLeisure()
          : thirdPriCategory == 'Academic'
          ? playAcademic()
          : playPractical();
        soundPlayed[5].value = true;
      }
      break;
    case 15:
      // check if sound has been played at hour 10
      if (!soundPlayed[6].value) {
        // checks the category of the task and plays the corresponding earcon
        firstPriCategory == 'Leisure'
          ? playLeisure()
          : firstPriCategory == 'Academic'
          ? playAcademic()
          : playPractical();
        soundPlayed[6].value = true;
      }
      break;
    case 16:
       // check if sound has been played at hour 12
      if (!soundPlayed[7].value) {
        // checks the category of the task and plays the corresponding earcon
        secondPriCategory == 'Leisure'
          ? playLeisure()
          : secondPriCategory == 'Academic'
          ? playAcademic()
          : playPractical();
        soundPlayed[7].value = true;
      }
      break;
    case 17:
      // check if sound has been played at hour 17
      if (!soundPlayed[8].value) {
        // checks the category of the task and plays the corresponding earcon
        firstPriCategory == 'Leisure'
          ? playLeisure()
          : firstPriCategory == 'Academic'
          ? playAcademic()
          : playPractical();
        soundPlayed[8].value = true;
      }
      break;
    case 18:
      // check if sound has been played at hour 18
      if (!soundPlayed[9].value) {
        // checks the category of the task and plays the corresponding earcon
        secondPriCategory == 'Leisure'
          ? playLeisure()
          : secondPriCategory == 'Academic'
          ? playAcademic()
          : playPractical();
        soundPlayed[3].value = true;
      }
      break;
    case 19:
      // check if sound has been played at hour 18
      if (!soundPlayed[10].value) {
         // checks the category of the task and plays the corresponding earcon
        firstPriCategory == 'Leisure'
          ? playLeisure()
          : firstPriCategory == 'Academic'
          ? playAcademic()
          : playPractical();
        soundPlayed[10].value = true;
      }
      break;
    case 20:
      // check if sound has been played at hour 20
      if (!soundPlayed[11].value) {
         // checks the category of the task and plays the corresponding earcon
        thirdPriCategory == 'Leisure'
          ? playLeisure()
          : thirdPriCategory == 'Academic'
          ? playAcademic()
          : playPractical();
        soundPlayed[11].value = true;
      }
      break;
  }
};
