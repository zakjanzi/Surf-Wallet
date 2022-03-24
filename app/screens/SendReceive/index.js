import {t} from 'i18next';
import React, {useState} from 'react';
import {View, ScrollView, Image, TouchableOpacity, Text} from 'react-native';
import {useSelector} from 'react-redux';
import CHeader from '../../components/CHeader';
import {DarkColor, LightColor} from '../../config/colors';
import styles from './styles';

export default function SendReceive({navigation}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  return (
    <>
      <CHeader
        title={t('sendReceive')}
        // backBtn
        // onBackPress={() => {
        //   navigation.goBack();
        // }}
      />
      <View
        style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}></View>
    </>
  );
}
