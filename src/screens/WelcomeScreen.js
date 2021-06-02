import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import LoginButton from '../components/LoginButton';

//This screen diplays the welcome page with a log in button in lower end of the screen
const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.screen}>
      <View style={styles.welcomePromt}>
        <Text style={styles.title}>Coaxer</Text>
        <Text style={styles.welcomeText}>
          "Welcome to the app that organizes your daily tasks with ease"
        </Text>
        <Image
        style={styles.logo}
        source={require('../assets/logo.png')}
      />
      </View>
      <LoginButton onPress={() => navigation.navigate('Tasks')}/>
      
    </View>
  );
};
// styling for the containers
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',

  },
  welcomePromt: {
    paddingTop: 36,
    width: '100%',
    height: '70%',
    backgroundColor: 'blue',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    color: 'white',
  },
  welcomeText: {
    fontSize: 16,
    padding: 40,
    textAlign: 'center',
    color: 'white',
    fontStyle: 'italic',
    alignSelf: 'center'
  },
  logo: {
    width:'60%',
    height: '60%',
  }
});

export default WelcomeScreen;
