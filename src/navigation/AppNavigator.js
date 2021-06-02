import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TasksScreen from '../screens/TasksScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import BottomNav from '../screens/BottomNav';
import ProfileScreen from '../screens/ProfileScreen';
import Modal from '../screens/modal/Modal';

// create a navigator which is used to navigate between the screens below
const Stack = createStackNavigator();
// renders the "stack" created above
// this stack houses all the screens used in the app 
function MainStackNavigator() {
  return (
    <NavigationContainer>
      {/* the screens are presented in a modal fashion, which actually means that they overlay eachother
      the interpolater also specifes how the transition between the pages work */}
      <Stack.Navigator
        mode='modal'
        headerMode='none'
        initialRouteName='Welcome'
        screenOptions={{
          cardStyle: { backgroundColor: 'transparent' },
          cardOverlayEnabled: true,
        
         cardStyleInterpolator: ({ current: { progress } }) => ({
            containerStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          }),
        }}
      >
        {/* the main modal screen has a specified transition as it overlays TasksScreen that is semi transparent
        below */}
        <Stack.Screen
          name='ModalDescription'
          options={{
            cardStyle: { backgroundColor: 'transparent' },
            cardOverlayEnabled: true,

            cardStyleInterpolator: ({ current: { progress } }) => ({
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1],
                }),
              },

              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                  extrapolate: 'identity',
                }),
              },
            }),
          }}
          component={Modal}
        />
        {/* the rest of the screens in the stack navigator */}
        <Stack.Screen name='Tasks' component={TasksScreen} />
        <Stack.Screen name='Welcome' component={WelcomeScreen} />
        <Stack.Screen name='BottomNav' component={BottomNav} />
        <Stack.Screen name='Profile' component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
