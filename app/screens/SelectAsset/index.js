import {t} from 'i18next';
import React, {useState} from 'react';
import {FlatList, Image, TextInput, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import {DarkColor, LightColor} from '../../config/colors';
import {Images} from '../../config/images';
import {FontFamily} from '../../config/typography';
import styles from './styles';

export default function SelectAsset({navigation}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);
  const {userbalances} = useSelector(state => state.wallet);
  const [searchTxt, setsearchTxt] = useState('');
  console.log(';===userbalances===',userbalances)
  const data = [
    {
      image: Images.bitcoin,
      title: 'Bitcoin',
      priceInUSD: 0.0,
      key: 'BTC',
      price: 0.0,
    },
    {
      image: Images.ethereum,
      title: 'Ethereum',
      priceInUSD: 0.0,
      key: 'ETH',
      price: 0.0,
    },
    {
      image: Images.avax,
      title: 'AVAX',
      priceInUSD: 0.0,
      key: 'AVAX',
      price: 0.0,
    },
    {
      image: Images.dai,
      title: 'DAI',
      priceInUSD: 0.0,
      key: 'DAI',
      price: 0.0,
    },
    {
      image: Images.bnb,
      title: 'BNB',
      priceInUSD: 0.0,
      key: 'BNB',
      price: 0.0,
    },
    {
      image: Images.luna,
      title: 'LUNA',
      priceInUSD: 0.0,
      key: 'LUNA',
      price: 0.0,
    },
  ];

  return (
    <>
      <CHeader
        title={t('selectAsset')}
        backBtn
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        <View
          style={[
            styles.inputCont,
            {
              backgroundColor: BaseColor.selectedBack,
              borderColor: BaseColor.strokeGrey,
            },
          ]}>
          <Image
            source={Images.search}
            style={{
              height: 16,
              width: 16,
            }}
            resizeMode="contain"
          />
          <TextInput
            value={searchTxt}
            onChangeText={setsearchTxt}
            style={{
              flex: 1,
              color: BaseColor.text2,
              marginStart: 16,
              fontSize: 12,
              height: 40,
              fontFamily: FontFamily.Inter_Medium,
            }}
          />
        </View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index}
          style={{marginTop: 16}}
          numColumns={2}
          renderItem={({item, index}) => {
            return (
              <View style={[styles.cardCont]}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    styles.mainCardCont,
                    {backgroundColor: BaseColor.langUNSBtnBack},
                  ]}
                  onPress={() => {

                    navigation.navigate('AmountScreen', {itemData: item});
                  }}>
                  <View
                    style={[styles.rowStyle, {justifyContent: 'space-around'}]}>
                    <Image
                      source={item?.image}
                      style={{height: 40, width: 40}}
                      resizeMode="contain"
                    />
                    <CText
                      value={item?.title}
                      style={{
                        fontSize: 14,
                        color: BaseColor.fontHighContrast,
                      }}
                      semiBold
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginVertical: 24,
                    }}>
                    <CText
                      value={`${item?.priceInUSD} USD`}
                      style={{
                        fontSize: 12,
                        color: BaseColor.fontHighContrast,
                      }}
                    />
                    <CText
                      value={`${item?.price} ${item?.key}`}
                      style={{
                        fontSize: 12,
                        color: BaseColor.text2,
                      }}
                      medium
                    />
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </>
  );
}
