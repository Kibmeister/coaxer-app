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

async function playAcademic() {
  const { sound } = await Audio.Sound.createAsync(
    require('./src/assets/sounds/academic.mp3')
  );
  sound.setVolumeAsync(1.0);

  await sound.playAsync();
}

async function playLeisure() {
  const { sound } = await Audio.Sound.createAsync(
    require('./src/assets/sounds/leisure.mp3')
  );
  sound.setVolumeAsync(1.0);
  await sound.playAsync();
}

async function playPractical() {
  const { sound } = await Audio.Sound.createAsync(
    require('./src/assets/sounds/practical.mp3')
  );
  sound.setVolumeAsync(1.0);
  await sound.playAsync();
}

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
  useEffect(() => {
    //set the settings for audio play, background sound and earpiece
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });

    registerTaskAsync();

    // setInterval(async () => {
    //   playPractical();
    // }, 3000);


  }, []);

  registerTaskAsync = async () => {
    await BackgroundFetch.registerTaskAsync('vesken', {
      minimumInterval: 180, //pass the call to taskmanager every third minute
      stopOnTerminate: false,
      startOnBoot: true,
    });
    // console.log('task registered');
  };

  return (
    <StateProvider store={store}>
      <MainStackNavigator />
    </StateProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

TaskManager.defineTask('vesken', () => {
  try {
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

arrayNotEmpty = () => {
  
  let cphDate = new Date().toLocaleString('en-GB', {
    timeZone: 'Europe/Copenhagen',
  });
  store.dispatch(setTopThree(cphDate));


  let date = cphDate.toString().split(' ');
  let hour = date[3].split(':')[0];
  let minute = date[3].split(':')[1];

  let topThree = store.getState().TasksR.topThreeTask;

  if (topThree.length == 3) {
    // check if top three task is empty
    playSounds(hour, topThree);
  }
};

playSounds = (time, topThree) => {
  // console.log('Play sound called');
  let timeToPlay = parseInt(time, 10); //string to int

  const topThreeArr = topThree;
  let firstPriCategory = topThreeArr[0].category;
  let secondPriCategory = topThreeArr[1].category;
  let thirdPriCategory = topThreeArr[2].category;

  switch (timeToPlay) {
    case 21: // set all play conditions to false
      soundPlayed.map((t) => {
        t.value = false;
      });
      break;
    case 9:
      if (!soundPlayed[0].value) {
        // check if sound has been played at hour 10
        firstPriCategory == 'Leisure'
          ? playLeisure()
          : firstPriCategory == 'Academic'
          ? playAcademic()
          : playPractical();
        soundPlayed[0].value = true;
      }
      break;
    case 10:
      if (!soundPlayed[1].value) {
        // check if sound has been played at hour 12
        secondPriCategory == 'Leisure'
          ? playLeisure()
          : secondPriCategory == 'Academic'
          ? playAcademic()
          : playPractical();
        soundPlayed[1].value = true;
      }
      break;
    case 11:
      if (!soundPlayed[2].value) {
        // check if sound has been played at hour 14
        firstPriCategory == 'Leisure'
          ? playLeisure()
          : firstPriCategory == 'Academic'
          ? playAcademic()
          : playPractical();
        soundPlayed[2].value = true;
      }
      break;
    case 12:
      if (!soundPlayed[3].value) {
        // check if sound has been played at hour 16
        secondPriCategory == 'Leisure'
          ? playLeisure()
          : secondPriCategory == 'Academic'
          ? playAcademic()
          : playPractical();
        soundPlayed[3].value = true;
      }
      break;
    case 13:
      if (!soundPlayed[4].value) {
        // check if sound has been played at hour 18
        firstPriCategory == 'Leisure'
          ? playLeisure()
          : firstPriCategory == 'Academic'
          ? playAcademic()
          : playPractical();
        soundPlayed[4].value = true;
      }
      break;
    case 14:
      if (!soundPlayed[5].value) {
        // check if sound has been played at hour 20
        thirdPriCategory == 'Leisure'
          ? playLeisure()
          : thirdPriCategory == 'Academic'
          ? playAcademic()
          : playPractical();
        soundPlayed[5].value = true;
      }
      case 15:
        if (!soundPlayed[6].value) {
          // check if sound has been played at hour 10
          firstPriCategory == 'Leisure'
            ? playLeisure()
            : firstPriCategory == 'Academic'
            ? playAcademic()
            : playPractical();
          soundPlayed[6].value = true;
        }
        break;
      case 16:
        if (!soundPlayed[7].value) {
          // check if sound has been played at hour 12
          secondPriCategory == 'Leisure'
            ? playLeisure()
            : secondPriCategory == 'Academic'
            ? playAcademic()
            : playPractical();
          soundPlayed[7].value = true;
        }
        break;
      case 17:
        if (!soundPlayed[8].value) {
          // check if sound has been played at hour 14
          firstPriCategory == 'Leisure'
            ? playLeisure()
            : firstPriCategory == 'Academic'
            ? playAcademic()
            : playPractical();
          soundPlayed[8].value = true;
        }
        break;
      case 18:
        if (!soundPlayed[9].value) {
          // check if sound has been played at hour 16
          secondPriCategory == 'Leisure'
            ? playLeisure()
            : secondPriCategory == 'Academic'
            ? playAcademic()
            : playPractical();
          soundPlayed[3].value = true;
        }
        break;
      case 19:
        if (!soundPlayed[10].value) {
          // check if sound has been played at hour 18
          firstPriCategory == 'Leisure'
            ? playLeisure()
            : firstPriCategory == 'Academic'
            ? playAcademic()
            : playPractical();
          soundPlayed[10].value = true;
        }
        break;
      case 20:
        if (!soundPlayed[11].value) {
          // check if sound has been played at hour 20
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
