import {t} from 'i18next';
import React, {useState} from 'react';
import {
  Image,
  TextInput,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import CButton from '../../components/CButton';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import {DarkColor, LightColor} from '../../config/colors';
import {Images} from '../../config/images';
import styles from './styles';

export default function PaymentSuccess({navigation}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const itemData = {
    profilePic: Images.avatar_1,
    profileName: 'Ahmed A.',
    rating: 4,
    place: 'Ras Beirut',
    place_icon: Images.lebanon_flag,
    priceRange: '$100 - $1,000',
    item_icon: Images.bitcoin,
    itemKey: 'BTC',
    price: '63,457.27',
    rate: 'Market rate',
    type: 'buy',
  };

  const paymentDetails = {
    send: false,
    date: '30 August, 2022 1:45 PM',
    price: '343.82',
    nativeValue: '0.0060',
  };

  return (
    <>
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        <View style={{justifyContent: 'space-around', flex: 1}}>
          <View style={{alignItems: 'center'}}>
            <CText
              value={t('youRecevied')}
              style={{
                fontSize: 16,
                color: BaseColor.text1,
              }}
              semiBold
            />

            <CText
              value={'$30.40'}
              style={{
                fontSize: 48,
                color: BaseColor.inputBottomLine,
              }}
              semiBold
            />

            <CText
              value={'0.000000012 BTC'}
              style={{
                fontSize: 16,
                color: BaseColor.text2,
              }}
              semiBold
            />

            <CText
              value={t('fromWalletAddress')}
              style={{
                fontSize: 12,
                color: BaseColor.text2,
                marginTop: 64,
              }}
              semiBold
            />
            <CText
              value={`0xtq8bfdSvsG5hsd8as94Ljf`}
              style={{
                fontSize: 16,
                color: BaseColor.text1,
              }}
              semiBold
            />
            <CText
              value={t('noteThanks')}
              style={{
                fontSize: 12,
                color: BaseColor.text2,
              }}
              semiBold
            />
          </View>

          <View style={{paddingHorizontal: '12%', marginTop: 64}}>
            <CButton
              value={t('reviewPayment')}
              bordered
              onPress={() => {
                navigation.navigate('TransactionDetails', {
                  transactionDetails: paymentDetails,
                  itemDetails: itemData,
                });
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
}
