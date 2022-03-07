import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {FontFamily} from '../../config/typography';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('LanguageScreen');
    }, 3000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#3700B3',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: '#fff',
          fontWeight: 'bold',
          fontFamily: FontFamily.Inter_Regular,
          fontSize: 34,
        }}>
        Surf wallet
      </Text>
    </View>
  );
}
