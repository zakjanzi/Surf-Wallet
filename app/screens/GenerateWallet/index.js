import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {View, ScrollView, Image, TouchableOpacity, Text} from 'react-native';
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

export default function GenerateWallet({navigation}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  let interval;

  const [privateKeyLoading, setprivateKeyLoading] = useState(false);
  const [privateKeyGenerate, setprivateKeyGenerate] = useState(false);
  const [privateKey, setprivateKey] = useState('');
  const [privateKeyProgress, setprivateKeyProgress] = useState(0);

  //loading of privacy key
  const generatePrivacyKey = () => {
    setprivateKeyGenerate(true);
    interval = setInterval(() => {
      console.log('This will run every second!');
      setprivateKeyProgress(progress => {
        if (progress == 0) {
          return 0.2;
        } else if (progress == 0.2) {
          return 0.5;
        } else if (progress == 0.5) {
          return 0.6;
        } else if (progress == 0.6) {
          return 1;
        }
      });
    }, 1000);

    setTimeout(() => {
      setprivateKey('0xrYCbftL0GpLnuYigpsUtrlq');
      clearInterval(interval);
    }, 5000);
  };

  enableAnimateInEaseOut();

  return (
    <>
      <CHeader
        title={t('generateWallet')}
        backBtn
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        <ScrollView style={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
          <View style={{paddingBottom: 25}}>
            <View
              style={{
                backgroundColor: BaseColor.langUNSBtnBack,
                borderRadius: 12,
              }}>
              {privateKeyGenerate && (
                <View
                  style={[
                    styles.privateKeyCont,
                    {backgroundColor: BaseColor.langUNSBtnBack},
                  ]}>
                  {!privateKey ? (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <CText
                        value={t('privateKey') + ' :'}
                        style={{
                          color: BaseColor.text2,
                          fontSize: 12,
                        }}
                      />
                      <View
                        style={{
                          flex: 1,
                          marginStart: 16,
                        }}>
                        <ProgressBar
                          progress={privateKeyProgress}
                          width={null}
                          borderWidth={0}
                          unfilledColor={BaseColor.unProgressBack}
                          color={BaseColor.onBoardTitle}
                        />
                      </View>
                    </View>
                  ) : (
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flex: 1}}>
                        <CText
                          value={t('privateKey') + ' :'}
                          style={{
                            color: BaseColor.text2,
                            fontSize: 12,
                          }}
                        />
                        <CText
                          value={privateKey}
                          style={{
                            color: BaseColor.text1,
                            fontSize: 14,
                          }}
                        />
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          Clipboard.setString(privateKey);

                          Toast.show(t('copied'));
                        }}>
                        <Image
                          source={dark ? Images.copy_dark : Images.copy_light}
                          style={{height: 18, width: 18}}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}
              {privateKey ? (
                <View
                  style={{
                    alignItems: 'center',
                    marginTop: 32,
                    // paddingBottom: 64,
                  }}>
                  <Image
                    source={
                      dark ? Images.mini_info_dark : Images.mini_info_light
                    }
                    style={{height: 14, width: 14}}
                    resizeMode="contain"
                  />
                  <CText
                    value={t('thisIsYourPrivateKey')}
                    style={{
                      color: BaseColor.text2,
                      fontSize: 14,
                      marginHorizontal: 36,
                      textAlign: 'center',
                      marginTop: 24,
                      marginBottom: 64,
                    }}
                  />
                  <Image
                    source={dark ? Images.check_dark : Images.check_light}
                    style={{
                      height: 42,
                      width: 42,
                      marginTop: 24,
                      position: 'absolute',
                      bottom: -21,
                    }}
                    resizeMode="contain"
                  />
                </View>
              ) : null}
            </View>
          </View>
        </ScrollView>
        {privateKey ? (
          <CButton
            value={t('continue')}
            onPress={() => {
              navigation.navigate('SeedPhrase');
            }}
          />
        ) : (
          <CButton
            value={t('generateAWallet')}
            onPress={() => generatePrivacyKey()}
          />
        )}
      </View>
    </>
  );
}
