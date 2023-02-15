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
import {FontFamily} from '../../config/typography';
import Modal from 'react-native-modal';
import SeedPhrase2 from '../SeedPhrase2';

export default function SeedPhrase({navigation, load, setcopied = () => {}}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  let interval;

  const [privateKeyLoading, setprivateKeyLoading] = useState(false);
  const [privateKeyGenerate, setprivateKeyGenerate] = useState(false);
  const [privateKey, setprivateKey] = useState('0xrYCbftL0GpLnuYigpsUtrlq');

  const [phrase, setphrase] = useState('');
  const [phraseArr, setphraseArr] = useState([]);
  const [phraseProgess, setphraseProgess] = useState(0);

  const [seedPhrase2, setseedPhrase2] = useState(false);

  const [phraseModal, setphraseModal] = useState(false);

  // loading for privacy key generate
  const generatePhrase = () => {
    console.log('🚀 ~ file: index.js ~ line 48 ~ generatePhrase ~ load', load);
    if (load) {
      setTimeout(() => {
        let tempPhrase =
          'book man test word wallet short eyes apply pencil door floor tall';
        setphrase(tempPhrase);
        setphraseArr(tempPhrase.split(' '));
        console.log(
          "🚀 ~ file: index.js ~ line 58 ~ setTimeout ~ tempPhrase.split(' ')",
          tempPhrase.split(' '),
        );

        clearInterval(interval);
      }, 500);
    } else {
      interval = setInterval(() => {
        console.log('This will run every second!');
        setphraseProgess(progress => {
          if (progress == 0) {
            return 0.1;
          } else if (progress == 0.1) {
            return 0.3;
          } else if (progress == 0.3) {
            return 0.8;
          } else if (progress == 0.8) {
            return 1;
          }
        });
      }, 1000);

      setTimeout(() => {
        let tempPhrase =
          'book man test word wallet short eyes apply pencil door floor tall';
        setphrase(tempPhrase);
        setphraseArr(tempPhrase.split(' '));
        console.log(
          "🚀 ~ file: index.js ~ line 58 ~ setTimeout ~ tempPhrase.split(' ')",
          tempPhrase.split(' '),
        );

        clearInterval(interval);
      }, 5000);
    }
  };

  useEffect(() => {
    generatePhrase();
  }, []);

  enableAnimateInEaseOut();

  return (
    <>
      {/* <CHeader
        title={t('seedPhrase')}
        backBtn
        onBackPress={() => {
          navigation.goBack();
        }}
      /> */}
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        <ScrollView style={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
          <View
            style={[
              styles.privateKeyCont,
              {backgroundColor: BaseColor.langUNSBtnBack},
            ]}>
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
                  source={Images.copy}
                  style={{height: 18, width: 18}}
                  resizeMode="contain"
                  tintColor={BaseColor.inputBottomLine}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{padding: 16}}>
            <CText
              value={t('seedPhrase') + ' :'}
              style={{
                color: BaseColor.text1,
                fontSize: 14,
                marginTop: 32,
              }}
            />
            {!phrase ? (
              <View style={{marginTop: 32}}>
                <View style={{padding: 64, paddingBottom: 24}}>
                  <ProgressBar
                    progress={phraseProgess}
                    width={null}
                    borderWidth={0}
                    unfilledColor={BaseColor.unProgressBack}
                    color={BaseColor.onBoardTitle}
                  />
                </View>

                <CText
                  value={t('extractingSeedPhrase')}
                  style={{
                    color: BaseColor.text2,
                    fontSize: 14,
                    marginTop: 32,
                    textAlign: 'center',
                  }}
                />
              </View>
            ) : (
              <View>
                <FlatList
                  keyExtractor={(item, index) => index}
                  data={phraseArr}
                  numColumns={4}
                  contentContainerStyle={{marginTop: 16}}
                  renderItem={({item, index}) => {
                    return (
                      <CText
                        value={item}
                        medium
                        style={{
                          color: BaseColor.text1,
                          fontSize: 14,
                          // width: Dime,
                          width: '25%',
                          textAlign: 'center',
                          padding: 8,
                          marginTop: 16,
                        }}
                      />
                    );
                  }}
                />
                <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                    marginTop: 36,
                    padding: 16,
                    borderWidth: 1,
                    borderColor: BaseColor.inputBorder,
                    borderRadius: 4,
                    paddingHorizontal: 24,
                  }}
                  onPress={() => {
                    setcopied(true);
                    Clipboard.setString(phrase);
                    Toast.show(t('copied'));
                  }}>
                  <CText
                    value={t('copy')}
                    semiBold
                    style={{
                      color: BaseColor.text1,
                      fontSize: 14,
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
        <View style={{padding: 16, paddingBottom: 0}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16,
            }}>
            <Image
              style={{height: 14, width: 14}}
              source={dark ? Images.mini_info_dark : Images.mini_info_light}
              resizeMode="contain"
            />
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                marginStart: 8,
              }}>
              <CText
                value={t('whatIsA')}
                style={{
                  color: BaseColor.text2,
                  fontSize: 12,
                }}
              />
              <Text>{` `}</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setphraseModal(true);
                }}>
                <CText
                  value={t('seedPhrase')}
                  style={{
                    color: BaseColor.onBoardTitle,
                    fontSize: 12,
                  }}
                />
              </TouchableOpacity>
              <Text>{` `}</Text>
              <CText
                value={t('andWhy')}
                style={{
                  color: BaseColor.text2,
                  fontSize: 12,
                }}
              />
            </View>
          </View>
          {/* <CButton
              value={t('continue')}
              disable={!copied}
              onPress={() => {
                // navigation.navigate('SeedPhrase2');
                setseedPhrase2(true);
              }}
            /> */}
        </View>
      </View>

      {/* phrase detail modal */}
      <Modal
        style={{margin: 0}}
        isVisible={phraseModal}
        // hideModalContentWhileAnimating={true}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}
        animationInTiming={1000}
        animationOutTiming={1000}
        useNativeDriverForBackdrop={true}
        onBackdropPress={() => setphraseModal(false)}>
        <View
          // activeOpacity={1}
          // onPress={() => setphraseModal(false)}
          style={[styles.modalCont]}>
          <View
            style={[styles.bottomCont, {backgroundColor: BaseColor.primaryBG}]}>
            <CText
              value={t('seedPhrase')}
              semiBold
              style={{color: BaseColor.text1, fontSize: 18}}
            />
            <Text
              style={{
                color: BaseColor.text2,
                fontSize: 14,
                fontFamily: FontFamily.Inter_Regular,
              }}>
              {t('seedIsPrivateKey1') + ' '}
              <Text
                style={{
                  color: BaseColor.onBoardTitle,
                  fontSize: 14,
                  fontFamily: FontFamily.Inter_Regular,
                }}>
                {t('seedPhrase')}
              </Text>
              {' ' + t('seedIsPrivateKey2')}
            </Text>
            <CText
              value={t('seedIsPrivateKey3')}
              style={{color: BaseColor.text2, fontSize: 14, marginTop: 24}}
            />
            <View
              style={{
                backgroundColor: BaseColor.langUNSBtnBack,
                borderRadius: 6,
                padding: 24,
                marginVertical: 48,
              }}>
              <CText
                value={t('ifLoseSeedPrase')}
                medium
                style={{
                  color: BaseColor.text1,
                  fontSize: 14,
                  textAlign: 'center',
                }}
              />
              <Image
                source={dark ? Images.mini_info_dark : Images.mini_info_light}
                style={{
                  height: 14,
                  width: 14,
                  position: 'absolute',
                  top: -7,
                  alignSelf: 'center',
                }}
              />
            </View>
            <CButton value={t('gotIt')} onPress={() => setphraseModal(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
}
