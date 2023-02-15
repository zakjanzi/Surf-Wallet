import {t} from 'i18next';
import React, {useState} from 'react';
import {Image, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import {DarkColor, LightColor} from '../../config/colors';
import styles from './styles';
import {isEmpty} from 'lodash';
import CButton from '../../components/CButton';

export default function AmountScreen({navigation, route}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const itemData = route?.params?.itemData;
  const balance = 50;

  const [amountValue, setamountValue] = useState('');
  const [amount, setamount] = useState('');

  return (
    <>
      <CHeader
        title={t('amount')}
        backBtn
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        <View style={{flex: 1}}>
          <View style={{alignItems: 'center'}}>
            <CText
              value={`${t('balance')}: $${balance}`}
              style={{fontSize: 16, color: BaseColor.text1}}
              semiBold
            />
            <CText
              value={`0.00365 ${itemData?.key}`}
              style={{fontSize: 12, color: BaseColor.text2}}
              semiBold
            />
          </View>

          <View style={[styles.middleRowStyle]}>
            <View
              style={[
                styles.maxCont,
                {backgroundColor: BaseColor.inputBottomLine},
              ]}>
              <CText
                value={t('max')}
                semiBold
                style={{
                  fontSize: 10,
                  color: BaseColor.strokeGrey,
                }}
              />
            </View>
            <View style={[styles.inputCont]}>
              <TextInput
                placeholder="0.00"
                placeholderTextColor={BaseColor.placeholderInput}
                style={[
                  styles.textInputStyle,
                  {color: BaseColor.inputBottomLine},
                ]}
                keyboardType="decimal-pad"
                textAlign="center"
                value={amountValue}
                onChangeText={val => {
                  const formattedValue = (
                    Number(val.replace(/\D/g, '')) || ''
                  ).toLocaleString();
                  if (isEmpty(formattedValue)) {
                    setamountformattedValueue(formattedValue);
                    setamount(formattedValue);
                  } else {
                    const text = formattedValue.split('$').join('');
                    setamount(text);
                    setamountValue('$' + text.trim());
                  }
                }}
                autoFocus
              />
              <CText
                value={`0.00365 ${itemData?.key}`}
                style={{
                  fontSize: 15,
                  color: BaseColor.grey70,
                  textAlign: 'center',
                }}
                semiBold
              />
            </View>
            <View>
              <Image
                source={itemData.image}
                style={{height: 40, width: 40}}
                resizeMode="contain"
              />
              <CText
                value={`${itemData?.key}`}
                style={{
                  fontSize: 10,
                  color: BaseColor.text1,
                  textAlign: 'center',
                  marginTop: 8,
                }}
                semiBold
              />
            </View>
          </View>
        </View>

        <CButton
          value={t('continue')}
          onPress={() => {
            navigation.navigate('SendTo');
          }}
        />
      </View>
    </>
  );
}
