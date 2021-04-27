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


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  let stateArray = [];
  let latestTask;

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
   
    setInterval(async () => {
      if (store.getState().TasksR.tasksList.length !== 0) {
        stateArray = store.getState().TasksR.tasksList;
        taskForNotification();
      } else if (store.getState().TasksR.tasksList.length == 0) {
        latestTask = null;
      }
     // console.log(latestTask);

      if (expoPushToken.length !== 0 && latestTask !== null) {
        await sendPushNotification(expoPushToken, latestTask);
      }
    }, 10000);

    //This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
        console.log('Nå er notifikasjon mottatt i forgrunne : ' + notification.request.content.body);
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(
          'When a user interacts with a notification, this will be the response'
        );
        console.log(response);
        latestTask = null;
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  function taskForNotification() {
    latestTask = stateArray[0];
  }

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


async function sendPushNotification(expoPushToken, task) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: task.category,
      body: task.description,
      data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
}
// denne function lager basically
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
