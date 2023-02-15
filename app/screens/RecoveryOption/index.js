import {t} from 'i18next';
import {isEmpty} from 'lodash';
import React, {isValidElement, useRef, useState} from 'react';
import {View, ScrollView, Image, TouchableOpacity, Text} from 'react-native';
import {useSelector} from 'react-redux';
import CButton from '../../components/CButton';
import CHeader from '../../components/CHeader';
import CInput from '../../components/CInput';
import CText from '../../components/CText';
import {DarkColor, LightColor} from '../../config/colors';
import {enableAnimateInEaseOut} from '../../config/commonFunctions';
import {Images} from '../../config/images';
import styles from './styles';

export default function RecoveryOption({navigation}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const emailRef = useRef();

  const [email, setemail] = useState('');
  const [isEmailValid, setisEmailValid] = useState(false);

  const pTips = [t('pTip1'), t('pTip2'), t('pTip3')];

  const ValidateEmail = val => {
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (isEmpty(val) || !emailReg.test(val)) {
      setisEmailValid(false);
    } else {
      setisEmailValid(true);
    }
  };

  enableAnimateInEaseOut();

  return (
    <>
      <CHeader
        title={t('recoveryOption')}
        backBtn
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <CText
            value={t('enterEmail')}
            semiBold
            style={{
              color: BaseColor.text1,
              fontSize: 16,
            }}
          />
          <CText
            value={t('recoverForgotPin')}
            style={{
              color: BaseColor.text2,
              fontSize: 12,
            }}
          />

          <CInput
            ref={emailRef}
            value={email}
            onChangeText={val => {
              setemail(val.trim());

              //Validate Email
              ValidateEmail(val);
            }}
            placeholder={t('emailPH')}
            leftIcon={
              !isEmpty(email)
                ? isEmailValid
                  ? dark
                    ? Images.valid_tick_dark
                    : Images.valid_tick_light
                  : Images.invalid_tick_light
                : false
            }
            keyboardType="email-address"
            style={{marginTop: 22}}
            error={!isEmailValid}
            autoFocus
          />

          {emailRef?.current?.isFocused() && (
            <View>
              <CText
                value={t('privacyTips')}
                medium
                style={{
                  color: BaseColor.text2,
                  fontSize: 12,
                  marginTop: 16,
                }}
              />
              <View style={{marginTop: 8}}>
                {pTips.map((item, index) => {
                  return (
                    <View
                      style={{flexDirection: 'row', alignItems: 'center'}}
                      key={index}>
                      <View
                        style={[
                          styles.dot,
                          {backgroundColor: BaseColor.inputBottomLine},
                        ]}
                      />
                      <CText
                        value={item}
                        medium
                        style={{
                          color: BaseColor.text2,
                          fontSize: 12,
                        }}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          )}
        </ScrollView>
        <CButton
          value={t('continue')}
          disable={!isEmailValid}
          onPress={() => {
            navigation.navigate('GeneratePassword');
          }}
        />
      </View>
    </>
  );
}
