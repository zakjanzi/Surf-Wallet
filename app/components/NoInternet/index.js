import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  Modal,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {useSelector} from 'react-redux';
import {DarkColor, LightColor} from '../../config/colors';
import {Images} from '../../config/images';
import CText from '../CText';
import {t} from 'i18next';

export default function NoInternet() {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const [isConnected, setisConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setisConnected(state.isConnected);
    });
  }, []);

  return (
    <>
      <Modal visible={!isConnected} style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            backgroundColor: BaseColor.primaryBG,
            padding: 16,
            justifyContent: 'space-around',
            paddingHorizontal: 64,
          }}>
          <Image
            source={Images.no_internet}
            style={{height: 220, width: '100%'}}
            resizeMode="contain"
          />
          <View>
            <CText
              value={t('notworkUnavailable')}
              bold
              style={{
                color: BaseColor.text1,
                fontSize: 20,
                textAlign: 'center',
              }}
            />
            <CText
              value={t('makeSureNetwork')}
              bold
              style={{
                color: BaseColor.text2,
                fontSize: 16,
                textAlign: 'center',
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
