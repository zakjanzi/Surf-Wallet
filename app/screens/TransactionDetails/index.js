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
  Modal,
  Linking,
} from 'react-native';
import {useSelector} from 'react-redux';
import CButton from '../../components/CButton';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import {DarkColor, LightColor} from '../../config/colors';
import styles from './styles';

export default function TransactionDetails({navigation, route}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const transactionDetails = route?.params?.transactionDetails;
  console.log(
    '🚀 ~ file: index.js ~ line 24 ~ TransactionDetails ~ transactionDetails',
    transactionDetails,
  );
  const itemDetails = route?.params?.itemDetails;
  console.log(
    '🚀 ~ file: index.js ~ line 24 ~ TransactionDetails ~ itemDetails',
    itemDetails,
  );

  const moreDetails = {
    pricePerCoin: '44,0470.22',
    confirmation: '345',
    fee: '$0.25 (0.00000001 BTC)',
    to: '0xtiPFlajY82mNuyz9sfgbt',
    date: '30 August, 2022 1:45 PM',
    note: 'Thank you!',
    status: 'Pending',
  };

  return (
    <>
      <CHeader
        title={`${itemDetails?.title} ${
          transactionDetails?.send == true ? t('sent') : t('received')
        }`}
        backBtn
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        <View style={{alignItems: 'center'}}>
          <CText
            value={`${transactionDetails?.sent ? '-' : '+'}$${
              transactionDetails?.price
            }`}
            style={{fontSize: 24, color: BaseColor.fontHighContrast}}
          />
          <CText
            value={`${transactionDetails?.sent ? '-' : '+'}${
              transactionDetails?.nativeValue
            } ${itemDetails?.key}`}
            medium
            style={{fontSize: 14, color: BaseColor.fontHighContrast}}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: 2,
            backgroundColor: BaseColor.divider2,
            marginVertical: 24,
          }}
        />
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.rowStyle}>
            <CText
              value={t('pricePerCoin')}
              style={{
                color: BaseColor.text2,
                fontSize: 14,
              }}
            />
            <CText
              value={moreDetails.pricePerCoin}
              style={{
                color: BaseColor.portTitle,
                fontSize: 14,
              }}
            />
          </View>
          <View style={styles.rowStyle}>
            <CText
              value={t('confirmation')}
              style={{
                color: BaseColor.text2,
                fontSize: 14,
              }}
            />
            <CText
              value={moreDetails.confirmation}
              style={{
                color: BaseColor.portTitle,
                fontSize: 14,
              }}
            />
          </View>
          <View style={styles.rowStyle}>
            <CText
              value={t('fee')}
              style={{
                color: BaseColor.text2,
                fontSize: 14,
              }}
            />
            <CText
              value={moreDetails.fee}
              style={{
                color: BaseColor.portTitle,
                fontSize: 14,
              }}
            />
          </View>
          <View style={styles.rowStyle}>
            <CText
              value={t('to')}
              style={{
                color: BaseColor.text2,
                fontSize: 14,
              }}
            />
            <CText
              value={moreDetails.to}
              style={{
                color: BaseColor.portTitle,
                fontSize: 14,
              }}
            />
          </View>
          <View style={styles.rowStyle}>
            <CText
              value={t('date')}
              style={{
                color: BaseColor.text2,
                fontSize: 14,
              }}
            />
            <CText
              value={moreDetails.date}
              style={{
                color: BaseColor.portTitle,
                fontSize: 14,
              }}
            />
          </View>
          <View style={styles.rowStyle}>
            <CText
              value={t('note')}
              style={{
                color: BaseColor.text2,
                fontSize: 14,
              }}
            />
            <CText
              value={moreDetails.note}
              style={{
                color: BaseColor.portTitle,
                fontSize: 14,
              }}
            />
          </View>
          <View style={styles.rowStyle}>
            <CText
              value={t('status')}
              style={{
                color: BaseColor.text2,
                fontSize: 14,
              }}
            />
            <CText
              value={moreDetails.status}
              style={{
                color: BaseColor.portTitle,
                fontSize: 14,
              }}
            />
          </View>
        </ScrollView>
        <CButton
          value={t('blockExplorer')}
          onPress={() => {
            Linking.openURL('https://www.google.com/');
          }}
        />
      </View>
    </>
  );
}
