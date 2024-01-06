import {t} from 'i18next';
import React, {useState, useEffect} from 'react';
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
import axios from 'axios';
import { apiHandler } from '../../utils/APIHandler';

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

  // coin hooks
  const [allCoins, setAllCoins] = useState([]);
  const [top5Data, setTop5Data] = useState([]);
  const [topLosers, setTopLosers] = useState([]);

  //horizontal menu tabs
  const topHorizontalMenu = [
    {
      title: 'Overview',
      id: 'overview',
    },
    {
      title: 'All Coins',
      id: 'allcoins',
    },
    {
      title: 'Watchlist',
      id: 'watchlist',
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
    }
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



  //Cryptocurrency Data
  // const cryptocurrencyData = [
  //   {
  //     icon: Images.oasis_image,
  //     title: 'Oasis Network',
  //     plPer: -16.1,
  //     price: '0.3209',
  //     key: 'ROSE',
  //   },
  // ];

  //deFi Data
  // const deFiData = [
  //   {
  //     icon: Images.theta_image,
  //     title: 'THETA',
  //     plPer: -16.1,
  //     price: '0.3209',
  //     key: 'ROSE',
  //   },
  // ];


  useEffect(() => {
    // Function to fetch top coins data
    async function getCoins() {
      // const apiUrl = 'http://34.254.190.194/api/tokens';
      // const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzX2F0IjoxNjg4MTE5NDQ3LCJ1c2VyIjp7ImlkIjoxOSwiZW1haWwiOiJkdGZoZmdoQGhmZ2hqZmcuY29tIiwidXNlcm5hbWUiOiJzYWRyZmdlcnMifX0.hBaYROsLp8Q70EI6PIhgw6fnTGwrqn02DaLVGhDy3g8';
      try {
        
        const response = await apiHandler.get('/api/tokens');
        const responseData = response.data;
        // Update the state variables with the API data
        setAllCoins(responseData);
        setTop5Data(responseData.slice(0, 5));
        setTopLosers(responseData.reverse().slice(0, 5));

        console.log('API RESPONSE:', responseData);
        console.log('TOP 5:', responseData.slice(0, 5));
        console.log('TOP LOSERS:', responseData.slice(0, 5).reverse());
      } catch (error) {
        console.error('API error:', error);
        // Handle any errors that occurred during the API call
      }
    }

    // Call the getCoins function when the component mounts
    getCoins();
  }, []);
  

  
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

          // source={{ uri: responseData.symbol }} ??
          <Image
            source={{ uri: item.symbol }}
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
          icon={item?.symbol}
          topLeftTxt={item?.name}
          bottomLeftTxt={`${item?.ticker}`}
          topRightTxt={`${selectedCurrency.symbol}${item?.price}`}
          bottomRightTxt={`${item?.change_percentage.toFixed(2)}%`}
          bottomLeftTxtColor={BaseColor.text2}
          bottomRightTxtColor={
            item.change_percentage > 0 ? BaseColor.profiteValue : BaseColor.lossValue
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
              // Note: change to All Coins data
                data={
                  selectedTopMenu == 'watchlist'
                  // change wishlistArr to object returned from api call
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
