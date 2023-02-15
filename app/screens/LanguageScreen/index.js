import React, {useEffect, useState} from 'react';
import {
  I18nManager,
  Image,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CText from '../../components/CText';
import {DarkColor, LightColor} from '../../config/colors';
import {enableAnimateInEaseOut} from '../../config/commonFunctions';
import {Images} from '../../config/images';
import styles from './styles';
import AuthAction from '../../redux/reducer/auth/actions';
import i18n from '../../language/i18n';
import RNRestart from 'react-native-restart';
import {t} from 'i18next';

export default function LanguageScreen({navigation}) {
  const {setDark, setCurrentLanguage} = AuthAction;
  const dispatch = useDispatch();
  const {dark, currentLanguage} = useSelector(state => state.auth);

  const [currentLang, setcurrentLang] = useState('');
  const [darkTheme, setdarkTheme] = useState(dark);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);
  const [btnBack, setbtnBack] = useState();

  // change theme function
  const changeTheme = () => {
    setdarkTheme(!darkTheme);
    dispatch(setDark(!darkTheme));
  };

  useEffect(() => {
    setBaseColor(dark ? DarkColor : LightColor);
  }, [darkTheme]);

  // change language function
  const changeLanguage = async value => {
    i18n
      .changeLanguage(value)
      .then(async () => {
        // setLanguage(value);
        if (value == 'ar') {
          setcurrentLang('ar');
          dispatch(setCurrentLanguage('ar'));
          await I18nManager.forceRTL(true);
        } else {
          setcurrentLang('en');
          dispatch(setCurrentLanguage('en'));
          await I18nManager.forceRTL(false);
        }
        RNRestart.Restart();
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <StatusBar
        barStyle={darkTheme ? 'light-content' : 'dark-content'}
        backgroundColor={BaseColor.primaryBG}
      />
      <View
        style={[
          styles.root,
          {
            backgroundColor: BaseColor.primaryBG,
          },
        ]}>
        <View style={styles.rowStyle}>
          <TouchableOpacity
            style={[
              styles.btnStyle,
              {
                backgroundColor:
                  currentLang == 'en'
                    ? BaseColor.langSBtnBack
                    : BaseColor.langUNSBtnBack,
              },
            ]}
            activeOpacity={0.7}
            onPress={() => {
              if (currentLanguage != 'en') {
                console.log(
                  '🚀 ~ file: index.js ~ line 82 ~ LanguageScreen ~ currentLang',
                  currentLang,
                );
                changeLanguage('en');
              } else {
                setcurrentLang('en');
              }
              setTimeout(() => {
                navigation.navigate('OnboardingScreen');
              }, 500);
            }}>
            <CText
              value="English"
              semiBold
              style={{
                color:
                  currentLang == 'en'
                    ? BaseColor.langSTxtBack
                    : BaseColor.langUNSTxtBack,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btnStyle,
              {
                backgroundColor:
                  currentLang == 'ar'
                    ? BaseColor.langSBtnBack
                    : BaseColor.langUNSBtnBack,
              },
            ]}
            activeOpacity={0.7}
            onPress={() => {
              if (currentLanguage != 'ar') {
                changeLanguage('ar');
              } else {
                setcurrentLang('ar');
              }
              setTimeout(() => {
                navigation.navigate('OnboardingScreen');
              }, 500);
            }}>
            <Image
              source={Images.arabic_text}
              resizeMode="contain"
              style={{
                height: 12,
              }}
              tintColor={
                currentLang == 'ar'
                  ? BaseColor.langSTxtBack
                  : BaseColor.langUNSTxtBack
              }
            />
            {/* <CText
              value="عربي"
              semiBold
              style={{
                color:
                  currentLang == 'ar'
                    ? BaseColor.langSTxtBack
                    : BaseColor.langUNSTxtBack,
                transform: [{rotateY: '180deg'}],
              }}
            /> */}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.themeCont]}
          onPress={() => {
            changeTheme();
          }}>
          <Image
            source={darkTheme ? Images.light_moon : Images.dark_moon}
            style={{height: 16, width: 16}}
          />
          <CText
            value={darkTheme ? t('lightMode') : t('darkMode')}
            medium
            style={{color: BaseColor.fontHighContrast, marginStart: 16}}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}
