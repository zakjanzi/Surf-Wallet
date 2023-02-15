import {t} from 'i18next';
import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  LayoutAnimation,
  ScrollView,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import CHeader from '../../components/CHeader';
import OfferListItem from '../../components/OfferListItem';
import {DarkColor, LightColor} from '../../config/colors';
import {Images} from '../../config/images';
import styles from './styles';

export default function MyOffers({navigation}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const data = [
    {
      type: 'Selling',
      value: 'Limits 50,000- 1,000,000 LBP',
      place: 'Ras Beirut',
      key: 'BTC',
      icon: Images.bitcoin,
      price: '63,457.27 USD',
      rate: 6.47,
      place_flag: Images.lebanon_flag,
    },
    {
      type: 'Selling',
      value: '0.2349458 ETH',
      place: 'Ras Beirut',
      key: 'ETH',
      icon: Images.ethereum,
      price: '3,730.25 USD',
      rate: 6.47,
      place_flag: Images.lebanon_flag,
    },
    {
      type: 'Buying',
      value: '1,750 USDC',
      place: 'Jbeil',
      key: 'USDC',
      icon: Images.usd_image,
      price: '1 USD',
      rate: -1.5,
      place_flag: Images.lebanon_flag,
    },
  ];

  return (
    <>
      <CHeader
        title={t('myOffers')}
        backBtn
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => {
            console.log(
              '🚀 ~ file: index.js ~ line 87 ~ MyOffers ~ item',
              item,
            );

            return (
              <>
                <View>
                  <OfferListItem
                    type={item?.type}
                    value={item.value}
                    place={item?.place}
                    key={item?.key}
                    icon={item?.icon}
                    price={item?.price}
                    rate={item?.rate}
                    place_flag={item?.place_flag}
                  />
                  {index != data.length - 1 && (
                    <View
                      style={{
                        height: 2,
                        width: '96%',
                        backgroundColor: BaseColor.divider1,
                        alignSelf: 'center',
                        marginTop: 10,
                      }}
                    />
                  )}
                </View>
              </>
            );
          }}
        />
      </View>
    </>
  );
}
