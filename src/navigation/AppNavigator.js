import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TasksScreen from '../screens/TasksScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import BottomNav from '../screens/BottomNav';
import ProfileScreen from '../screens/ProfileScreen';
import Modal from '../screens/modal/Modal';

const Stack = createStackNavigator();
//const ModalStack = createStackNavigator();
//
// function ModalStackScreen() {
//   return (
//     <ModalStack.Navigator
//       mode='modal'
//       headerMode='none'
//       screenOptions={{
//         cardStyle: { backgroundColor: 'transparent' },
//         cardOverlayEnabled: true,

//         cardStyleInterpolator: ({ current: { progress } }) => ({
//           cardStyle: {
//             opacity: progress.interpolate({
//               inputRange: [0, 0.5, 0.9, 1],
//               outputRange: [0, 0.25, 0.7, 1],
//             }),
//           },

//           overlayStyle: {
//             opacity: progress.interpolate({
//               inputRange: [0, 1],
//               outputRange: [0, 0.5],
//               extrapolate: 'clamp',
//             }),
//           },
//         }),
//       }}
//     >
//       <ModalStack.Screen name='ModalDescription' component={ModalDescription} />
//       <ModalStack.Screen name='ModalCategory' component={ModalCategory} />
//     </ModalStack.Navigator>
//   );
// }
// {
// }

// const RootStack = () => {
//   return (
//     <ModalStack.Navigator
//       mode='modal'
//       headerMode='none'
//       initialRouteName='Tasks'
//       screenOptions={{
//         cardStyle: { backgroundColor: 'transparent' },
//         cardOverlayEnabled: true,

//         cardStyleInterpolator: ({ current: { progress } }) => ({
//           cardStyle: {
//             opacity: progress.interpolate({
//               inputRange: [0, 0.5, 0.9, 1],
//               outputRange: [0, 0.25, 0.7, 1],
//             }),
//           },

//           overlayStyle: {
//             opacity: progress.interpolate({
//               inputRange: [0, 1],
//               outputRange: [0, 0.5],
//               extrapolate: 'identity',
//             }),
//           },
//         })
//       }}
//     >
//       <ModalStack.Screen name='ModalDescription' component={ModalDescription} />
//       <ModalStack.Screen name='ModalCategory' component={ModalCategory} />
//       <ModalStack.Screen name='Tasks' component={TasksScreen} />
//     </ModalStack.Navigator>
//   );
// };

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
         mode='modal'
         headerMode='none'
         initialRouteName='Welcome'
         screenOptions={{
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
          })
        }}
      >
        <Stack.Screen name='ModalDescription' component={Modal} />
        <Stack.Screen name='Tasks' component={TasksScreen} />
        <Stack.Screen name='Welcome' component={WelcomeScreen} />
        <Stack.Screen name='BottomNav' component={BottomNav} />
        <Stack.Screen name='Profile' component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;