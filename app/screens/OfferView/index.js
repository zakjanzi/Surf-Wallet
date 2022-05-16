import {t} from 'i18next';
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Linking,
} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import {useSelector} from 'react-redux';
import CButton from '../../components/CButton';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import {DarkColor, LightColor} from '../../config/colors';
import {Images} from '../../config/images';
import styles from './styles';

export default function OfferView({navigation, route}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const itemDetails = route?.params?.itemDetails;
  console.log(
    '🚀 ~ file: index.js ~ line 26 ~ OfferView ~ itemDetails',
    itemDetails,
  );

  const [payAmount, setpayAmount] = useState('');
  const [forAmount, setforAmount] = useState('');

  const lastSeen = '4mn';

  const feedbackData = [
    {
      name: 'Anononymous',
      rate: 5,
      msg: 'Good trade.',
      time: 'Sep 04 2021',
    },
    {
      name: 'Anononymous',
      rate: 4,
      msg: 'Not very responsive',
      time: 'Sep 04 2021',
    },
  ];

  return (
    <>
      <CHeader
        title={t('offerView')}
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
            value={t('youAreTheBuyer')}
            semiBold
            style={{color: BaseColor.text1, fontSize: 16}}
          />
          <CText
            value={t('sendOffertoSeller')}
            style={{color: BaseColor.text2, fontSize: 16, marginTop: 12}}
          />
          <View style={[styles.rowStyle, {marginTop: 10}]}>
            <CText
              value={t('method')}
              medium
              style={{color: BaseColor.text1, fontSize: 12}}
            />
            <View
              style={[
                styles.boxStyle,
                {backgroundColor: BaseColor.unselectedPrivacyback},
              ]}>
              <CText
                value={t('faceToFace')}
                style={{color: BaseColor.text2, fontSize: 10}}
              />
            </View>
          </View>
          <CText
            value={t('amount')}
            semiBold
            style={{color: BaseColor.text1, fontSize: 14, marginTop: 16}}
          />

          <CText
            value={t('iWillPay')}
            style={{color: BaseColor.text1, fontSize: 10, marginTop: 10}}
          />
          <View
            style={[
              styles.amountTICont,
              {borderColor: BaseColor.unselectedBottomTabIcon},
            ]}>
            <TextInput
              placeholder={t('enterAmountYouWant')}
              placeholderTextColor={BaseColor.inputBorder}
              style={[styles.amountIT, {color: BaseColor.inputText}]}
              keyboardType="numeric"
              autoFocus
              onChangeText={val => {
                const formattedValue = (
                  Number(val.replace(/\D/g, '')) || ''
                ).toLocaleString();
                setpayAmount(formattedValue);
              }}
              value={payAmount}
            />
            <View
              style={[
                styles.boxStyle,
                {
                  backgroundColor: BaseColor.unselectedPrivacyback,
                  paddingHorizontal: 16,
                },
              ]}>
              <CText
                value={t('USD')}
                style={{color: BaseColor.text2, fontSize: 10}}
              />
            </View>
          </View>
          <CText
            value={t('for')}
            style={{color: BaseColor.text1, fontSize: 10, marginTop: 10}}
          />
          <View
            style={[
              styles.amountTICont,
              {borderColor: BaseColor.unselectedBottomTabIcon},
            ]}>
            <TextInput
              placeholder={t('0.00')}
              placeholderTextColor={BaseColor.inputBorder}
              style={[styles.amountIT, {color: BaseColor.inputText}]}
              keyboardType="numeric"
              onChangeText={val => {
                const formattedValue = (
                  Number(val.replace(/\D/g, '')) || ''
                ).toLocaleString();
                setforAmount(formattedValue);
              }}
              value={forAmount}
            />
            <View
              style={[
                styles.boxStyle,
                {
                  backgroundColor: BaseColor.unselectedPrivacyback,
                  paddingHorizontal: 16,
                },
              ]}>
              <CText
                value={itemDetails?.itemKey || 'BTC'}
                style={{color: BaseColor.text2, fontSize: 10}}
              />
            </View>
          </View>

          {/* profile section */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 16,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Image
                source={itemDetails?.profilePic}
                resizeMode="contain"
                style={{height: 30, width: 30}}
              />
              <View
                style={{
                  alignItems: 'flex-start',
                  marginStart: 12,
                }}>
                <CText
                  value={itemDetails?.profileName}
                  medium
                  style={{
                    fontSize: 12,
                    color: BaseColor.text2,
                  }}
                />
                <CText
                  value={`${t('seen')} ${lastSeen} ${t('ago')}`}
                  style={{
                    fontSize: 10,
                    color: BaseColor.yellow,
                    marginTop: 8,
                  }}
                />
              </View>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <Image
                  source={itemDetails?.place_icon}
                  resizeMode="contain"
                  style={{height: 16, width: 16}}
                />
                <CText
                  value={itemDetails?.place}
                  style={{
                    fontSize: 12,
                    color: BaseColor.text1,
                    marginStart: 12,
                  }}
                />
              </View>
              <CText
                value={t('cashInPerson')}
                style={{
                  fontSize: 10,
                  color: BaseColor.text2,
                  marginTop: 8,
                }}
              />
            </View>
          </View>

          <>
            <View style={[styles.rowStyle, {marginTop: 12}]}>
              <CText
                value={t('totalVolumeTraded')}
                medium
                style={{color: BaseColor.text2, fontSize: 12}}
              />
              <CText
                value={'~$8,500'}
                medium
                style={{color: BaseColor.text1, fontSize: 12, marginStart: 16}}
              />
            </View>
            <View style={[styles.rowStyle, {marginTop: 8}]}>
              <CText
                value={t('totalNumberTraded')}
                medium
                style={{color: BaseColor.text2, fontSize: 12}}
              />
              <CText
                value={'140'}
                medium
                style={{color: BaseColor.text1, fontSize: 12, marginStart: 16}}
              />
            </View>
            <View style={[styles.rowStyle, {marginTop: 8}]}>
              <CText
                value={t('avgTradingTime')}
                medium
                style={{color: BaseColor.text2, fontSize: 12}}
              />
              <CText
                value={'3 hours'}
                medium
                style={{color: BaseColor.text1, fontSize: 12, marginStart: 16}}
              />
            </View>
          </>

          <CText
            value={t('offer')}
            semiBold
            style={{color: BaseColor.text1, fontSize: 14, marginTop: 16}}
          />

          <View
            style={[
              styles.offerCont,
              {backgroundColor: BaseColor.langUNSBtnBack},
            ]}>
            <CText
              value={t('buyLimit')}
              medium
              style={{color: BaseColor.text2, fontSize: 10}}
            />
            <CText
              value={itemDetails?.priceRange}
              style={{color: BaseColor.text1, fontSize: 12, marginTop: 6}}
            />
          </View>
          <View
            style={[
              styles.offerCont,
              {backgroundColor: BaseColor.langUNSBtnBack},
            ]}>
            <CText
              value={t('sellerRate')}
              medium
              style={{color: BaseColor.text2, fontSize: 10}}
            />
            <View style={[styles.rowStyle]}>
              <CText
                value={'$37,425.77'}
                style={{color: BaseColor.text1, fontSize: 12, marginTop: 6}}
              />
            </View>
          </View>

          <CText
            value={t('contact')}
            semiBold
            style={{color: BaseColor.text1, fontSize: 14, marginTop: 16}}
          />

          <View style={[styles.rowStyle]}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.contactCont,
                {backgroundColor: BaseColor.langUNSBtnBack, marginEnd: 8},
              ]}
              onPress={() => Linking.openURL(`https://wa.me/+96186964207`)}>
              <View
                style={[styles.rowStyle, {justifyContent: 'space-between'}]}>
                <CText
                  value={t('whatsapp')}
                  medium
                  style={{color: BaseColor.text2, fontSize: 12}}
                />
                <Image
                  source={Images.whatsapp_icon}
                  style={{
                    height: 24,
                    width: 24,
                  }}
                  resizeMode="contain"
                />
              </View>

              <CText
                value={'+961 86 964 207'}
                style={{color: BaseColor.text2, fontSize: 14, marginTop: 8}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.contactCont,
                {backgroundColor: BaseColor.langUNSBtnBack, marginStart: 8},
              ]}
              onPress={() =>
                Linking.openURL(`https://telegram.me/+96186964207`)
              }>
              <View
                style={[styles.rowStyle, {justifyContent: 'space-between'}]}>
                <CText
                  value={t('telegram')}
                  medium
                  style={{color: BaseColor.text2, fontSize: 12}}
                />
                <Image
                  source={Images.telegram_icon}
                  style={{
                    height: 24,
                    width: 24,
                  }}
                  resizeMode="contain"
                />
              </View>
              <CText
                value={'+961 86 964 207'}
                style={{color: BaseColor.text2, fontSize: 14, marginTop: 8}}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.rowStyle,
              {justifyContent: 'space-between', marginTop: 16},
            ]}
            onPress={() => {
              navigation.navigate('Feedback');
            }}>
            <CText
              value={`${t('feedback')} (${'10'})`}
              semiBold
              style={{color: BaseColor.text1, fontSize: 14}}
            />
            <Image
              source={Images.right_arrow_dark}
              resizeMode="contain"
              style={{
                height: 10,
                width: 10,
              }}
              tintColor={BaseColor.text2}
            />
          </TouchableOpacity>

          <View>
            {feedbackData.map((item, index) => {
              return (
                <View
                  key={index}
                  style={[
                    styles.offerCont,
                    {backgroundColor: BaseColor.langUNSBtnBack},
                  ]}>
                  <View
                    style={[
                      styles.rowStyle,
                      {justifyContent: 'space-between'},
                    ]}>
                    <CText
                      value={item?.name}
                      medium
                      style={{color: BaseColor.text2, fontSize: 12}}
                    />
                    <CText
                      value={item?.time}
                      style={{color: BaseColor.text1, fontSize: 12}}
                    />
                  </View>
                  <View
                    style={[
                      styles.rowStyle,
                      {justifyContent: 'space-between', marginTop: 12},
                    ]}>
                    <CText
                      value={item?.msg}
                      medium
                      style={{color: BaseColor.text1, fontSize: 12}}
                    />

                    <AirbnbRating
                      defaultRating={item?.rate}
                      size={10}
                      starContainerStyle={{
                        backgroundColor: BaseColor.primaryBG,
                      }}
                      isDisabled
                      showRating={false}
                      selectedColor={BaseColor.inputBottomLine}
                    />
                  </View>
                </View>
              );
            })}
          </View>

          <CButton
            value={t('openTrade')}
            containerStyle={{marginTop: 16}}
            onPress={() => {
              navigation.navigate('Trade', {type: itemDetails?.type});
            }}
          />
        </ScrollView>
      </View>
    </>
  );
}
