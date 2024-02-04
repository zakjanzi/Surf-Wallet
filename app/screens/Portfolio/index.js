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
import SwitchSelector from 'react-native-switch-selector';
import {useDispatch, useSelector} from 'react-redux';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import PortListItem from '../../components/PortListItem';
import {DarkColor, LightColor} from '../../config/colors';
import {enableAnimateInEaseOut} from '../../config/commonFunctions';
import {Images} from '../../config/images';
import styles from './styles';
import {
  LineChart,
  TLineChartDataProp,
  TLineChartPoint,
} from 'react-native-wagmi-charts';
import Pie from 'react-native-pie';
import MarketScreen from '../MarketScreen';
import {Card} from 'react-native-paper';
import { map } from 'lodash';
import { ethereumAddress, getBalance } from '../../utils/accountMethods';
import actions from '../../redux/walletReducer/actions';
 //demo portfolio data
 const portfolioArr = [
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
];

// chart menu options
const chatOptions = [
  {label: '1H', value: '1h'},
  {label: '1D', value: '1d'},
  {label: '1W', value: '1w'},
  {label: 'ALL', value: 'all'},
];

//header data
const options = [
  {label: t('porfolio'), value: 'portfolio'},
  {label: t('market'), value: 'market'},
];
export default function Portfolio({navigation}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);
  const { storeUserBalance } = actions;
  const [totalBalance, settotalBalance] = useState('$9,211.47');
  const [increasePercentage, setincreasePercentage] = useState('12.07');
  const [increaseBalance, setincreaseBalance] = useState('1,074.22');

  const [profite, setprofite] = useState(true);

  const [balancePart, setbalancePart] = useState(0);
  const [portfoliotab, setportfoliotab] = useState('portfolio');
  const [portfolioArrList, setPortfolioArrList] = useState([])

  const dispatch = useDispatch();

  useEffect(() => {
    getBalanceFrom()
  }, [])

  const getBalanceFrom = async ()=>{
    if (portfolioArr.length > 0) {
      const updatedList = await Promise.all(
        map(portfolioArr, async (item) => {
          const getBalanceValue = await getBalance(ethereumAddress);
          return { ...item, price: getBalanceValue };
        })
      );
      setPortfolioArrList(updatedList)
      dispatch(storeUserBalance(updatedList));
    }else{ 
      setPortfolioArrList(portfolioArr)
      dispatch(storeUserBalance(portfolioArr));
    }
  
  }
  

  // portfolio list item
  const renderPorfolio = ({item, index}) => {
    return (
      <Card
        style={{
          marginBottom: 16,
          backgroundColor: BaseColor.langUNSBtnBack,
          padding: 8,
        }}>
        <PortListItem
          icon={item?.icon}
          topLeftTxt={item?.title}
          bottomLeftTxt={`${item?.profite ? '+' : '-'}${item.plPer}%`}
          topRightTxt={`$${item?.price}`}
          bottomRightTxt={`${item?.nativeValue} ${item?.key}`}
          centerImage={item?.chart}
          onPress={() => {
            navigation.navigate('ItemProfile', {itemDetail: item});
          }}
        />
      </Card>
    );
  };

  //line chart data
  const data = [
    {
      timestamp: 1625945400000,
      value: 33575.25,
    },
    {
      timestamp: 1625946300000,
      value: 33545.25,
    },
    {
      timestamp: 1625947200000,
      value: 33510.25,
    },
    {
      timestamp: 1625948100000,
      value: 33215.25,
    },
  ];

  //pie chart data
  const pieData = [
    {
      percentage: 33.4,
      color: '#CCCCCC',
      title: 'ETH',
    },
    {
      percentage: 27.3,
      color: '#F7A61E',
      title: 'BTC',
    },
    {
      percentage: 21.2,
      color: '#5E5CE6',
      title: 'SOL',
    },
    {
      percentage: 13.1,
      color: '#0D723A',
      title: 'USDT',
    },
    {
      percentage: 4,
      color: '#E1434C',
      title: 'DOT',
    },
    {
      percentage: 1,
      color: '#E0E0E0',
      title: 'Toher',
    },
  ];

  enableAnimateInEaseOut();

  return (
    <>
      <StatusBar
        barStyle={dark ? 'light-content' : 'dark-content'}
        backgroundColor={BaseColor.primaryBG}
      />
      <CHeader
        leftIcon={dark ? Images.menu_dark : Images.menu_light}
        onLeftIconPress={() => navigation.openDrawer()}
        renderCenter={() => {
          return (
            <View style={{width: '60%'}}>
              <SwitchSelector
                options={options}
                initial={0}
                onPress={value => {
                  setportfoliotab(value);
                }}
                selectedColor={BaseColor.privacySelClr}
                textColor={BaseColor.text2}
                buttonColor={BaseColor.selectedPrivacyback}
                backgroundColor={BaseColor.unselectedPrivacyback}
                textStyle={styles.txtStyle}
                selectedTextStyle={styles.txtStyle}
                fontSize={12}
                borderColor={BaseColor.unselectedPrivacyback}
                hasPadding={true}
              />
            </View>
          );
        }}
        rightIcon={
          portfoliotab == 'portfolio' ? Images.notification_icon : Images.search
        }
        rightIconSize={portfoliotab == 'portfolio' ? 28 : 24}
        onRightIconPress={() => {
          if (portfoliotab == 'portfolio') {
            navigation.navigate('Notifications');
          } else {
            navigation.navigate('SearchScreen');
          }
        }}
      />
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        {portfoliotab == 'portfolio' ? (
          <View style={{flex: 1}}>
            <View style={[]}>
              {balancePart == 0 ? (
                <View>
                  <Image
                    source={
                      dark
                        ? Images.balance_back_dark
                        : Images.balance_back_light
                    }
                    style={[styles.balanceImg]}
                    resizeMode="stretch"
                  />
                  <View style={[styles.balanceAbs]}>
                    <View>
                      <CText
                        value={t('balance')}
                        style={{
                          fontSize: 14,
                          color: BaseColor.whiteColor,
                          textAlign: 'center',
                        }}
                      />
                      <CText
                        value={totalBalance}
                        semiBold
                        style={{
                          fontSize: 14,
                          color: BaseColor.whiteColor,
                          textAlign: 'center',
                        }}
                      />
                    </View>
                    <CText
                      value={`${increasePercentage}% (${
                        profite ? '+' : '-'
                      }$${increaseBalance})`}
                      bold
                      style={{
                        fontSize: 14,
                        color: BaseColor.profiteValue,
                        textAlign: 'center',
                      }}
                    />
                  </View>
                </View>
              ) : balancePart == 1 ? (
                <View style={[]}>
                  <View>
                    <View>
                      <CText
                        value={t('balance')}
                        style={{
                          fontSize: 14,
                          color: BaseColor.boardingSkip,
                          textAlign: 'center',
                        }}
                      />
                      <CText
                        value={totalBalance}
                        style={{
                          fontSize: 20,
                          color: BaseColor.fontHighContrast,
                          textAlign: 'center',
                        }}
                      />
                    </View>
                    <CText
                      value={`${increasePercentage}% (${
                        profite ? '+' : '-'
                      }$${increaseBalance})`}
                      bold
                      style={{
                        fontSize: 14,
                        color: profite
                          ? BaseColor.profiteValueDark
                          : BaseColor.lossValue,
                        textAlign: 'center',
                      }}
                    />
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <ImageBackground
                      source={Images.chart_background}
                      style={{
                        width: Dimensions.get('window').width - 64,
                        paddingStart: 24,
                      }}>
                      <LineChart.Provider data={data}>
                        <LineChart
                          width={Dimensions.get('window').width - 88}
                          height={200}>
                          <LineChart.Path color={BaseColor.chartColor} />
                        </LineChart>
                      </LineChart.Provider>
                    </ImageBackground>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        setbalancePart(2);
                        setprofite(false);
                      }}>
                      <Image
                        source={dark ? Images.pie_dark : Images.pie_light}
                        style={[styles.graphStyle]}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>

                    <View style={{flex: 1, marginStart: 12}}>
                      <SwitchSelector
                        options={chatOptions}
                        initial={0}
                        onPress={value =>
                          console.log(`Call onPress with value: ${value}`)
                        }
                        selectedColor={BaseColor.privacySelClr}
                        textColor={BaseColor.text2}
                        buttonColor={BaseColor.chartSelColor}
                        backgroundColor={BaseColor.primaryBG}
                        textStyle={styles.txtStyle}
                        selectedTextStyle={styles.txtStyle}
                        fontSize={10}
                        borderColor={BaseColor.primaryBG}
                        hasPadding={true}
                      />
                    </View>
                  </View>
                </View>
              ) : balancePart == 2 ? (
                <View style={[]}>
                  <View>
                    <View>
                      <CText
                        value={t('balance')}
                        style={{
                          fontSize: 14,
                          color: BaseColor.boardingSkip,
                          textAlign: 'center',
                        }}
                      />
                      <CText
                        value={totalBalance}
                        style={{
                          fontSize: 20,
                          color: BaseColor.fontHighContrast,
                          textAlign: 'center',
                        }}
                      />
                    </View>
                    <CText
                      value={`${increasePercentage}% (${
                        profite ? '+' : '-'
                      }$${increaseBalance})`}
                      bold
                      style={{
                        fontSize: 14,
                        color: profite
                          ? BaseColor.profiteValue
                          : BaseColor.lossValue,
                        textAlign: 'center',
                      }}
                    />
                  </View>

                  <View
                    style={[
                      {
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 24,
                        justifyContent: 'space-around',
                      },
                    ]}>
                    <Pie
                      radius={80}
                      innerRadius={60}
                      sections={pieData}
                      dividerSize={0}
                      strokeCap={'butt'}
                    />
                    <View>
                      {pieData.map((item, index) => {
                        return (
                          <View style={styles.pieRow} key={index}>
                            <View
                              style={[
                                styles.pieDot,
                                {backgroundColor: item.color},
                              ]}
                            />
                            <CText
                              value={item.title}
                              medium
                              style={{
                                color: BaseColor.text1,
                                fontSize: 8,
                                marginStart: 8,
                                textAlign: 'left',
                              }}
                            />
                            <CText
                              value={`${item.percentage}%`}
                              style={{
                                color: BaseColor.text1,
                                fontSize: 8,
                                marginStart: 24,
                                textAlign: 'left',
                              }}
                            />
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </View>
              ) : null}

              {balancePart == 0 && (
                <TouchableOpacity
                  style={[styles.graphBtnCont]}
                  activeOpacity={0.7}
                  onPress={() => {
                    setbalancePart(1);
                  }}>
                  <Image
                    source={dark ? Images.graph_dark : Images.graph_light}
                    style={[styles.graphStyle]}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}

              {balancePart == 2 && (
                <TouchableOpacity
                  style={[styles.graphBtnCont]}
                  activeOpacity={0.7}
                  onPress={() => {
                    setbalancePart(0);
                    setprofite(true);
                  }}>
                  <Image
                    source={dark ? Images.normal_dark : Images.normal_light}
                    style={[styles.graphStyle]}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={[{flex: 1, marginTop: 48}]}>
              <CText
                value={t('porfolio')}
                semiBold
                style={{
                  fontSize: 14,
                  color: BaseColor.inputColor,
                }}
              />
            {portfolioArrList?.length > 0 &&  <FlatList
                data={portfolioArrList}
                keyExtractor={(item, index) => index}
                renderItem={renderPorfolio}
                contentContainerStyle={{marginTop: 24}}
              />}
            </View>
          </View>
        ) : (
          <View style={{flex: 1}}>
            <MarketScreen navigation={navigation} />
          </View>
        )}
      </View>
    </>
  );
}
