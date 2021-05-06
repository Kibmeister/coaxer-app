import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import MainStackNavigator from './src/navigation/AppNavigator';
import { Provider as StateProvider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import store from './src/redux/store';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Audio } from 'expo-av';

export default function App() {
  async function playAcademic() {
    const { sound } = await Audio.Sound.createAsync(
      require('./src/assets/sounds/academic.mp3')
    );
    await sound.playAsync();
  }

  async function playLeisure() {
    const { sound } = await Audio.Sound.createAsync(
      require('./src/assets/sounds/leisure.mp3')
    );
    await sound.playAsync();
  }

  async function playPractical() {
    const { sound } = await Audio.Sound.createAsync(
      require('./src/assets/sounds/practical.mp3')
    );
    await sound.playAsync();
    alert('Det er fuckings lyd i dritten');
  }

  useEffect(() => {
    // set the settings for audio play, background sound and earpiece
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: true,
    });
    setInterval(async () => {

      await playPractical();
    }, 10000);
  }, []);

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
