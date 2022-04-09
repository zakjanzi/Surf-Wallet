import {t} from 'i18next';
import {isEmpty} from 'lodash';
import React, {useRef, useState} from 'react';
import {View, ScrollView, Image, TouchableOpacity, Text} from 'react-native';
import {useSelector} from 'react-redux';
import CButton from '../../components/CButton';
import CHeader from '../../components/CHeader';
import CInput from '../../components/CInput';
import CText from '../../components/CText';
import {DarkColor, LightColor} from '../../config/colors';
import {Images} from '../../config/images';
import styles from './styles';

export default function GeneratePassword({navigation}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const [isPassValid, setisPassValid] = useState(false);
  const [isConfPassValid, setisConfPassValid] = useState(false);

  return (
    <>
      <CHeader
        title={t('createPassword')}
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
            value={t('createPassword')}
            semiBold
            style={{
              color: BaseColor.text1,
              fontSize: 16,
            }}
          />

          <CInput
            ref={passwordRef}
            value={password}
            onChangeText={val => {
              setpassword(val);

              //Validate Password
              if (val.length < 8) {
                setisPassValid(false);
              } else {
                setisPassValid(true);
              }
            }}
            placeholder={t('passwordPH')}
            style={{marginTop: 22}}
            secureTextEntry
            onSubmitEditing={() => {
              confirmPasswordRef?.current?.focus();
            }}
            returnKeyType="next"
            leftIcon={
              !isEmpty(password)
                ? isPassValid
                  ? dark
                    ? Images.valid_tick_dark
                    : Images.valid_tick_light
                  : Images.invalid_tick_light
                : false
            }
            error={!isPassValid}
            autoFocus
          />

          <CInput
            ref={confirmPasswordRef}
            value={confirmPassword}
            onChangeText={val => {
              setconfirmPassword(val.trim());

              //Validate Password
              if (val.length < 8 || password != val) {
                setisConfPassValid(false);
              } else {
                setisConfPassValid(true);
              }
            }}
            placeholder={t('confirmPasswordPH')}
            style={{marginTop: 16}}
            secureTextEntry
            returnKeyType="done"
            leftIcon={
              !isEmpty(confirmPassword)
                ? isConfPassValid
                  ? dark
                    ? Images.valid_tick_dark
                    : Images.valid_tick_light
                  : Images.invalid_tick_light
                : false
            }
            error={!isConfPassValid}
          />

          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 32}}>
            <Image
              source={dark ? Images.info_dark : Images.info_light}
              resizeMode="contain"
              style={{
                height: 18,
                width: 18,
                marginEnd: 16,
              }}
            />

            <CText
              value={t('strongPassword')}
              medium
              style={{
                color: BaseColor.text2,
                fontSize: 12,
              }}
            />
          </View>
        </ScrollView>
        <CButton
          value={t('next')}
          disable={isPassValid && isConfPassValid ? false : true}
          onPress={() => {
            navigation.navigate('GenerateWallet');
          }}
        />
      </View>
    </>
  );
}
