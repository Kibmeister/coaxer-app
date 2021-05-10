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

export default function App() {
  useEffect(() => {
    // set the settings for audio play, background sound and earpiece
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });

    registerTaskAsync();

    setInterval(async () => {
      store.dispatch(setTopThree(new Date()));
    }, 30000);
  }, []);

  registerTaskAsync = async () => {
    await BackgroundFetch.registerTaskAsync('vesken', {
      minimumInterval: 5,
      stopOnTerminate: false,
      startOnBoot: true,
    });
    console.log('task registered');
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
      receiveArray();
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

receiveArray = () => {
  // new Date().toLocaleString('en-GB', {timeZone: 'Europe/Copenhagen'})
  //store.dispatch(setTopThree('den gang da'));

  console.log('Receive array');

  //fcDate(taskDates);
  //const { category } = latestTask;
  //category == 'Leisure' ? playLeisure() : category == 'Academic' ? playAcademic() : playPractical();
};
