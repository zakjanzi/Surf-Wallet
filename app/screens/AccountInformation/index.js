import {t} from 'i18next';
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import CButton from '../../components/CButton';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import {DarkColor, LightColor} from '../../config/colors';
import {enableAnimateInEaseOut} from '../../config/commonFunctions';
import {Images} from '../../config/images';
import styles from './styles';
import Clipboard from '@react-native-clipboard/clipboard';
import CCheckBox from '../../components/CCheckBox';
import {FontFamily} from '../../config/typography';
import Modal from 'react-native-modal';

export default function AccountInformation({navigation}) {
  const {pincode, wallet} = useSelector(state => state.wallet);
  // console.log("STATE : ", pincode)
  // console.log("wallet : ", wallet)
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const [agreed, setagreed] = useState(false);
  const [understood, setunderstood] = useState(false);

  const [passwordVisible, setpasswordVisible] = useState(false);
  const [expand, setexpand] = useState(false);

  const [phraseModal, setphraseModal] = useState(false);
  
  // ease out animation
  enableAnimateInEaseOut();

  return (
    <>
      <CHeader
        title={t('accountInformation')}
        backBtn
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <CText
            value={t('secureYourWalletSmall')}
            medium
            style={{color: BaseColor.text1, fontSize: 16}}
          />
          <View style={{marginTop: 12, marginEnd: 48}}>
            <Text
              style={{
                color: BaseColor.text2,
                fontSize: 12,
                fontFamily: FontFamily.Inter_Regular,
              }}>
              {t('surfWalletStaff1') + ' '}
              <Text
                onPress={() => setphraseModal(true)}
                style={{
                  color: BaseColor.onBoardTitle,
                  fontSize: 12,
                  fontFamily: FontFamily.Inter_Regular,
                }}>
                {t('seedPhrase')}
              </Text>
              {'. ' + t('surfWalletStaff2')}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={{marginTop: 48, flexDirection: 'row', alignItems: 'center'}}
            onPress={() => {
              setexpand(!expand);
            }}>
            <CText
              value={t('showAccountInfo')}
              semiBold
              style={{color: BaseColor.text1, fontSize: 16}}
            />
            <Image
              source={dark ? Images.down_arrow_dark : Images.down_arrow_light}
              style={{height: 14, width: 14, marginStart: 32}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {expand && (
            <View>
              <View
                style={[
                  styles.privacyCont,
                  {backgroundColor: BaseColor.langUNSBtnBack},
                ]}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{marginEnd: 16, flex: 1}}>
                    <CText
                      value={t('seedPhrase') + ' :'}
                      style={{color: BaseColor.text2, fontSize: 14}}
                    />
                    <CText
                      value={wallet?.mnemonic}
                      style={{color: BaseColor.text1, fontSize: 14}}
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
                <View
                  style={[styles.divider, {backgroundColor: BaseColor.text2}]}
                />
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginEnd: 16,
                      flex: 1,
                    }}>
                    <CText
                      value={t('password') + ' :'}
                      style={{color: BaseColor.text2, fontSize: 14}}
                    />
                    <CText
                      value={passwordVisible ? pincode : '********'}
                      style={{
                        color: BaseColor.text1,
                        fontSize: 14,
                        marginStart: 16,
                        marginTop: 4,
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setpasswordVisible(!passwordVisible)}>
                    <Image
                      source={dark ? Images.eye_dark : Images.eye_light}
                      style={{height: 18, width: 18}}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
        <View style={styles.rowStyle}>
          <CCheckBox
            checked={agreed}
            onPress={() => {
              setagreed(!agreed);
            }}
            size={20}
          />
          <CText
            value={t('agreedTS')}
            style={{
              color: BaseColor.text2,
              fontSize: 12,
              marginStart: 16,
              paddingEnd: 24,
            }}
          />
        </View>
        <View
          style={[
            {
              marginTop: 16,
              marginBottom: 48,
              flexDirection: 'row',
            },
          ]}>
          <CCheckBox
            checked={understood}
            onPress={() => {
              setunderstood(!understood);
            }}
            size={20}
          />
          <CText
            value={t('understandLosingAccess')}
            style={{
              color: BaseColor.text2,
              fontSize: 12,
              marginStart: 16,
              paddingEnd: 24,
            }}
          />
        </View>
        <CButton
          value={t('confirmNFinish')}
          disable={agreed && understood ? false : true}
          onPress={() => {
            navigation.navigate('HomeDrawerNavigator');
          }}
        />
      </View>

      {/* phrase details modal */}
      <Modal
        style={{flex: 1, margin: 0}}
        isVisible={phraseModal}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}
        animationInTiming={1000}
        animationOutTiming={1000}
        useNativeDriverForBackdrop={true}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setphraseModal(false)}
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
        </TouchableOpacity>
      </Modal>
    </>
  );
}