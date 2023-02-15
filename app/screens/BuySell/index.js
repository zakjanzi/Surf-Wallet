import {t} from 'i18next';
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  Dimensions,
  TextInput,
} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import {useSelector} from 'react-redux';
import BSItemList from '../../components/BSItemList';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import {DarkColor, LightColor} from '../../config/colors';
import {Images} from '../../config/images';
import styles from './styles';
import Modal from 'react-native-modal';
import {enableAnimateInEaseOut} from '../../config/commonFunctions';

export default function BuySell({navigation}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const [buySellSwitch, setbuySellSwitch] = useState('buy');
  const [filterModal, setfilterModal] = useState(false);

  const [selectedCurrency, setselectedCurrency] = useState('USD');

  const [selectedCrypto, setselectedCrypto] = useState('BTC');
  const [selectedLanguage, setselectedLanguage] = useState('USD');

  const [locationModal, setlocationModal] = useState(false);

  //header data
  const options = [
    {label: t('buy'), value: 'buy'},
    {label: t('sell'), value: 'sell'},
  ];

  //Buy Data
  const data = [
    {
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
    },
    {
      profilePic: Images.avatar2,
      profileName: '0xSteph-54',
      rating: 4,
      place: 'Dahieh',
      place_icon: Images.lebanon_flag,
      priceRange: '$587.22',
      item_icon: Images.ethereum,
      itemKey: 'USDT',
      price: '1',
      rate: 'Fixed price',
      type: 'buy',
    },
  ];

  //Buy Data
  const sellData = [
    {
      profilePic: Images.avatar3,
      profileName: 'Said D.',
      rating: 4,
      place: 'Byblos',
      place_icon: Images.lebanon_flag,
      priceRange: '$10 - $10,000',
      item_icon: Images.tether,
      itemKey: 'ETH',
      price: '3,730.25',
      rate: 6.47,
      type: 'sell',
    },
    {
      profilePic: Images.avatar5,
      profileName: 'Oussama A.',
      rating: 4,
      place: 'Saida',
      place_icon: Images.lebanon_flag,
      priceRange: '$10 - $10,000',
      item_icon: Images.usd_image,
      itemKey: 'USD',
      price: '22,750',
      rate: -1.5,
      type: 'sell',
    },
  ];

  // types of currency
  const currencyArr = [
    {
      title: 'USD',
      icon: Images.usa_flag,
      symbol: '$',
    },
    {
      title: 'EURO',
      icon: Images.eur_flag,
      symbol: '£',
    },
  ];

  // stablecoins list
  const stablecoinsArr = [
    {
      title: 'BUSD',
    },
    {
      title: 'USDC',
    },
    {
      title: 'USDT',
    },
    {
      title: 'DAI',
    },
  ];

  // cryptocurrency list
  const cryptocurrenciesArr = [
    {
      title: 'BTC',
      icon: Images.bitcoin,
    },
    {
      title: 'ETH',
      icon: Images.ethereum,
    },
    {
      title: 'XMR',
      icon: Images.xmr,
    },
  ];

  // location list
  const locations = [
    {
      icon: Images.lebanon_flag,
      name: 'Lebanon',
    },
  ];

  const renderBuyItem = ({item, index}) => {
    return (
      <>
        <BSItemList
          profilePic={item?.profilePic}
          profileName={item?.profileName}
          rating={item?.rating}
          place={item?.place}
          place_icon={item?.place_icon}
          priceRange={item?.priceRange}
          item_icon={item?.item_icon}
          itemKey={item?.itemKey}
          price={item?.price}
          rate={item?.rate}
          type={item?.type}
          onBtnPress={() => {
            navigation.navigate('OfferView', {itemDetails: item});
          }}
        />
        {index != data.length - 1 && (
          <View
            style={{
              height: 2,
              width: '96%',
              backgroundColor: BaseColor.divider1,
              alignSelf: 'center',
              marginVertical: 16,
            }}
          />
        )}
      </>
    );
  };

  enableAnimateInEaseOut();

  return (
    <>
      <CHeader
        title={t('buySell')}
        leftIcon={dark ? Images.menu_dark : Images.menu_light}
        onLeftIconPress={() => navigation.openDrawer()}
        rightIcon={Images.notification_icon}
        rightIconSize={28}
        onRightIconPress={() => {
          navigation.navigate('Notifications');
        }}
      />
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        <View style={[styles.rowStyle]}>
          <View style={{width: '40%'}}>
            <SwitchSelector
              options={options}
              initial={0}
              onPress={value => {
                setbuySellSwitch(value);
              }}
              selectedColor={BaseColor.privacySelClr}
              textColor={BaseColor.text2}
              buttonColor={BaseColor.selectedPrivacyback}
              backgroundColor={BaseColor.unselectedPrivacyback}
              textStyle={styles.txtStyle}
              selectedTextStyle={styles.txtStyle}
              fontSize={10}
              borderColor={BaseColor.unselectedPrivacyback}
              hasPadding={true}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('CreateAnOffer');
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={Images.add_icon}
              style={{
                height: 14,
                width: 14,
              }}
              tintColor={BaseColor.inputBottomLine}
            />
            <CText
              value={` ${t('createAnOffer')}`}
              medium
              style={{
                fontSize: 12,
                color: BaseColor.inputBottomLine,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.rowStyle, {marginTop: 24}]}>
          <CText
            value={`${t('allOffers')}`}
            semiBold
            style={{
              fontSize: 16,
              color: BaseColor.text1,
            }}
          />
          <View style={[styles.rowStyle, {justifyContent: 'flex-end'}]}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setlocationModal(true)}>
              <Image
                source={dark ? Images.map_point_dark : Images.map_point_light}
                resizeMode="contain"
                style={{
                  height: 22,
                  width: 22,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setfilterModal(true)}>
              <Image
                source={Images.filter}
                resizeMode="contain"
                style={{
                  height: 24,
                  width: 24,
                  marginStart: 16,
                }}
                tintColor={BaseColor.text2}
              />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={buySellSwitch == 'buy' ? data : sellData}
          keyExtractor={(item, index) => index}
          renderItem={renderBuyItem}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <Modal
        style={{flex: 1, margin: 0}}
        // transparent
        isVisible={filterModal}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}
        animationInTiming={1000}
        animationOutTiming={1000}
        useNativeDriverForBackdrop={true}
        // animationType="slide"
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <View
            style={{backgroundColor: BaseColor.langUNSBtnBack, padding: 16}}>
            <View style={{alignItems: 'flex-end'}}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setfilterModal(false)}
                style={{padding: 8}}>
                <Image
                  source={Images.close_cross}
                  style={{
                    height: 14,
                    width: 14,
                  }}
                  resizeMode="contain"
                  tintColor={BaseColor.text1}
                />
              </TouchableOpacity>
            </View>

            <>
              <CText
                value={t('stablecoins')}
                semiBold
                style={{
                  fontSize: 16,
                  color: BaseColor.text1,
                  marginTop: 16,
                }}
              />

              <FlatList
                numColumns={4}
                keyExtractor={(item, index) => index}
                data={stablecoinsArr}
                scrollEnabled={false}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        width: Dimensions.get('window').width / 4 - 8,
                        padding: 4,
                      }}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 8,
                          paddingHorizontal: 8,
                          flex: 1,
                          borderWidth: 1,
                          borderRadius: 8,
                          borderColor: BaseColor.placeholderInput,
                          justifyContent: 'center',
                        }}
                        onPress={() => {}}>
                        <CText
                          value={item.title}
                          medium
                          style={{
                            marginStart: 8,
                            fontSize: 12,
                            color: BaseColor.placeholderInput,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                }}
                style={{
                  marginTop: 4,
                }}
              />
            </>

            <>
              <CText
                value={t('cryptocurrencies')}
                semiBold
                style={{
                  fontSize: 16,
                  color: BaseColor.text1,
                  marginTop: 32,
                }}
              />

              <FlatList
                numColumns={4}
                keyExtractor={(item, index) => index}
                data={cryptocurrenciesArr}
                scrollEnabled={false}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        width: Dimensions.get('window').width / 4 - 8,
                        padding: 4,
                      }}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 8,
                          paddingHorizontal: 8,
                          flex: 1,
                          borderWidth: 1,
                          borderRadius: 8,
                          borderColor:
                            selectedCrypto == item.title
                              ? BaseColor.inputBottomLine
                              : BaseColor.placeholderInput,
                          justifyContent: 'center',
                        }}
                        onPress={() => {
                          setselectedCrypto(item.title);
                        }}>
                        <Image
                          source={item.icon}
                          style={{height: 22, width: 22}}
                          resizeMode="contain"
                        />
                        <CText
                          value={item.title}
                          medium
                          style={{
                            marginStart: 8,
                            fontSize: 12,
                            color:
                              selectedCrypto == item.title
                                ? BaseColor.inputBottomLine
                                : BaseColor.placeholderInput,
                          }}
                        />
                      </TouchableOpacity>
                      {item.title == 'XMR' && (
                        <Image
                          source={Images.shield}
                          resizeMode="contain"
                          style={{
                            height: 16,
                            width: 16,
                            position: 'absolute',
                            right: 0,
                          }}
                        />
                      )}
                    </View>
                  );
                }}
                style={{
                  marginTop: 4,
                }}
              />
            </>

            {selectedCrypto == 'XMR' && (
              <View
                style={{
                  backgroundColor: BaseColor.modalBack,
                  borderRadius: 10,
                  padding: 16,
                  marginTop: 16,
                }}>
                <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
                  <Image
                    source={dark ? Images.info_dark : Images.info_light}
                    resizeMode="contain"
                    style={{height: 14, width: 14}}
                  />
                  <CText
                    value="XMR"
                    semiBold
                    style={{
                      fontSize: 16,
                      color: BaseColor.text1,
                      marginStart: 4,
                    }}
                  />
                </View>

                <CText
                  value={t('xmrInfo')}
                  style={{
                    fontSize: 12,
                    color: BaseColor.text2,
                  }}
                />
              </View>
            )}

            <>
              <CText
                value={t('fiat')}
                semiBold
                style={{
                  fontSize: 16,
                  color: BaseColor.text1,
                  marginTop: 32,
                }}
              />

              <FlatList
                numColumns={4}
                keyExtractor={(item, index) => index}
                data={currencyArr}
                scrollEnabled={false}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        width: Dimensions.get('window').width / 4 - 8,
                        padding: 4,
                      }}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 8,
                          paddingHorizontal: 8,
                          flex: 1,
                          borderWidth: 1,
                          borderRadius: 8,
                          borderColor:
                            selectedCurrency == item.title
                              ? BaseColor.inputBottomLine
                              : BaseColor.placeholderInput,
                          justifyContent: 'center',
                        }}
                        onPress={() => {
                          setselectedCurrency(item.title);
                        }}>
                        <Image
                          source={item.icon}
                          style={{height: 22, width: 22}}
                          resizeMode="contain"
                        />
                        <CText
                          value={item.title}
                          medium
                          style={{
                            marginStart: 8,
                            fontSize: 12,
                            color:
                              selectedCurrency == item.title
                                ? BaseColor.inputBottomLine
                                : BaseColor.placeholderInput,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                }}
                style={{
                  marginTop: 4,
                }}
              />
            </>
          </View>
        </View>
      </Modal>

      {/* location modal */}
      <Modal
        style={{flex: 1, margin: 0}}
        isVisible={locationModal}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}
        animationInTiming={1000}
        animationOutTiming={1000}
        useNativeDriverForBackdrop={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <View
            style={{backgroundColor: BaseColor.langUNSBtnBack, padding: 16}}>
            <View style={{alignItems: 'flex-end'}}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setlocationModal(false)}
                style={{padding: 8}}>
                <Image
                  source={Images.close_cross}
                  style={{
                    height: 14,
                    width: 14,
                  }}
                  resizeMode="contain"
                  tintColor={BaseColor.text1}
                />
              </TouchableOpacity>
            </View>
            <CText
              value={t('selectLocation')}
              semiBold
              style={{
                fontSize: 14,
                color: BaseColor.text1,
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 4,
                borderColor: BaseColor.unselectedBottomTabIcon,
                color: BaseColor.text1,
                paddingHorizontal: 12,
              }}>
              <Image
                source={Images.search}
                resizeMode="contain"
                style={{
                  height: 16,
                  width: 16,
                }}
                tintColor={BaseColor.inputBottomLine}
              />

              <TextInput
                placeholder={t('searchForYourLocation')}
                style={[
                  styles.textInputCont,
                  {
                    borderColor: BaseColor.unselectedBottomTabIcon,
                    color: BaseColor.text1,
                  },
                ]}
                placeholderTextColor={BaseColor.placeholderInput}
              />
            </View>

            <View>
              <CText
                value={t('country')}
                medium
                style={{
                  fontSize: 12,
                  color: BaseColor.text2,
                  marginTop: 16,
                }}
              />

              <FlatList
                data={locations}
                keyExtractor={(key, index) => index}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={[styles.rowStyle, {justifyContent: 'flex-start'}]}>
                      <Image
                        source={item?.icon}
                        resizeMode="contain"
                        style={{
                          height: 18,
                          width: 18,
                          marginEnd: 12,
                        }}
                      />

                      <CText
                        value={item?.name}
                        style={{
                          fontSize: 12,
                          color: BaseColor.text2,
                        }}
                      />
                    </TouchableOpacity>
                  );
                }}
                style={{
                  marginTop: 16,
                }}
                contentContainerStyle={{
                  height: 250,
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
