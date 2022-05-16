import {t} from 'i18next';
import React, {useState} from 'react';
import {View, ScrollView, Image, TouchableOpacity, Text} from 'react-native';
import {useSelector} from 'react-redux';
import CHeader from '../../components/CHeader';
import {DarkColor, LightColor} from '../../config/colors';
import styles from './styles';
import CButton from '../../components/CButton';
import Modal from 'react-native-modal';
import {Images} from '../../config/images';
import CText from '../../components/CText';
import {useFocusEffect} from '@react-navigation/native';
import SwitchSelector from 'react-native-switch-selector';

export default function SendReceive({navigation}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const [receiveModal, setreceiveModal] = useState(false);

  const [qrtab, setqrtab] = useState('address');

  //header data
  const options = [
    {label: t('address'), value: 'address'},
    {label: t('username'), value: 'username'},
  ];

  return (
    <>
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        {/* <CHeader
            title={t('sendReceive')}
            // backBtn
            // onBackPress={() => {
            //   navigation.goBack();
            // }}
            style={{backgroundColor: '#0000'}}
          /> */}
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              padding: 16,
              backgroundColor: BaseColor.primaryBG,
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 48,
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate('SelectAsset');
              }}>
              <Image
                source={dark ? Images.modal_send_dark : Images.modal_send_light}
                style={{
                  height: 72,
                  width: 72,
                }}
                resizeMode="contain"
              />
              <CText
                value={t('send')}
                style={{
                  fontSize: 14,
                  color: BaseColor.langUNSTxtBack,
                  marginTop: 12,
                }}
                semiBold
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                // navigation.navigate('Contacts');
                setreceiveModal(true);
              }}>
              <Image
                source={
                  dark ? Images.modal_recieve_dark : Images.modal_recieve_light
                }
                style={{
                  height: 72,
                  width: 72,
                }}
                resizeMode="contain"
              />
              <CText
                value={t('receive')}
                style={{
                  fontSize: 14,
                  color: BaseColor.langUNSTxtBack,
                  marginTop: 12,
                }}
                semiBold
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        style={{margin: 0}}
        isVisible={receiveModal}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}
        animationInTiming={1000}
        animationOutTiming={1000}
        useNativeDriverForBackdrop={true}
        onBackdropPress={() => {
          setreceiveModal(false);
        }}
        onBackButtonPress={() => {
          setreceiveModal(false);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              padding: 16,
              backgroundColor: BaseColor.primaryBG,
              alignItems: 'center',
            }}>
            <View
              style={[
                styles.tollerBar,
                {backgroundColor: BaseColor.unselectedBottomTabIcon},
              ]}
            />
            <View
              style={{
                width: '50%',
                marginTop: 16,
              }}>
              <SwitchSelector
                options={options}
                initial={0}
                onPress={value => {
                  setqrtab(value);
                }}
                selectedColor={BaseColor.privacySelClr}
                textColor={BaseColor.text2}
                buttonColor={BaseColor.selectedPrivacyback}
                backgroundColor={BaseColor.unselectedPrivacyback}
                textStyle={styles.txtStyle}
                selectedTextStyle={styles.txtStyle}
                fontSize={12}
                borderColor={BaseColor.unselectedPrivacyback}
                hasPadding={true}
              />
            </View>

            {qrtab == 'address' ? (
              <View
                style={{
                  alignItems: 'center',
                }}>
                <View style={{marginTop: 48}}>
                  <Image
                    source={Images.qr_sample}
                    style={{height: 152, width: 152}}
                    resizeMode="contain"
                  />
                </View>
                <CText
                  value={t('scanAddress')}
                  semiBold
                  style={{
                    fontSize: 14,
                    color: BaseColor.text1,
                    marginTop: 8,
                  }}
                />
                <View
                  style={[styles.rowStyle, {marginTop: 32, marginBottom: 64}]}>
                  <View
                    style={[
                      styles.cardCont,
                      {backgroundColor: BaseColor.whiteColor},
                    ]}>
                    <CText
                      value={'0xtq8bfdv...94Ljf'}
                      style={{
                        fontSize: 14,
                        color: BaseColor.text1,
                      }}
                    />
                    <TouchableOpacity activeOpacity={0.7}>
                      <Image
                        source={Images.copy}
                        style={{
                          height: 16,
                          width: 16,
                          marginStart: 16,
                        }}
                        resizeMode="contain"
                        tintColor={BaseColor.inputBottomLine}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={[
                      styles.cardCont,
                      {backgroundColor: BaseColor.whiteColor, marginStart: 8},
                    ]}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        navigation.navigate('ReceviedPayment');
                      }}>
                      <Image
                        source={dark ? Images.share_dark : Images.share_light}
                        style={{
                          height: 16,
                          width: 16,
                        }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                }}>
                <View style={{marginTop: 48}}>
                  <Image
                    source={Images.avatar3}
                    style={{height: 54, width: 54}}
                    resizeMode="contain"
                  />
                </View>
                <CText
                  value={'@Joe B.'}
                  semiBold
                  style={{
                    fontSize: 20,
                    color: BaseColor.text1,
                    textAlign: 'center',
                    marginTop: 8,
                  }}
                />
                <View
                  style={[
                    styles.cardCont,
                    {
                      marginTop: 48,
                      backgroundColor: BaseColor.whiteColor,
                      marginBottom: 64,
                    },
                  ]}>
                  <Image
                    source={dark ? Images.share_dark : Images.share_light}
                    style={{
                      height: 22,
                      width: 22,
                    }}
                    resizeMode="contain"
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}
