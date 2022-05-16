import {t} from 'i18next';
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  TextInput,
} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import {useSelector} from 'react-redux';
import CButton from '../../components/CButton';
import CCheckBox from '../../components/CCheckBox';
import CHeader from '../../components/CHeader';
import CRadioButton from '../../components/CRadioButton';
import CText from '../../components/CText';
import {DarkColor, LightColor} from '../../config/colors';
import {Images} from '../../config/images';
import {FontFamily} from '../../config/typography';
import styles from './styles';

export default function CreateAnOffer({navigation}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const [buySellSwitch, setbuySellSwitch] = useState('buy');
  const [selectedCrypto, setselectedCrypto] = useState('0');
  const [fixedAmount, setfixedAmount] = useState(true);
  const [marketPrice, setmarketPrice] = useState(true);

  const [offerMargin, setofferMargin] = useState(0);
  const [fixedValue, setfixedValue] = useState(0);

  const [fixedAmountNum, setfixedAmountNum] = useState('');
  const [rangedMinAmountNum, setrangedMinAmountNum] = useState('');
  const [rangedMaxAmountNum, setrangedMaxAmountNum] = useState('');

  const [agreed, setagreed] = useState(false);
  const [understood, setunderstood] = useState(false);

  //switch array
  const options = [
    {label: t('buy'), value: 'buy'},
    {label: t('sell'), value: 'sell'},
  ];

  // top menu name
  const topHorizontalMenu = [
    {
      icon: Images.bitcoin,
      name: 'BTC',
      id: 0,
    },
    {
      icon: Images.tether,
      name: 'ETH',
      id: 1,
    },
    {
      icon: Images.ethereum,
      name: 'USDT',
      id: 2,
    },
    {
      icon: Images.dai,
      name: 'DAI',
      id: 3,
    },
    {
      icon: Images.xmr,
      name: 'XMR',
      id: 4,
    },
  ];

  // crypto horizontal menu
  const renderTopMenu = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.rowStyle,
          styles.topMenuCont,
          {
            borderColor:
              selectedCrypto == item?.id
                ? BaseColor.inputBottomLine
                : BaseColor.text2,
          },
        ]}
        onPress={() => {
          setselectedCrypto(item?.id);
        }}>
        <Image
          source={item?.icon}
          resizeMode="contain"
          style={{
            height: 12,
            width: 12,
          }}
        />
        <CText
          value={item?.name}
          medium
          style={{
            fontSize: 14,
            color:
              selectedCrypto == item?.id ? BaseColor.text1 : BaseColor.text2,
            marginStart: 8,
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <CHeader
        title={t('createAnOffer')}
        backBtn
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        <View style={{width: '40%'}}>
          <SwitchSelector
            options={options}
            initial={0}
            onPress={value => {
              setbuySellSwitch(value);
            }}
            selectedColor={BaseColor.selectedPrivacyback}
            textColor={BaseColor.text2}
            buttonColor={BaseColor.privacySelClr}
            backgroundColor={BaseColor.unselectedPrivacyback}
            textStyle={styles.txtStyle}
            selectedTextStyle={styles.txtStyle}
            fontSize={12}
            borderColor={BaseColor.unselectedPrivacyback}
            hasPadding={true}
          />
        </View>
        <CText
          value={`${t('yourOfferWillListed')}`}
          style={{
            fontSize: 14,
            color: BaseColor.text2,
            marginTop: 10,
          }}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View
            style={[
              styles.rowStyle,
              {justifyContent: 'space-between', marginTop: 16},
            ]}>
            <CText
              value={`${t('chooseYourCryptocurrency')}`}
              semiBold
              style={{
                fontSize: 18,
                color: BaseColor.portTitle,
              }}
            />
            <TouchableOpacity activeOpacity={0.7}>
              <Image
                source={Images.search}
                resizeMode="contain"
                style={{
                  height: 16,
                  width: 16,
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={{marginTop: 10}}>
            <FlatList
              keyExtractor={(item, index) => index}
              data={topHorizontalMenu}
              renderItem={renderTopMenu}
              horizontal
              style={{flex: 0}}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          {buySellSwitch == 'sell' && (
            <Text
              style={{
                fontSize: 14,
                color: BaseColor.text2,
                fontFamily: FontFamily.Inter_Medium,
              }}>
              {'1 BTC = '}{' '}
              <Text
                style={{
                  fontSize: 14,
                  color: BaseColor.inputBottomLine,
                  fontFamily: FontFamily.Inter_Medium,
                }}>
                {'$63,587.33'}
              </Text>
            </Text>
          )}

          <CText
            value={`${t('paymentMethod')}`}
            semiBold
            style={{
              fontSize: 18,
              color: BaseColor.portTitle,
              marginTop: 16,
            }}
          />

          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.dropdownCont,
              {borderColor: BaseColor.unselectedBottomTabIcon},
            ]}>
            <CText
              value={`${t('cashInPerson')}`}
              medium
              style={{
                fontSize: 14,
                color: BaseColor.portTitle,
                flex: 1,
              }}
            />
            <Image
              source={dark ? Images.down_arrow_dark : Images.down_arrow_light}
              resizeMode="contain"
              style={{
                height: 10,
                width: 10,
              }}
            />
          </TouchableOpacity>

          <CText
            value={`${t('preferredCurrency')}`}
            semiBold
            style={{
              fontSize: 18,
              color: BaseColor.portTitle,
              marginTop: 16,
            }}
          />

          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.dropdownCont,
              {borderColor: BaseColor.unselectedBottomTabIcon},
            ]}>
            <CText
              value={`${'United States Dollar (USD)'}`}
              medium
              style={{
                fontSize: 14,
                color: BaseColor.portTitle,
                flex: 1,
              }}
            />
            <Image
              source={dark ? Images.down_arrow_dark : Images.down_arrow_light}
              resizeMode="contain"
              style={{
                height: 10,
                width: 10,
              }}
            />
          </TouchableOpacity>

          <CText
            value={`${t('amount')}`}
            semiBold
            style={{
              fontSize: 18,
              color: BaseColor.portTitle,
              marginTop: 16,
            }}
          />

          <View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.rowStyle,
                {justifyContent: 'flex-start', marginTop: 8},
              ]}
              onPress={() => {
                setfixedAmount(!fixedAmount);
              }}>
              <CRadioButton
                checked={fixedAmount}
                onPress={() => {
                  setfixedAmount(!fixedAmount);
                }}
                size={16}
              />
              <CText
                value={`${t('fixedAmount')}`}
                medium
                style={{
                  fontSize: 14,
                  color: fixedAmount ? BaseColor.text1 : BaseColor.text2,
                  marginStart: 8,
                }}
              />
            </TouchableOpacity>
            <TextInput
              placeholder=""
              style={[
                styles.textInputCont,
                {
                  borderColor: BaseColor.unselectedBottomTabIcon,
                  color: BaseColor.text1,
                },
              ]}
              editable={fixedAmount}
              keyboardType="numeric"
              onChangeText={val => {
                const formattedValue = (
                  Number(val.replace(/\D/g, '')) || ''
                ).toLocaleString();
                setfixedAmountNum(formattedValue);
              }}
              value={fixedAmountNum}
            />
          </View>

          <View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.rowStyle,
                {justifyContent: 'flex-start', marginTop: 8},
              ]}
              onPress={() => {
                setfixedAmount(!fixedAmount);
              }}>
              <CRadioButton
                checked={!fixedAmount}
                onPress={() => {
                  setfixedAmount(!fixedAmount);
                }}
                size={16}
              />
              <CText
                value={`${t('rangedAmount')}`}
                medium
                style={{
                  fontSize: 14,
                  color: !fixedAmount ? BaseColor.text1 : BaseColor.text2,
                  marginStart: 8,
                }}
              />
            </TouchableOpacity>

            <CText
              value={`${t('minimum')}`}
              medium
              style={{
                fontSize: 12,
                color: BaseColor.text2,
                marginTop: 8,
              }}
            />
            <TextInput
              placeholder=""
              style={[
                styles.textInputCont,
                {
                  borderColor: BaseColor.unselectedBottomTabIcon,
                  color: BaseColor.text1,
                },
              ]}
              editable={!fixedAmount}
              keyboardType="numeric"
              onChangeText={val => {
                const formattedValue = (
                  Number(val.replace(/\D/g, '')) || ''
                ).toLocaleString();
                setrangedMinAmountNum(formattedValue);
              }}
              value={rangedMinAmountNum}
            />

            <CText
              value={`${t('maximum')}`}
              medium
              style={{
                fontSize: 12,
                color: BaseColor.text2,
                marginTop: 8,
              }}
            />
            <TextInput
              placeholder=""
              style={[
                styles.textInputCont,
                {
                  borderColor: BaseColor.unselectedBottomTabIcon,
                  color: BaseColor.text1,
                },
              ]}
              editable={!fixedAmount}
              keyboardType="numeric"
              onChangeText={val => {
                const formattedValue = (
                  Number(val.replace(/\D/g, '')) || ''
                ).toLocaleString();
                setrangedMaxAmountNum(formattedValue);
              }}
              value={rangedMaxAmountNum}
            />
          </View>

          <CText
            value={`${t('tradeDetails')}`}
            semiBold
            style={{
              fontSize: 18,
              color: BaseColor.portTitle,
              marginTop: 16,
            }}
          />

          <View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.rowStyle,
                {justifyContent: 'flex-start', marginTop: 8},
              ]}
              onPress={() => {
                setmarketPrice(!marketPrice);
              }}>
              <CRadioButton
                checked={marketPrice}
                onPress={() => {
                  setmarketPrice(!marketPrice);
                }}
                size={16}
              />
              <CText
                value={`${t('marketPrice')}`}
                medium
                style={{
                  fontSize: 14,
                  color: BaseColor.text1,
                  marginStart: 8,
                }}
              />
            </TouchableOpacity>

            <CText
              value={`${t('mpDetails')}`}
              medium
              style={{
                fontSize: 14,
                color: BaseColor.text2,
                marginStart: 24,
              }}
            />

            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.rowStyle,
                {justifyContent: 'flex-start', marginTop: 8},
              ]}
              onPress={() => {
                setmarketPrice(!marketPrice);
              }}>
              <CRadioButton
                checked={!marketPrice}
                onPress={() => {
                  setmarketPrice(!marketPrice);
                }}
                size={16}
              />
              <CText
                value={`${t('fixedPrice')}`}
                medium
                style={{
                  fontSize: 14,
                  color: BaseColor.text1,
                  marginStart: 8,
                }}
              />
            </TouchableOpacity>

            <CText
              value={`${t('fpDetails')}`}
              medium
              style={{
                fontSize: 14,
                color: BaseColor.text2,
                marginStart: 24,
              }}
            />
          </View>

          <View>
            <View style={{alignItems: 'flex-start'}}>
              <CText
                value={`${t('offerMargin')}`}
                semiBold
                style={{
                  fontSize: 18,
                  color: BaseColor.portTitle,
                  marginTop: 16,
                }}
              />

              <View
                style={[
                  styles.borderedBox,
                  {
                    borderColor: BaseColor.unselectedBottomTabIcon,
                    color: BaseColor.text1,
                  },
                ]}>
                <TouchableOpacity
                  activeOpacity={0.71}
                  onPress={() => {
                    if (offerMargin != 0) {
                      setofferMargin(val => val - 1);
                    }
                  }}
                  style={{
                    padding: 8,
                  }}>
                  <Image
                    source={dark ? Images.minus_dark : Images.minus_light}
                    resizeMode="contain"
                    style={{
                      height: 16,
                      width: 16,
                    }}
                  />
                </TouchableOpacity>
                <CText
                  value={`${offerMargin}%`}
                  medium
                  style={{
                    fontSize: 16,
                    color: BaseColor.text1,
                  }}
                />
                <TouchableOpacity
                  activeOpacity={0.71}
                  onPress={() => {
                    if (offerMargin != 100) {
                      setofferMargin(val => val + 1);
                    }
                  }}
                  style={{
                    padding: 8,
                  }}>
                  <Image
                    source={dark ? Images.plus_dark : Images.plus_light}
                    resizeMode="contain"
                    style={{
                      height: 16,
                      width: 16,
                    }}
                  />
                </TouchableOpacity>
              </View>

              {marketPrice && (
                <>
                  <CText
                    value={t('currentBitcoinTitle')}
                    medium
                    style={{
                      fontSize: 14,
                      color: BaseColor.text2,
                      marginTop: 4,
                    }}
                  />
                  <CText
                    value={t('offerPriceInfo')}
                    medium
                    style={{
                      fontSize: 14,
                      color: BaseColor.text2,
                    }}
                  />
                </>
              )}
              {!marketPrice && (
                <View
                  style={{
                    position: 'absolute',
                    backgroundColor: `${BaseColor.primaryBG}80`,
                    top: 0,
                    bottom: 0,
                    height: '100%',
                    width: '100%',
                  }}></View>
              )}
            </View>

            <View style={{alignItems: 'flex-start'}}>
              <CText
                value={`${t('fixed')}`}
                semiBold
                style={{
                  fontSize: 18,
                  color: BaseColor.portTitle,
                  marginTop: 16,
                }}
              />

              <View
                style={[
                  styles.borderedBox,
                  {
                    borderColor: BaseColor.unselectedBottomTabIcon,
                    color: BaseColor.text1,
                    width: '100%',
                  },
                ]}>
                <TouchableOpacity
                  activeOpacity={0.71}
                  onPress={() => {
                    if (fixedValue != 0) {
                      setfixedValue(val => val - 1);
                    }
                  }}
                  style={{
                    padding: 8,
                  }}>
                  <Image
                    source={dark ? Images.minus_dark : Images.minus_light}
                    resizeMode="contain"
                    style={{
                      height: 16,
                      width: 16,
                    }}
                  />
                </TouchableOpacity>
                <CText
                  value={`$${fixedValue}`}
                  medium
                  style={{
                    fontSize: 16,
                    color: BaseColor.text1,
                  }}
                />
                <TouchableOpacity
                  activeOpacity={0.71}
                  onPress={() => {
                    if (fixedValue != 100) {
                      setfixedValue(val => val + 1);
                    }
                  }}
                  style={{
                    padding: 8,
                  }}>
                  <Image
                    source={dark ? Images.plus_dark : Images.plus_light}
                    resizeMode="contain"
                    style={{
                      height: 16,
                      width: 16,
                    }}
                  />
                </TouchableOpacity>
              </View>

              {!marketPrice && (
                <>
                  <CText
                    value={t('currentBitcoinTitle')}
                    medium
                    style={{
                      fontSize: 14,
                      color: BaseColor.text2,
                      marginTop: 4,
                    }}
                  />
                  <CText
                    value={t('offerPriceInfo')}
                    medium
                    style={{
                      fontSize: 14,
                      color: BaseColor.text2,
                    }}
                  />
                </>
              )}
              {marketPrice && (
                <View
                  style={{
                    position: 'absolute',
                    backgroundColor: `${BaseColor.primaryBG}80`,
                    top: 0,
                    bottom: 0,
                    height: '100%',
                    width: '100%',
                  }}></View>
              )}
            </View>
          </View>

          <CText
            value={`${t('offerTerms')}`}
            semiBold
            style={{
              fontSize: 18,
              color: BaseColor.portTitle,
              marginTop: 16,
            }}
          />

          <View>
            <TextInput
              placeholder={t('listOutYour')}
              style={[
                styles.textInputCont,
                {
                  borderColor: BaseColor.unselectedBottomTabIcon,
                  color: BaseColor.text1,
                },
              ]}
              editable={fixedAmount}
              placeholderTextColor={BaseColor.placeholderInput}
              multiline
            />

            <CText
              value={`${t('anybodyWhoView')}`}
              medium
              style={{
                fontSize: 14,
                color: BaseColor.text2,
                marginTop: 8,
              }}
            />
          </View>

          {/* <CText
            value={`${t('tradeInstructions')}`}
            semiBold
            style={{
              fontSize: 18,
              color: BaseColor.portTitle,
              marginTop: 16,
            }}
          /> */}

          {/* <View>
            <TextInput
              placeholder={t('listOutYour')}
              style={[
                styles.textInputCont,
                {
                  borderColor: BaseColor.unselectedBottomTabIcon,
                  color: BaseColor.text1,
                },
              ]}
              editable={fixedAmount}
              placeholderTextColor={BaseColor.placeholderInput}
            />

            <CText
              value={`${t('toEnsureSuccessfull')}`}
              medium
              style={{
                fontSize: 14,
                color: BaseColor.text2,
                marginTop: 8,
              }}
            />
          </View> */}

          <View
            style={[
              styles.rowStyle,
              {
                justifyContent: 'flex-start',
                marginTop: 22,
              },
            ]}>
            <CCheckBox
              checked={agreed}
              onPress={() => {
                setagreed(!agreed);
              }}
              size={20}
            />
            <CText
              value={t('agreedTS')}
              style={{
                color: BaseColor.text2,
                fontSize: 14,
                marginStart: 16,
                paddingEnd: 24,
              }}
            />
          </View>

          <View
            style={[
              styles.rowStyle,
              {
                justifyContent: 'flex-start',
                marginTop: 16,
              },
            ]}>
            <CCheckBox
              checked={understood}
              onPress={() => {
                setunderstood(!understood);
              }}
              size={20}
            />
            <CText
              value={t('understandTheRisk')}
              style={{
                color: BaseColor.text2,
                fontSize: 14,
                marginStart: 16,
                paddingEnd: 24,
              }}
            />
          </View>

          <View style={{marginTop: 8, marginStart: 32}}>
            <View
              style={[
                styles.rowStyle,
                {justifyContent: 'flex-start', alignItems: 'flex-start'},
              ]}>
              <View
                style={[styles.dot, {backgroundColor: BaseColor.primary}]}
              />

              <CText
                value={t('doNotRelease')}
                style={{
                  color: BaseColor.text2,
                  fontSize: 12,
                  marginStart: 2,
                  paddingEnd: 128,
                }}
              />
            </View>
            <View
              style={[
                styles.rowStyle,
                {
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginTop: 4,
                },
              ]}>
              <View
                style={[styles.dot, {backgroundColor: BaseColor.primary}]}
              />

              <CText
                value={t('checkFlatNotes')}
                style={{
                  color: BaseColor.text2,
                  fontSize: 12,
                  marginStart: 2,
                  paddingEnd: 128,
                }}
              />
            </View>
            <View
              style={[
                styles.rowStyle,
                {
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginTop: 4,
                },
              ]}>
              <View
                style={[styles.dot, {backgroundColor: BaseColor.primary}]}
              />

              <CText
                value={t('alwaysMeet')}
                style={{
                  color: BaseColor.text2,
                  fontSize: 12,
                  marginStart: 2,
                  paddingEnd: 128,
                }}
              />
            </View>
          </View>

          <CButton
            value={t('postOffer')}
            disable={agreed && understood ? false : true}
            onPress={() => {}}
            containerStyle={{marginTop: 16}}
          />
        </ScrollView>
      </View>
    </>
  );
}
