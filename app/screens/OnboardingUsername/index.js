import {t} from 'i18next';
import {isEmpty} from 'lodash';
import React, {useRef, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import {DarkColor, LightColor} from '../../config/colors';
import {
  enableAnimateInEaseOut,
  enableAnimateLinear,
} from '../../config/commonFunctions';
import styles from './styles';
import SwitchSelector from 'react-native-switch-selector';
import CButton from '../../components/CButton';

export default function OnboardingUsername({navigation}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const [username, setusername] = useState('');
  const [privacy, setprivacy] = useState('public');
  const [available, setavailable] = useState(false);

  const usernameRef = useRef();

  const options = [
    {label: t('public'), value: 'public'},
    {label: t('private'), value: 'private'},
  ];

  enableAnimateInEaseOut();

  return (
    <>
      <CHeader
        backBtn
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <CText
            value={t('pickUsername')}
            semiBold
            style={{
              color: BaseColor.text1,
              fontSize: 16,
            }}
          />
          <CText
            value={t('userThisIsHow')}
            style={{
              color: BaseColor.text2,
              fontSize: 12,
            }}
          />
          <View
            style={[
              styles.inputCont,
              {
                borderBottomColor: !isEmpty(username)
                  ? !available
                    ? BaseColor.notavailableName
                    : usernameRef?.current?.isFocused()
                    ? BaseColor.inputBottomLine
                    : BaseColor.placeholderInput
                  : BaseColor.placeholderInput,
              },
            ]}>
            {!isEmpty(username) && (
              <Text style={[styles.leftIcon, {color: BaseColor.inputColor}]}>
                @
              </Text>
            )}
            <TextInput
              ref={usernameRef}
              value={username}
              onChangeText={val => {
                setusername(val.trim());

                //check if username Available or not
                if (val.trim().length >= 4) {
                  if (val.trim() == 'username' || isEmpty(val)) {
                    setavailable(false);
                  } else {
                    setavailable(true);
                  }
                } else {
                  setavailable(false);
                }
              }}
              placeholder={t('usernamePL')}
              placeholderTextColor={BaseColor.placeholderInput}
              style={[
                styles.txtInput,
                {
                  color: BaseColor.inputColor,
                },
              ]}
            />

            <CText
              value={
                !isEmpty(username)
                  ? available
                    ? t('available')
                    : t('notAvailable')
                  : ''
              }
              style={[
                styles.righttxt,
                {
                  color:
                    username != 'username' && available
                      ? BaseColor.availableName
                      : BaseColor.notavailableName,
                },
              ]}
            />
          </View>
          {!isEmpty(username) && username.length < 4 && (
            <CText
              value={t('usernameError')}
              style={[
                styles.errorTxt,
                {
                  color: BaseColor.notavailableName,
                },
              ]}
            />
          )}
          <CText
            value={t('setPrivacy')}
            semiBold
            style={{
              color: BaseColor.text1,
              fontSize: 16,
              marginTop: 28,
            }}
          />
          <View style={{width: '40%', marginTop: 16}}>
            <SwitchSelector
              options={options}
              initial={0}
              onPress={value => {
                setprivacy(value);
              }}
              selectedColor={BaseColor.privacySelClr}
              textColor={BaseColor.privacyUnSelClr}
              buttonColor={BaseColor.selectedPrivacyback}
              backgroundColor={BaseColor.unselectedPrivacyback}
              textStyle={styles.txtStyle}
              fontSize={12}
              borderColor={BaseColor.unselectedPrivacyback}
              hasPadding={true}
            />
          </View>
          <CText
            value={
              privacy == 'public'
                ? t('searchableUsername')
                : t('notSearchableUsername')
            }
            medium
            style={{
              color: BaseColor.privacyUnSelClr,
              fontSize: 12,
              marginTop: 28,
            }}
          />
        </ScrollView>
        <CButton
          value={t('next')}
          disable={!available}
          onPress={() => {
            navigation.navigate('SecurityScreen');
          }}
        />
      </View>
    </>
  );
}
