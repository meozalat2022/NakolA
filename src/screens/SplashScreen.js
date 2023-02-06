import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import RNBootSplash from 'react-native-bootsplash';

const SplashScreen = ({navigation}) => {
  //splashscreen

  RNBootSplash.hide();

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <LottieView
        source={require('../../assets/SplashScreen.json')}
        autoPlay
        loop={false}
        onAnimationFinish={() => navigation.navigate('LandingScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SplashScreen;
