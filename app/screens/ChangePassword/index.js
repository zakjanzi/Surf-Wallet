import {t} from 'i18next';
import React, {useState} from 'react';
import {View, ScrollView, Image, TouchableOpacity, Text} from 'react-native';
import {useSelector} from 'react-redux';
import CButton from '../../components/CButton';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import {DarkColor, LightColor} from '../../config/colors';
import {enableAnimateInEaseOut} from '../../config/commonFunctions';
import {Images} from '../../config/images';
import {FontFamily} from '../../config/typography';
import styles from './styles';

export default function ChangePassword({navigation}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const [request, setrequest] = useState(false);

  enableAnimateInEaseOut();

  return (
    <>
      <CHeader
        title={t('changePassword')}
        backBtn
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <CText
            value={request ? t('instructionsSent') : t('passwordReset')}
            medium
            style={{color: BaseColor.text1, fontSize: 14}}
          />
          {request ? (
            <CText
              value={t('checkEmail')}
              medium
              style={{color: BaseColor.text2, fontSize: 14}}
            />
          ) : (
            <Text
              style={{
                color: BaseColor.text2,
                fontSize: 12,
                fontFamily: FontFamily.Inter_Regular,
                marginTop: 12,
              }}>
              {`${t('resetInfo1')} `}
              <Text
                style={{
                  color: BaseColor.text1,
                  fontSize: 12,
                  fontFamily: FontFamily.Inter_Regular,
                }}>{`switfbaza85@gmail.com. `}</Text>{' '}
              {`${t('resetInfo2')}`}
            </Text>
          )}
          {request ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={Images.paper} style={{height: 200, width: 200}} />
            </View>
          ) : null}
        </ScrollView>
        {request ? (
          <CButton value={t('done')} onPress={() => {}} />
        ) : (
          <CButton
            value={t('requestPasswordChange')}
            onPress={() => {
              setrequest(true);
            }}
          />
        )}
      </View>
    </>
  );
}
