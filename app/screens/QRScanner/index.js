import {t} from 'i18next';
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
  FlatList,
  StatusBar,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import {DarkColor, LightColor} from '../../config/colors';
import styles from './styles';
import Modal from 'react-native-modal';
import {Images} from '../../config/images';
import CButton from '../../components/CButton';

export default function QRScanner({navigation}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const [profileDetails, setprofileDetails] = useState(true);

  return (
    <>
      {/* <CHeader
      title={t('sendReceive')}
      // backBtn
      // onBackPress={() => {
      //   navigation.goBack();
      // }}
      style={{backgroundColor: '#0000'}}
    /> */}
      <View
        style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}></View>
      <Modal
        style={{margin: 0}}
        isVisible={profileDetails}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}
        animationInTiming={1000}
        animationOutTiming={1000}
        useNativeDriverForBackdrop={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <View style={{padding: 16, backgroundColor: BaseColor.primaryBG}}>
            <View
              style={[
                styles.tollerBar,
                {backgroundColor: BaseColor.unselectedBottomTabIcon},
              ]}
            />
            <CText
              value={t('qrCode')}
              bold
              style={{
                fontSize: 20,
                color: BaseColor.text1,
                textAlign: 'center',
                marginTop: 16,
              }}
            />
            <View style={[styles.rowStyle, {marginTop: 16}]}>
              <Image
                source={Images.avatar2}
                style={{
                  height: 42,
                  width: 42,
                }}
                resizeMode="contain"
              />
              <CText
                value={'@Joey B.'}
                semiBold
                style={{
                  fontSize: 14,
                  color: BaseColor.text1,
                  marginStart: 16,
                }}
              />
            </View>
            <View
              style={[
                styles.cardCont,
                {backgroundColor: BaseColor.whiteColor},
              ]}>
              <CText
                value={'0xSqGSIb3DQB46fdjY'}
                style={{
                  fontSize: 14,
                  color: BaseColor.text1,
                  flex: 1,
                }}
              />
              <Image
                source={Images.copy}
                style={{
                  height: 16,
                  width: 16,
                }}
                resizeMode="contain"
                tintColor={BaseColor.inputBottomLine}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.rowStyle, {marginTop: 16}]}>
              <Image
                source={
                  dark ? Images.add_contact_dark : Images.add_contact_light
                }
                resizeMode="contain"
                style={{
                  height: 16,
                  width: 16,
                }}
              />

              <CText
                value={t('addToContact')}
                style={{
                  fontSize: 14,
                  color: BaseColor.inputBottomLine,
                  marginStart: 8,
                }}
              />
            </TouchableOpacity>
            <CButton
              value={t('send')}
              containerStyle={{marginTop: 64}}
              onPress={() => {
                navigation.navigate('ConfirmAmount');
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
