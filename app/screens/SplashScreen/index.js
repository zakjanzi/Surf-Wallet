import React, {useEffect} from 'react';
import {Text, View, StatusBar} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {FontFamily} from '../../config/typography';

export default function SplashScreen({navigation}) {
  const fadeOut = useSharedValue(0);

  const animatStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeOut.value,
    };
  }, []);

  useEffect(() => {
    fadeOut.value = withTiming(1.0, {duration: 2000});
    setTimeout(() => {
      navigation.navigate('LanguageScreen');
    }, 3000);
  }, []);

  return (
    <>
      <StatusBar hidden />
      <View
        style={{
          flex: 1,
          backgroundColor: '#3700B3',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.View style={animatStyle}>
          <Text
            style={[
              {
                color: '#fff',
                fontWeight: 'bold',
                fontFamily: FontFamily.Inter_Regular,
                fontSize: 34,
              },
              ,
            ]}>
            Surf wallet
          </Text>
        </Animated.View>
      </View>
    </>
  );
}
