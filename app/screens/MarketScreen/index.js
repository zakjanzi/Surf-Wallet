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
  StatusBar,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import CText from '../../components/CText';
import MoreItemHeader from '../../components/MoreItemHeader';
import {DarkColor, LightColor} from '../../config/colors';
import {Images} from '../../config/images';
import styles from './styles';
import PortListItem from '../../components/PortListItem';
import CMenuItem from '../../components/CMenuItem';
import Modal from 'react-native-modal';
import {Card} from 'react-native-paper';

//api
// import { defiMarketCap } from '../../../cryptoRoutes'

export default function MarketScreen({navigation}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const [sortModal, setsortModal] = useState(false);
  const [currencyModal, setcurrencyModal] = useState(false);

  const [selectedTopMenu, setselectedTopMenu] = useState('overview');
  const [selectedCurrency, setselectedCurrency] = useState({
    title: 'USD',
    icon: Images.usa_flag,
    symbol: '$',
  });

  const [selectedSort, setselectedSort] = useState({
    title: t('lowestCap'),
    id: 0,
  });

  //horizontal menu tabs
  const topHorizontalMenu = [
    {
      title: 'Watch List',
      id: 'watchlist',
    },
    {
      title: 'Overview',
      id: 'overview',
    },
    {
      title: 'Cryptocurrency',
      id: 'cryptocurrency',
    },
    {
      title: 'Category',
      id: 'category',
    },
    {
      title: 'DeFi',
      id: 'deFi',
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

  //sort modal data list
  const sortArr = [
    {
      title: t('highestCap'),
      id: 0,
    },
    {
      title: t('lowestCap'),
      id: 1,
    },
    {
      title: t('highestPrice'),
      id: 2,
    },
    {
      title: t('lowestPrice'),
      id: 3,
    },
    {
      title: t('topGainers'),
      id: 4,
    },
    {
      title: t('topLosers'),
      id: 5,
    },
  ];

  //top four block data
  const fourBlockData = [
    {
      title: 'BTC Dominance',
      value: 41.19,
      percentage: 0.46,
      chatImage: Images.pro_chart,
    },
    {
      title: '24h Volume',
      value: 106.3,
      percentage: -14.38,
      chatImage: Images.eth_chart,
    },
    {
      title: 'DeFi Cap',
      value: 55,
      percentage: -2.55,
      chatImage: Images.eth_chart,
    },
    {
      title: 'TVL in DeFi',
      value: 268.6,
      percentage: -0.87,
      chatImage: Images.eth_chart,
    },
  ];

  //top 6 Data
  const top5Data = [
    {
      icon: Images.bitcoin,
      title: 'Bitcoin',
      profite: true,
      plPer: 1.86,
      price: '9,714.20',
      nativeValue: '0.0325474',
      key: 'BTC',
      chart: Images.bit_chart,
    },
    {
      icon: Images.ethereum,
      title: 'Ethereum',
      profite: true,
      plPer: 3.92,
      price: '5,941.67',
      nativeValue: '2.07',
      key: 'ETH',
      chart: Images.eth_chart,
    },
    {
      icon: Images.tether,
      title: 'Tether',
      profite: true,
      plPer: 0.03,
      price: '514.08',
      nativeValue: '514.97',
      key: 'USDT',
      chart: Images.teh_chart,
    },
    {
      icon: Images.bnb_image,
      title: 'BNB',
      profite: true,
      plPer: 3.78,
      price: '427.65',
      nativeValue: '514.97',
      key: 'BNB',
      chart: Images.teh_chart,
    },
    {
      icon: Images.usd_image,
      title: 'USD Coin',
      profite: true,
      plPer: 3.78,
      price: '0.9995',
      nativeValue: '514.97',
      key: 'USDC',
      chart: Images.teh_chart,
    },
  ];

  //top losers Data
  const topLosers = [
    {
      icon: Images.ownix_image,
      title: 'Ownix',
      profite: true,
      plPer: -10.54,
      price: '43,254.74',
      nativeValue: '0.0325474',
      key: 'GENE',
      chart: Images.bit_chart,
    },
    {
      icon: Images.pancake_image,
      title: 'Pancake Games',
      profite: true,
      plPer: -9.86,
      price: '2,973.27',
      nativeValue: '2.07',
      key: 'ETHM',
      chart: Images.eth_chart,
    },
    {
      icon: Images.fire_image,
      title: 'Fire Rocket',
      profite: true,
      plPer: -17.01,
      price: '1.00',
      nativeValue: '514.97',
      key: 'SSR',
      chart: Images.teh_chart,
    },
    {
      icon: Images.tether,
      title: 'Arc Governance',
      profite: true,
      plPer: -23.78,
      price: '0.98',
      nativeValue: '514.97',
      key: 'AS',
      chart: Images.teh_chart,
    },
  ];

  //Cryptocurrency Data
  const cryptocurrencyData = [
    {
      icon: Images.oasis_image,
      title: 'Oasis Network',
      plPer: -16.1,
      price: '0.3209',
      key: 'ROSE',
    },
    {
      icon: Images.audius_iamge,
      title: 'Audius',
      plPer: -10.78,
      price: '2.24',
      key: 'AUDIO',
    },
    {
      icon: Images.omg_image,
      title: 'OMG Network',
      plPer: -9.59,
      price: '8.12',
      key: 'OMG',
    },
    {
      icon: Images.siacon_image,
      title: 'Siacon',
      plPer: 18.67,
      price: '0.02647',
      key: 'SC',
    },
    {
      icon: Images.icon_image,
      title: 'Icon',
      plPer: 3.47,
      price: '1.77',
      key: 'ICX',
    },
  ];

  //deFi Data
  const deFiData = [
    {
      icon: Images.theta_image,
      title: 'THETA',
      plPer: -16.1,
      price: '0.3209',
      key: 'ROSE',
    },
    {
      icon: Images.tezos_image,
      title: 'Tezos',
      plPer: -10.78,
      price: '2.24',
      key: 'AUDIO',
    },
    {
      icon: Images.axie_image,
      title: 'Axie Inf',
      plPer: -9.59,
      price: '8.12',
      key: 'OMG',
    },
    {
      icon: Images.chiliz_image,
      title: 'Chiliz',
      plPer: 18.67,
      price: '0.02647',
      key: 'SC',
    },
    {
      icon: Images.icon_image,
      title: 'Icon',
      plPer: 3.47,
      price: '1.77',
      key: 'ICX',
    },
  ];

  //watchlist array
  const wishlistArr = [
    {
      icon: Images.bitcoin,
      title: 'Bitcoin',
      profite: true,
      plPer: -1.86,
      price: '9,714.20',
      nativeValue: '0.0325474',
      key: 'BTC',
      chart: Images.bit_chart,
      wish: true,
    },
  ];

  //other sample datas
  const sampleData = [
    {
      icon: Images.bitcoin,
      title: 'Bitcoin',
      profite: true,
      plPer: 1.86,
      price: '9,714.20',
      nativeValue: '0.0325474',
      key: 'BTC',
      chart: Images.bit_chart,
    },
    {
      icon: Images.ethereum,
      title: 'Ethereum',
      profite: true,
      plPer: 3.92,
      price: '5,941.67',
      nativeValue: '2.07',
      key: 'ETH',
      chart: Images.eth_chart,
    },
    {
      icon: Images.tether,
      title: 'Tether',
      profite: true,
      plPer: 0.03,
      price: '514.08',
      nativeValue: '514.97',
      key: 'USDT',
      chart: Images.teh_chart,
    },
    {
      icon: Images.tether,
      title: 'Tether',
      profite: true,
      plPer: 0.03,
      price: '514.08',
      nativeValue: '514.97',
      key: 'USDT',
      chart: Images.teh_chart,
    },
    {
      icon: Images.tether,
      title: 'Tether',
      profite: true,
      plPer: 0.03,
      price: '514.08',
      nativeValue: '514.97',
      key: 'USDT',
      chart: Images.teh_chart,
    },
    {
      icon: Images.bitcoin,
      title: 'Bitcoin',
      profite: true,
      plPer: 1.86,
      price: '9,714.20',
      nativeValue: '0.0325474',
      key: 'BTC',
      chart: Images.bit_chart,
    },
    {
      icon: Images.ethereum,
      title: 'Ethereum',
      profite: true,
      plPer: 3.92,
      price: '5,941.67',
      nativeValue: '2.07',
      key: 'ETH',
      chart: Images.eth_chart,
    },
    {
      icon: Images.tether,
      title: 'Tether',
      profite: true,
      plPer: 0.03,
      price: '514.08',
      nativeValue: '514.97',
      key: 'USDT',
      chart: Images.teh_chart,
    },
    {
      icon: Images.tether,
      title: 'Tether',
      profite: true,
      plPer: 0.03,
      price: '514.08',
      nativeValue: '514.97',
      key: 'USDT',
      chart: Images.teh_chart,
    },
    {
      icon: Images.tether,
      title: 'Tether',
      profite: true,
      plPer: 0.03,
      price: '514.08',
      nativeValue: '514.97',
      key: 'USDT',
      chart: Images.teh_chart,
    },
  ];

  //news Data
  const newsData = [
    {
      title: 'Micro Has a High Stock Price, a fat Premium,  & Bitcoin',
      company: 'CNBC',
      time: '13 hours',
      image: Images.news1,
    },
    {
      title: 'Micro Has a High Stock Price, a fat Premium,  & Bitcoin',
      company: 'CNBC',
      time: '13 hours',
      image: Images.news2,
    },
  ];

  // top tab render function
  const renderTopMenu = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.topMenuCont,
          {
            backgroundColor:
              selectedTopMenu == item.id
                ? BaseColor.unselectedPrivacyback
                : BaseColor.selectedBack,
          },
        ]}
        onPress={() => {
          setselectedTopMenu(item.id);
        }}>
        <CText
          value={item.title}
          medium
          style={{
            fontSize: 12,
            color:
              selectedTopMenu == item.id
                ? BaseColor.inputBottomLine
                : BaseColor.grey70,
          }}
        />
      </TouchableOpacity>
    );
  };

  // center block render
  const renderBlocks = ({item, index}) => {
    return (
      <View
        style={[
          styles.blockCont,
          {
            paddingStart: index % 2 == 0 ? 0 : 8,
            paddingEnd: index % 2 == 0 ? 8 : 0,
          },
        ]}>
        <Card
          style={[
            {
              backgroundColor: BaseColor.langUNSBtnBack,
            },
          ]}>
          <View
            style={[
              styles.blockCont2,
              {
                // backgroundColor: BaseColor.langUNSBtnBack,
              },
            ]}>
            <CText
              value={item.title}
              medium
              style={{
                color: BaseColor.text2,
                fontSize: 9,
              }}
            />
            <View style={[styles.rowStyle, {marginTop: 8}]}>
              <View>
                <CText
                  value={`$${item.value} B`}
                  medium
                  style={{
                    color: BaseColor.text1,
                    fontSize: 12,
                  }}
                />
                <CText
                  value={`${item.percentage}%`}
                  medium
                  style={{
                    color:
                      item.percentage > 0
                        ? BaseColor.profiteValue
                        : BaseColor.lossValue,
                    fontSize: 11,
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}>
                <Image
                  source={item.chatImage}
                  style={{
                    height: 28,
                    width: '80%',
                  }}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        </Card>
      </View>
    );
  };

  //render list item
  const renderTop5 = ({item, index}) => {
    return (
      <View
        style={{
          marginBottom: 16,
        }}>
        {item.wish && (
          <Image
            source={Images.star}
            style={{
              height: 10,
              width: 10,
              alignSelf: 'flex-end',
            }}
            resizeMode="contain"
            tintColor={BaseColor.inputBottomLine}
          />
        )}
        <PortListItem
          icon={item?.icon}
          topLeftTxt={item?.title}
          bottomLeftTxt={`${item?.key}`}
          topRightTxt={`${selectedCurrency.symbol}${item?.price}`}
          bottomRightTxt={`${item?.plPer}%`}
          bottomLeftTxtColor={BaseColor.text2}
          bottomRightTxtColor={
            item.plPer > 0 ? BaseColor.profiteValue : BaseColor.lossValue
          }
          onPress={() => {
            navigation.navigate('DetailedItemScreen', {itemDetail: item});
          }}
        />
      </View>
    );
  };

  // news list item
  const renderNews = ({item, index}) => {
    return (
      <Card
        style={{
          marginBottom: 16,
          backgroundColor: BaseColor.langUNSBtnBack,
          padding: 8,
        }}>
        <View style={[styles.rowStyle]}>
          <View style={{flex: 1, paddingEnd: 16}}>
            <CText
              value={item.title}
              semiBold
              style={{
                fontSize: 14,
                color: BaseColor.text1,
              }}
            />
            <View
              style={[
                styles.rowStyle,
                {justifyContent: 'flex-start', marginTop: 8},
              ]}>
              <CText
                value={item.time}
                medium
                style={{
                  fontSize: 12,
                  color: BaseColor.text2,
                }}
              />
              <CText
                value={item.company}
                style={{
                  fontSize: 12,
                  color: BaseColor.inputBottomLine,
                  marginStart: 8,
                }}
              />
            </View>
          </View>
          <Image
            source={item.image}
            style={{height: 84, width: 84}}
            resizeMode="contain"
          />
        </View>
      </Card>
    );
  };

  return (
    <>
      <View style={{flex: 1}}>
        <View>
          <FlatList
            keyExtractor={(item, index) => index}
            data={topHorizontalMenu}
            renderItem={renderTopMenu}
            horizontal
            style={{flex: 0}}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <View style={[styles.rowStyle, {marginTop: 16}]}>
            <CText
              value={
                selectedTopMenu == 'overview'
                  ? t('totalMarketCap')
                  : t('assets')
              }
              semiBold
              style={{
                fontSize: selectedTopMenu == 'overview' ? 12 : 16,
                color: BaseColor.text1,
              }}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.rowStyle,
                styles.curCont,
                {
                  backgroundColor: BaseColor.chartSelColor,
                },
              ]}
              onPress={() => setcurrencyModal(true)}>
              <CText
                value={selectedCurrency.title}
                semiBold
                style={{
                  fontSize: 12,
                  color: BaseColor.text1,
                }}
              />
              <Image
                source={selectedCurrency.icon}
                style={{
                  height: 22,
                  width: 22,
                  marginStart: 16,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          {selectedTopMenu == 'overview' ? (
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
              }}
              style={{marginTop: 16}}
              showsVerticalScrollIndicator={false}>
              <View style={{marginTop: 8, flex: 1}}>
                <View
                  style={[
                    styles.rowStyle,
                    {justifyContent: 'flex-start', alignItems: 'flex-end'},
                  ]}>
                  <CText
                    value={'$2.976 T'}
                    semiBold
                    style={{
                      color: BaseColor.text1,
                      fontSize: 16,
                    }}
                  />
                  <CText
                    value={'-1.8%'}
                    semiBold
                    style={{
                      color: BaseColor.notavailableName,
                      fontSize: 12,
                      marginStart: 10,
                    }}
                  />
                </View>
                <FlatList
                  data={fourBlockData}
                  keyExtractor={(item, index) => index}
                  renderItem={renderBlocks}
                  numColumns={2}
                  scrollEnabled={false}
                  contentContainerStyle={{marginTop: 24}}
                  showsVerticalScrollIndicator={false}
                />

                <View style={{marginTop: 12}}>
                  <MoreItemHeader title={t('top6')} />

                  {/* <Card
                    style={{
                      backgroundColor: BaseColor.selectedBack,
                      borderRadius: 10,
                      marginTop: 12,
                    }}> */}
                  <FlatList
                    data={top5Data}
                    keyExtractor={(item, index) => index}
                    renderItem={renderTop5}
                    scrollEnabled={false}
                    style={{
                      backgroundColor: BaseColor.ffff24,
                      paddingHorizontal: 16,
                      borderRadius: 10,
                      paddingTop: 10,
                      marginTop: 12,
                    }}
                    showsVerticalScrollIndicator={false}
                  />
                  {/* </Card> */}
                </View>
                <View style={{marginTop: 12}}>
                  <MoreItemHeader title={t('topLoser')} />

                  <FlatList
                    data={topLosers}
                    keyExtractor={(item, index) => index}
                    renderItem={renderTop5}
                    scrollEnabled={false}
                    style={{
                      backgroundColor: BaseColor.ffff24,
                      paddingHorizontal: 16,
                      borderRadius: 10,
                      paddingTop: 10,
                      marginTop: 12,
                    }}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
                <View style={{marginTop: 12}}>
                  <MoreItemHeader title={t('latestCryptoNews')} />
                  <FlatList
                    data={newsData}
                    keyExtractor={(item, index) => index}
                    renderItem={renderNews}
                    scrollEnabled={false}
                    //   style={{
                    //     backgroundColor: BaseColor.selectedBack,
                    //     paddingHorizontal: 16,
                    //     borderRadius: 10,
                    //     paddingTop: 10,
                    //     marginTop: 12,
                    //   }}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
              </View>
            </ScrollView>
          ) : (
            <View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles.rowStyle,
                  {marginTop: 10, justifyContent: 'flex-start'},
                ]}
                onPress={() => setsortModal(true)}>
                <CText
                  value={selectedSort.title}
                  semiBold
                  style={{
                    fontSize: 10,
                    color: BaseColor.text1,
                  }}
                />
                <Image
                  source={Images.down_arrow_dark}
                  tintColor={BaseColor.text1}
                  style={{
                    height: 12,
                    width: 12,
                    marginStart: 8,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <FlatList
                data={
                  selectedTopMenu == 'watchlist'
                    ? wishlistArr
                    : selectedTopMenu == 'cryptocurrency'
                    ? cryptocurrencyData
                    : selectedTopMenu == 'deFi'
                    ? deFiData
                    : sampleData
                }
                keyExtractor={(item, index) => index}
                renderItem={renderTop5}
                contentContainerStyle={{flexGrow: 1, paddingBottom: 60}}
                style={{
                  marginTop: 12,
                }}
                showsVerticalScrollIndicator={false}
              />
            </View>
          )}
        </View>
      </View>

      {/* sort modal  */}
      <CMenuItem
        visible={sortModal}
        title={t('sortBy')}
        data={sortArr}
        selectedItem={selectedSort}
        onChange={val => {
          setselectedSort(val);
          setsortModal(false);
        }}
        onClose={() => {
          setsortModal(false);
        }}
      />

      {/* change currency modal  */}
      <Modal
        style={{margin: 0}}
        isVisible={currencyModal}
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
          <View style={{padding: 16, backgroundColor: BaseColor.primaryBG}}>
            <View style={styles.rowStyle}>
              <CText
                value={t('currency')}
                semiBold
                style={{
                  fontSize: 16,
                  color: BaseColor.text1,
                }}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setcurrencyModal(false)}
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
            <FlatList
              numColumns={4}
              keyExtractor={(item, index) => index}
              data={currencyArr}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      width: Dimensions.get('window').width / 4 - 8,
                      padding: 6,
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
                      onPress={() => {
                        setselectedCurrency(item);
                        setcurrencyModal(false);
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
                          color: BaseColor.placeholderInput,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}
              contentContainerStyle={{minHeight: 250}}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
