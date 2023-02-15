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
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import PortListItem from '../../components/PortListItem';
import {DarkColor, LightColor} from '../../config/colors';
import {Images} from '../../config/images';
import styles from './styles';
import {
  CandlestickChart,
  LineChart,
  TLineChartDataProp,
  TLineChartPoint,
} from 'react-native-wagmi-charts';
import SwitchSelector from 'react-native-switch-selector';
import {enableAnimateInEaseOut} from '../../config/commonFunctions';
import MoreItemHeader from '../../components/MoreItemHeader';

export default function DetailedItemScreen({navigation, route}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const itemDetail = route?.params?.itemDetail;

  const [lineChart, setlineChart] = useState(true);

  //line chart data
  const data = [
    {
      timestamp: 1625945400000,
      value: 575.25,
    },
    {
      timestamp: 1625946300000,
      value: 1545.25,
    },
    {
      timestamp: 1625947200000,
      value: 5510.25,
    },
    {
      timestamp: 1625948100000,
      value: 4215.25,
    },
    {
      timestamp: 1625945400000,
      value: 7575.25,
    },
    {
      timestamp: 1625946300000,
      value: 9545.25,
    },
    {
      timestamp: 1625947200000,
      value: 11510.25,
    },
    {
      timestamp: 1625948100000,
      value: 8215.25,
    },
    {
      timestamp: 1625945400000,
      value: 20575.25,
    },
    {
      timestamp: 1625946300000,
      value: 15545.25,
    },
    {
      timestamp: 1625947200000,
      value: 18510.25,
    },
    {
      timestamp: 1625948100000,
      value: 20215.25,
    },
  ];

  //candle chart Data
  const candleData = [
    {
      timestamp: 1625945400000,
      open: 33575.25,
      high: 33600.52,
      low: 33475.12,
      close: 33520.11,
    },
    {
      timestamp: 1625946300000,
      open: 33545.25,
      high: 33560.52,
      low: 33510.12,
      close: 33520.11,
    },
    {
      timestamp: 1625947200000,
      open: 33510.25,
      high: 33515.52,
      low: 33250.12,
      close: 33250.11,
    },
    {
      timestamp: 1625948100000,
      open: 33215.25,
      high: 33430.52,
      low: 33215.12,
      close: 33420.11,
    },
    {
      timestamp: 1625945400000,
      open: 33575.25,
      high: 33600.52,
      low: 33475.12,
      close: 33520.11,
    },
    {
      timestamp: 1625946300000,
      open: 33545.25,
      high: 33560.52,
      low: 33510.12,
      close: 33520.11,
    },
    {
      timestamp: 1625947200000,
      open: 33510.25,
      high: 33515.52,
      low: 33250.12,
      close: 33250.11,
    },
    {
      timestamp: 1625948100000,
      open: 33215.25,
      high: 33430.52,
      low: 33215.12,
      close: 33420.11,
    },
    {
      timestamp: 1625945400000,
      open: 33575.25,
      high: 33600.52,
      low: 33475.12,
      close: 33520.11,
    },
    {
      timestamp: 1625946300000,
      open: 33545.25,
      high: 33560.52,
      low: 33510.12,
      close: 33520.11,
    },
    {
      timestamp: 1625947200000,
      open: 33510.25,
      high: 33515.52,
      low: 33250.12,
      close: 33250.11,
    },
    {
      timestamp: 1625948100000,
      open: 33215.25,
      high: 33430.52,
      low: 33215.12,
      close: 33420.11,
    },
  ];

  //question data
  const questionData = {
    question: 'What is bitcoin?',
    answer:
      'Bitcoin is the world’s first digitally native money and payment network. The asset has a limited supply and can be sent anywhere in the world with no government, corporation, or individual having control over the network. Anyone with an internet connection can download the appropriate software on their device and start using Bitcoin.',
  };

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

  // news item list
  const renderNews = ({item, index}) => {
    return (
      <View style={[styles.rowStyle, {marginVertical: 8}]}>
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
    );
  };

  enableAnimateInEaseOut();

  return (
    <>
      <CHeader
        title={itemDetail?.title}
        backBtn
        onBackPress={() => {
          navigation.goBack();
        }}
        rightIcon={dark ? Images.star_dark : Images.star_light}
        onRightIconPress={() => {}}
      />
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        <ScrollView contentContainerStyle={{flexGrow: 1, padding: 16}}>
          <PortListItem
            icon={itemDetail?.icon}
            topLeftTxt={itemDetail?.title}
            bottomLeftTxt={`${itemDetail?.key}`}
            topRightTxt={`$${itemDetail?.price}`}
            bottomRightTxt={`${itemDetail?.plPer}%`}
            bottomLeftTxtColor={BaseColor.text2}
            bottomRightTxtColor={
              itemDetail.plPer > 0
                ? BaseColor.profiteValue
                : BaseColor.lossValue
            }
          />
          <View style={[styles.rowStyle]}>
            <View>
              <CText
                value={t('low')}
                medium
                style={{
                  fontSize: 13,
                  color: BaseColor.text2,
                }}
              />
              <CText
                value={'$45000.12'}
                medium
                style={{
                  fontSize: 15,
                  color: BaseColor.text1,
                }}
              />
            </View>
            <View>
              <CText
                value={t('high')}
                medium
                style={{
                  fontSize: 13,
                  color: BaseColor.text2,
                }}
              />
              <CText
                value={'$46000.45'}
                medium
                style={{
                  fontSize: 15,
                  color: BaseColor.text1,
                }}
              />
            </View>
          </View>

          <View style={{alignItems: 'center'}}>
            <ImageBackground
              source={dark ? Images.candle_back_dark : Images.candle_back_light}
              style={{
                width: Dimensions.get('window').width - 64,
                paddingStart: 24,
                height: 240,
              }}
              resizeMode="stretch">
              {lineChart ? (
                <LineChart.Provider data={data}>
                  <LineChart
                    width={Dimensions.get('window').width - 88}
                    height={200}>
                    <LineChart.Path color={BaseColor.lossValue} />
                  </LineChart>
                </LineChart.Provider>
              ) : (
                <CandlestickChart.Provider data={candleData}>
                  <CandlestickChart
                    width={Dimensions.get('window').width - 88}
                    height={200}>
                    <CandlestickChart.Candles />
                  </CandlestickChart>
                </CandlestickChart.Provider>
              )}
            </ImageBackground>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: BaseColor.unselectedPrivacyback,
                marginTop: 8,
                borderRadius: 50,
                paddingVertical: 4,
                paddingEnd: 8,
              }}>
              <View style={{flex: 1, marginStart: 12}}>
                <SwitchSelector
                  options={[
                    {label: '1Hour', value: '1h'},
                    {label: '7D', value: '7d'},
                    {label: '30D', value: '30d'},
                    {label: '90D', value: '90d'},
                    {label: 'ALL', value: 'all'},
                  ]}
                  initial={0}
                  onPress={value => {}}
                  selectedColor={BaseColor.privacySelClr}
                  textColor={BaseColor.text2}
                  buttonColor={BaseColor.selectedPrivacyback}
                  backgroundColor={BaseColor.unselectedPrivacyback}
                  textStyle={styles.txtStyle}
                  selectedTextStyle={styles.txtStyle}
                  fontSize={10}
                  borderColor={BaseColor.primaryBG}
                  // hasPadding={true}
                />
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setlineChart(!lineChart);
                }}>
                <Image
                  source={lineChart ? Images.candle_icon : Images.line_icon}
                  style={[
                    {
                      height: 24,
                      width: 24,
                      marginEnd: 8,
                    },
                  ]}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{marginTop: 16}}>
            <PortListItem
              icon={itemDetail?.icon}
              topLeftTxt={itemDetail?.title}
              bottomLeftTxt={`+1.86%`}
              topRightTxt={`0.00USD`}
              bottomRightTxt={`0.00BTC`}
              centerImage={Images.bit_chart}
            />
          </View>

          {questionData && (
            <View>
              <CText
                value={questionData.question}
                semiBold
                style={{
                  fontSize: 16,
                  color: BaseColor.text1,
                }}
              />
              <CText
                value={questionData.answer}
                semiBold
                style={{
                  fontSize: 12,
                  color: BaseColor.text2,
                }}
              />
            </View>
          )}

          <View style={{marginTop: 16}}>
            <CText
              value={t('resources')}
              semiBold
              style={{
                fontSize: 16,
                color: BaseColor.text1,
              }}
            />
            <View style={[styles.rowStyle, {marginTop: 8}]}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles.rowStyle,
                  {
                    justifyContent: 'flex-start',
                    flex: 1,
                  },
                ]}>
                <Image
                  source={dark ? Images.web_icon_dark : Images.web_icon_light}
                  style={{
                    height: 18,
                    width: 18,
                  }}
                  resizeMode="contain"
                />
                <CText
                  value={t('officialWebsite')}
                  medium
                  style={{
                    fontSize: 12,
                    color: BaseColor.inputBottomLine,
                    marginStart: 8,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles.rowStyle,
                  {
                    justifyContent: 'flex-start',
                    flex: 1,
                  },
                ]}>
                <Image
                  source={
                    dark ? Images.paper_icon_dark : Images.paper_icon_light
                  }
                  style={{
                    height: 18,
                    width: 18,
                  }}
                  resizeMode="contain"
                />
                <CText
                  value={t('whitepaper')}
                  medium
                  style={{
                    fontSize: 12,
                    color: BaseColor.inputBottomLine,
                    marginStart: 8,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={[
              styles.rowStyle,
              {
                marginTop: 24,
                backgroundColor: BaseColor.selectedBack,
                paddingVertical: 16,
                marginHorizontal: -16,
                borderRadius: 16,
              },
            ]}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Image
                style={{height: 36, width: 36}}
                resizeMode="contain"
                source={Images.market_cap}
              />
              <CText
                value={t('marketCap')}
                medium
                style={{
                  color: BaseColor.boardingTxt,
                  fontSize: 12,
                }}
              />
              <CText
                value={'€792,946.3T'}
                medium
                style={{
                  color: BaseColor.text2,
                  fontSize: 12,
                }}
              />
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Image
                style={{height: 36, width: 36}}
                resizeMode="contain"
                source={Images.volume}
              />
              <CText
                value={t('volume')}
                medium
                style={{
                  color: BaseColor.boardingTxt,
                  fontSize: 12,
                }}
              />
              <CText
                value={'€886,950,6T'}
                medium
                style={{
                  color: BaseColor.text2,
                  fontSize: 12,
                }}
              />
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Image
                style={{height: 36, width: 36}}
                resizeMode="contain"
                source={Images.circulation}
              />
              <CText
                value={t('circulation')}
                medium
                style={{
                  color: BaseColor.boardingTxt,
                  fontSize: 12,
                }}
              />
              <CText
                value={'611.6M'}
                medium
                style={{
                  color: BaseColor.text2,
                  fontSize: 12,
                }}
              />
            </View>
          </View>

          <View style={{marginTop: 12}}>
            <CText
              value={t('latestCryptoNews')}
              semiBold
              style={{
                fontSize: 16,
                color: BaseColor.text1,
              }}
            />
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
        </ScrollView>
      </View>
    </>
  );
}
