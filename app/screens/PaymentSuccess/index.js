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
        <Image
          source={Images.money_success}
          style={{
            height: 250,
            width: '100%',
          }}
          resizeMode="contain"
        />

        <CText
          value={t('youSent')}
          style={{
            fontSize: 20,
            color: BaseColor.text1,
            textAlign: 'center',
          }}
        />

        <CText
          value={'$35.5 (0.00560459 ETH)'}
          style={{
            fontSize: 20,
            color: BaseColor.text1,
            textAlign: 'center',
            marginTop: 32,
          }}
        />

        <CText
          value={'to @Joe_Asmar53'}
          medium
          style={{
            fontSize: 20,
            color: BaseColor.text1,
            textAlign: 'center',
            marginTop: 32,
          }}
        />

        <CText
          value={t('noteThanks')}
          medium
          style={{
            fontSize: 12,
            color: BaseColor.text2,
            textAlign: 'center',
            marginTop: 32,
          }}
        />

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
    </>
  );
}
