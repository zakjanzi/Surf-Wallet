import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {View,ScrollView, Image, TouchableOpacity, Text, BackHandler} from 'react-native';
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
import SeedPhrase from '../SeedPhrase';
import SeedPhrase2 from '../SeedPhrase2';
import { useDispatch } from "react-redux";

import { mnemonic, generateWallet, wallet } from '../../utils/bip39.js';





export default function GenerateWallet({navigation}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const state = useSelector(state => state.wallet);
  // console.log('=======state====', state?.publicKey)
  const dispatch = useDispatch();

  let interval;

  const [privateKeyLoading, setprivateKeyLoading] = useState(false);
  const [privateKeyGenerate, setprivateKeyGenerate] = useState(false);
  const [privateKey, setprivateKey] = useState('');
  const [privateKeyProgress, setprivateKeyProgress] = useState(0);
  const [seedPhrase, setseedPhrase] = useState(false);
  const [seedPhraseLoad, setseedPhraseLoad] = useState(false);
  const [seedPhrase2, setseedPhrase2] = useState(false);
  const [copyValue, setCopyValue] = useState('')

  const [copied, setcopied] = useState(false);
  const [phrase, setphrase] = useState(false);
  const [Paste, setPaste] = useState(false);



  //loading of privacy key
  const generatePrivacyKey =  async () => {
    setprivateKeyGenerate(true);
    setprivateKeyProgress(0.2)
    const wallet = await generateWallet(dispatch);
    setprivateKeyProgress(0.5)
    // interval = setInterval(() => {
      // console.log('This will run every second!');
    //   setprivateKeyProgress(progress => {
    //     if(progress == 1 ) return 1
    //     if (progress == 0) {
    //       return 0.2;
    //     } else if (progress == 0.2) {
    //       return 0.5;
    //     } else if (progress == 0.5) {
    //       return 0.6;
    //     } else if (progress == 0.6) {
    //       return 1;
    //     }
    //   });
    // }, 1000);
    setTimeout(() => {
      setprivateKeyProgress(0.8)
    }, 500);
   
    console.log(wallet)
    setTimeout(() => {
      setprivateKey(wallet?.masterSeed);
      clearInterval(interval);
      setprivateKeyProgress(1)
    }, 1000);
  };

  enableAnimateInEaseOut();

  const backPress = () => {
    if (seedPhrase2) {
      setseedPhrase(true);
      setseedPhrase2(false);
      setcopied(false);
      setPaste(false);
      setphrase(false);
    } else if (seedPhrase) {
      setseedPhrase(false);
    } else {
      navigation.goBack();
    }
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backPress,
    );

    return () => backHandler.remove();
  }, [seedPhrase, seedPhrase2]);

  return (
    <>
      <CHeader
        title={
          seedPhrase || seedPhrase2 ? t('seedPhrase') : t('generateWallet')
        }
        backBtn
        onBackPress={() => {
          // navigation.goBack();
          // backPress();

          if (seedPhrase2) {
            setseedPhrase(true);
            setseedPhrase2(false);
            setcopied(false);
            setPaste(false);
            setphrase(false);
          } else if (seedPhrase) {
            setseedPhrase(false);
          } else {
            navigation.goBack();
          }
        }}
      />

      {seedPhrase ? (
        <SeedPhrase
          navigation={navigation}
          setcopied={val => {
            setcopied(val);
          }}
          setCopyText={val => {
            setCopyValue(val)
          }}
          load={seedPhraseLoad}
        />
      ) : seedPhrase2 ? (
        <SeedPhrase2
          navigation={navigation}
          copyValue={copyValue}
          setPhrase={val => {
            setphrase(val);
          }}
          setPaste={val => {
            setPaste(val);
          }}
        />
      ) : (
        <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
          <ScrollView
            style={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            <View style={{paddingBottom: 25, margin: 16}}>
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
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
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
                          //where to log the private key
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
                            source={Images.copy}
                            style={{height: 18, width: 18}}
                            resizeMode="contain"
                            tintColor={BaseColor.inputBottomLine}
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
        </View>
      )}
      <View
        style={{
          padding: 16,
          backgroundColor: BaseColor.primaryBG,
          // backgroundColor: 'red',
        }}>
        {privateKey ? (
          <CButton
            value={t('continue')}
            disable={(seedPhrase && !copied) || (seedPhrase2 && !Paste)}
            onPress={() => {
              // navigation.navigate('SeedPhrase');
              if (seedPhrase == true) {
                setseedPhrase2(true);
                setseedPhrase(false);
              } else if (seedPhrase2 == true) {
                navigation.navigate('AccountInformation');
              } else {
                setseedPhrase(true);
                setTimeout(() => {
                  setseedPhraseLoad(true);
                }, 5000);
              }
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