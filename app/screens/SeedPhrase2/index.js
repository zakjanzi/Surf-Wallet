import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  Dimensions,
} from 'react-native';
import {DarkColor, LightColor} from '../../config/colors';
import CHeader from '../../components/CHeader';
import {t} from 'i18next';
import styles from './styles';
import CText from '../../components/CText';
import ProgressBar from 'react-native-progress/Bar';
import {Images} from '../../config/images';
import Toast from 'react-native-simple-toast';
import Clipboard from '@react-native-clipboard/clipboard';
import CButton from '../../components/CButton';
import {enableAnimateInEaseOut} from '../../config/commonFunctions';

export default function SeedPhrase2({
  navigation,
  route,
  setPhrase = () => {},
  setPaste = () => {},
}) {
  const type = route?.params?.type;
  console.log('🚀 ~ file: index.js ~ line 31 ~ type', type);

  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const [privateKeyLoading, setprivateKeyLoading] = useState(false);
  const [privateKeyGenerate, setprivateKeyGenerate] = useState(false);
  const [privateKey, setprivateKey] = useState('0xrYCbftL0GpLnuYigpsUtrlq');

  const [phrase, setphrase] = useState();
  const [phraseArr, setphraseArr] = useState([]);
  const [phraseProgess, setphraseProgess] = useState(0);

  const pastePhrase = async () => {
    const text = await Clipboard.getString();
    setphrase(text);
    setPhrase(text);
    setPaste(true);
    Toast.show(t('pasted'));
  };

  enableAnimateInEaseOut();

  return (
    <>
      {type == 'already' && (
        <CHeader
          title={t('seedPhrase')}
          backBtn
          onBackPress={() => {
            navigation.goBack();
          }}
        />
      )}
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        <ScrollView style={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
          <View
            style={[
              styles.privateKeyCont,
              {backgroundColor: BaseColor.langUNSBtnBack},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <CText
                value={phrase}
                style={{
                  color: BaseColor.text1,
                  fontSize: 14,
                  flex: 1,
                }}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  // Clipboard.setString(privateKey);
                  pastePhrase();
                }}
                style={{padding: 8}}>
                <CText
                  value={t('paste')}
                  medium
                  style={{
                    color: BaseColor.onBoardTitle,
                    fontSize: 12,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              // alignItems: 'center',
              margin: 16,
            }}>
            <Image
              style={{height: 14, width: 14, marginTop: 4}}
              source={dark ? Images.mini_info_dark : Images.mini_info_light}
              resizeMode="contain"
            />
            <CText
              value={t('writeDownSeedPhrase')}
              style={{
                color: BaseColor.text2,
                fontSize: 12,
                marginStart: 16,
              }}
            />
          </View>
        </ScrollView>

        {type == 'already' && (
          <View style={{padding: 16}}>
            <CButton
              value={t('continue')}
              disable={!phrase}
              onPress={() => {
                navigation.navigate('HomeDrawerNavigator');
              }}
            />
          </View>
        )}
      </View>
    </>
  );
}
