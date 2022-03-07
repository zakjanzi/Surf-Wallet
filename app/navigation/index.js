import {NavigationContainer} from '@react-navigation/native';
import {Text, View, TextInput, I18nManager, Appearance} from 'react-native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React, {useEffect} from 'react';
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

// Remove font scale
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

export default function NavStart() {
  const {currentLanguage} = useSelector(state => state.auth);
  const {setDark} = AuthAction;
  const dispatch = useDispatch();

  const colorScheme = Appearance.getColorScheme();

  useEffect(() => {
    if (colorScheme == 'dark') {
      dispatch(setDark(true));
    } else {
      dispatch(setDark(false));
    }
  }, [colorScheme]);

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

  return (
    <>
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
        </Stack.Navigator>
      </NavigationContainer>
      <NoInternet />
    </>
  );
}
