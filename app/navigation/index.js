import {NavigationContainer} from '@react-navigation/native';
import {
  Text,
  View,
  TextInput,
  I18nManager,
  Appearance,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import SplashScreen from '../screens/SplashScreen';
import LanguageScreen from '../screens/LanguageScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import {useDispatch, useSelector} from 'react-redux';
import i18n from '../language/i18n';
import RNRestart from 'react-native-restart';
import OnboardingUsername from '../screens/OnboardingUsername';
import SecurityScreen from '../screens/SecurityScreen';
import PincodeScreen from '../screens/PincodeScreen';
import RecoveryOption from '../screens/RecoveryOption';
import GeneratePassword from '../screens/GeneratePassword';
import NoInternet from '../components/NoInternet';
import GenerateWallet from '../screens/GenerateWallet';
import AuthAction from '../redux/reducer/auth/actions';
import SeedPhrase from '../screens/SeedPhrase';
import SeedPhrase2 from '../screens/SeedPhrase2';
import AccountInformation from '../screens/AccountInformation';
import Portfolio from '../screens/Portfolio';
import ItemProfile from '../screens/ItemProfile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BuySell from '../screens/BuySell';
import SendReceive from '../screens/SendReceive';
import {DarkColor, LightColor} from '../config/colors';
import {Images} from '../config/images';
import CText from '../components/CText';
import CustomDrawerContent from './CustomDrawerContent';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {enableAnimateInEaseOut} from '../config/commonFunctions';
import Account from '../screens/Account';
import ChangePassword from '../screens/ChangePassword';
import ChangeProfile from '../screens/ChangeProfile';
import TransactionDetails from '../screens/TransactionDetails';
import Notifications from '../screens/Notifications';
import DetailedItemScreen from '../screens/DetailedItemScreen';
import SearchScreen from '../screens/SearchScreen';
import MyTrades from '../screens/MyTrades';
import MyOffers from '../screens/MyOffers';
import OfferView from '../screens/OfferView';
import Feedback from '../screens/Feedback';
import CreateAnOffer from '../screens/CreateAnOffer';
import Trade from '../screens/Trade';
import Chat from '../screens/Chat';
import SelectAsset from '../screens/SelectAsset';
import AmountScreen from '../screens/AmountScreen';
import SendTo from '../screens/SendTo';
import ConfirmAmount from '../screens/ConfirmAmount';
import PaymentSuccess from '../screens/PaymentSuccess';
import QRScanner from '../screens/QRScanner';
import ReceviedPayment from '../screens/ReceviedPayment';
import Contacts from '../screens/Contacts';

// Remove font scale
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

export default function NavStart() {
  const {currentLanguage, dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);
  const {setDark} = AuthAction;
  const dispatch = useDispatch();

  const colorScheme = Appearance.getColorScheme();

  // useEffect(() => {
  //   if (colorScheme == 'dark') {
  //     dispatch(setDark(true));
  //   } else {
  //     dispatch(setDark(false));
  //   }
  // }, [colorScheme]);

  useEffect(() => {
    setBaseColor(dark ? DarkColor : LightColor);
  }, [dark]);

  useEffect(() => {
    changeLanguage(currentLanguage);
  }, []);

  const changeLanguage = async value => {
    i18n
      .changeLanguage(value)
      .then(async () => {})
      .catch(err => console.log(err));
  };

  const Stack = createStackNavigator();
  const PStack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();

  const BottomTabBar = ({state, descriptors, navigation}) => {
    const ButtonIcons = {
      PortfolioNavigatior: Images.portfolio_light,
      BuySell: Images.buy_sell_light,
      SendReceive: Images.send_receive_light,
    };

    const ButtonNames = {
      PortfolioNavigatior: 'Portfolio',
      BuySell: 'Buy & Sell',
      SendReceive: 'Send & receive',
    };
    return (
      <>
        <View
          style={{
            height: 64,
            backgroundColor: BaseColor.langUNSBtnBack,
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            {state.routes.map((route, index) => {
              const {options} = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;

              const isFocused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };

              enableAnimateInEaseOut();

              return (
                <View key={index}>
                  <TouchableOpacity
                    accessibilityState={isFocused ? {selected: true} : {}}
                    onPress={onPress}
                    style={[
                      {
                        backgroundColor: isFocused
                          ? BaseColor.selectedBack
                          : '#0000',
                        padding: 8,
                        paddingHorizontal: 16,
                        borderRadius: 4,
                        alignItems: 'center',
                        flexDirection: 'row',
                      },
                    ]}>
                    <Image
                      source={ButtonIcons[label]}
                      style={{height: 20, width: 20}}
                      resizeMode="contain"
                      tintColor={
                        isFocused
                          ? BaseColor.inputBottomLine
                          : BaseColor.unselectedBottomTabIcon
                      }
                    />
                    {isFocused && (
                      <CText
                        value={ButtonNames[label]}
                        bold
                        style={{
                          color: isFocused
                            ? BaseColor.inputBottomLine
                            : BaseColor.unselectedBottomTabIcon,
                          fontSize: 12,
                          marginStart: 16,
                        }}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </>
    );
  };

  const BottomTabNavigator = () => {
    return (
      <Tab.Navigator
        tabBar={BottomTabBar}
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name="PortfolioNavigatior"
          component={PortfolioNavigatior}
        />
        <Tab.Screen name="BuySell" component={BuySell} />
        <Tab.Screen name="SendReceive" component={SendReceive} />
      </Tab.Navigator>
    );
  };

  const PortfolioNavigatior = () => {
    return (
      <PStack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <PStack.Screen name="Portfolio" component={Portfolio} />
        <PStack.Screen name="ItemProfile" component={ItemProfile} />
      </PStack.Navigator>
    );
  };

  const HomeDrawerNavigator = () => {
    return (
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        initialRouteName="BottomTabNavigator">
        <Drawer.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
        />
      </Drawer.Navigator>
    );
  };

  return (
    <>
      <StatusBar
        barStyle={dark ? 'light-content' : 'dark-content'}
        backgroundColor={BaseColor.primaryBG}
      />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen
            name="OnboardingUsername"
            component={OnboardingUsername}
          />
          <Stack.Screen name="SecurityScreen" component={SecurityScreen} />
          <Stack.Screen name="PincodeScreen" component={PincodeScreen} />
          <Stack.Screen name="RecoveryOption" component={RecoveryOption} />
          <Stack.Screen name="GeneratePassword" component={GeneratePassword} />
          <Stack.Screen name="GenerateWallet" component={GenerateWallet} />
          <Stack.Screen name="SeedPhrase" component={SeedPhrase} />
          <Stack.Screen name="SeedPhrase2" component={SeedPhrase2} />
          <Stack.Screen
            name="AccountInformation"
            component={AccountInformation}
          />

          <Stack.Screen
            name="HomeDrawerNavigator"
            component={HomeDrawerNavigator}
          />

          <Stack.Screen name="ItemProfile" component={ItemProfile} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="ChangeProfile" component={ChangeProfile} />
          <Stack.Screen
            name="TransactionDetails"
            component={TransactionDetails}
          />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen
            name="DetailedItemScreen"
            component={DetailedItemScreen}
          />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="MyTrades" component={MyTrades} />
          <Stack.Screen name="MyOffers" component={MyOffers} />
          <Stack.Screen name="OfferView" component={OfferView} />
          <Stack.Screen name="Feedback" component={Feedback} />
          <Stack.Screen name="CreateAnOffer" component={CreateAnOffer} />
          <Stack.Screen name="Trade" component={Trade} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="SelectAsset" component={SelectAsset} />
          <Stack.Screen name="AmountScreen" component={AmountScreen} />
          <Stack.Screen name="SendTo" component={SendTo} />
          <Stack.Screen name="ConfirmAmount" component={ConfirmAmount} />
          <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
          <Stack.Screen name="QRScanner" component={QRScanner} />
          <Stack.Screen name="ReceviedPayment" component={ReceviedPayment} />
          <Stack.Screen name="Contacts" component={Contacts} />
        </Stack.Navigator>
      </NavigationContainer>
      <NoInternet />
    </>
  );
}
