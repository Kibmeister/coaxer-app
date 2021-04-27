import React, { useEffect, useState, useRef } from 'react';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { View, StyleSheet, Text, Button } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

const ProfileView = () => {
  // const [expoPushToken, setExpoPushToken] = useState('');
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();

  // useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) =>
  //     setExpoPushToken(token)
  //   );

  //   This listener is fired whenever a notification is received while the app is foregrounded
  //   notificationListener.current = Notifications.addNotificationReceivedListener(
  //     (notification) => {
  //       setNotification(notification);
  //     }
  //   );

  //   This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(
  //     (response) => {
  //       console.log('When a user interacts with a notification, this will be the response')
  //       console.log(response);
  //     }
  //   );

  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationListener.current
  //     );
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  return (
    <View
      style={{
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 20,
        backgroundColor: 'white',
      }}
    >
      {/* <Text>Your expo push token: {expoPushToken}</Text> */}
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      
      </View>
      <Button
        title='Press to Send Notification'
        // onPress={async () => {
        //   await sendPushNotification(expoPushToken);
        // }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  flatListContainer: {
    height: '85%',
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  flatListView: {
    height: '100%',
    width: '98%',
    alignSelf: 'flex-start',
    flexGrow: 1,
  },

  priorityView: {
    height: '100%',
    width: '15%',
    backgroundColor: 'white',
    flexGrow: 0,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },

  highP: {
    alignSelf: 'center',
  },

  line: {
    borderColor: 'black',
    borderLeftWidth: 1,
    height: '75%',
    alignSelf: 'center',
  },
  lowP: {
    alignSelf: 'center',
  },

  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 5,
    paddingRight: 5,
    justifyContent: 'space-between',
    width: '100%',

    borderBottomWidth: 0.25,
  },
  listItemMetaContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: '400',
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#ff333390',
    padding: 5,
  },
});

// async function sendPushNotification(expoPushToken) {
//   const message = {
//     to: expoPushToken,
//     sound: 'default',
//     title: 'Morra di jobber ikke her',
//     body: 'Det gjør heller ikke fattern',
//     data: { someData: 'goes here' },
//   };

//   await fetch('https://exp.host/--/api/v2/push/send', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Accept-encoding': 'gzip, deflate',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(message),
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Constants.isDevice) {
//     const {
//       status: existingStatus,
//     } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log(token);
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   return token;
// }

export default ProfileView;
