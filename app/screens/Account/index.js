import {t} from 'i18next';
import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  I18nManager,
  Switch,
  StatusBar,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import {DarkColor, LightColor} from '../../config/colors';
import {Images} from '../../config/images';
import styles from './styles';
import AuthAction from '../../redux/reducer/auth/actions';
import RNRestart from 'react-native-restart';
import i18n from '../../language/i18n';

export default function Account({navigation}) {
  const {setDark, setCurrentLanguage} = AuthAction;
  const dispatch = useDispatch();
  const {dark, currentLanguage} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const [username, setusername] = useState('Swiftbaza915');

  const [currentLang, setcurrentLang] = useState(currentLanguage);
  const [darkTheme, setdarkTheme] = useState(dark);

  //change theme
  const changeTheme = () => {
    setdarkTheme(!darkTheme);
    dispatch(setDark(!darkTheme));
  };

  useEffect(() => {
    setBaseColor(dark ? DarkColor : LightColor);
  }, [darkTheme]);

  //change language
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
      <CHeader
        title={t('account')}
        backBtn
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <CText
            value={t('settings')}
            style={{
              fontSize: 12,
              color: BaseColor.text2,
            }}
          />
          <TouchableOpacity
            style={[styles.rowStyle, {marginTop: 24}]}
            activeOpacity={0.7}>
            <View>
              <CText
                value={t('usernamePL')}
                style={{
                  fontSize: 12,
                  color: BaseColor.text2,
                }}
              />
              <CText
                value={username}
                medium
                style={{
                  fontSize: 12,
                  color: BaseColor.text1,
                }}
              />
            </View>
            <Image
              source={
                dark
                  ? Images.right_arrow_acount_dark
                  : Images.right_arrow_acount_light
              }
              style={{height: 16, width: 16}}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <CText
            value={t('howYouAppear')}
            style={{
              fontSize: 12,
              color: BaseColor.text2,
            }}
          />

          <TouchableOpacity
            style={[styles.rowStyle, {marginTop: 24, paddingVertical: 16}]}
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('ChangePassword');
            }}>
            <CText
              value={t('changePassword')}
              medium
              style={{
                fontSize: 14,
                color: BaseColor.text1,
              }}
            />
            <Image
              source={
                dark
                  ? Images.right_arrow_acount_dark
                  : Images.right_arrow_acount_light
              }
              style={{height: 16, width: 16}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View
            style={[styles.rowStyle, {marginTop: 8, paddingVertical: 16}]}
            activeOpacity={0.7}>
            <CText
              value={t('language')}
              medium
              style={{
                fontSize: 14,
                color: BaseColor.text1,
              }}
            />
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  borderRadius: 6,
                  backgroundColor:
                    currentLang == 'en'
                      ? BaseColor.inputBottomLine
                      : BaseColor.primaryBG,
                  padding: 10,
                  borderWidth: 1,
                  borderColor:
                    currentLang == 'en'
                      ? BaseColor.inputBottomLine
                      : BaseColor.inputBorder,
                  marginEnd: 12,
                }}
                activeOpacity={0.7}
                onPress={() => {
                  if (currentLang != 'en') {
                    console.log(
                      '🚀 ~ file: index.js ~ line 82 ~ LanguageScreen ~ currentLang',
                      currentLang,
                    );
                    changeLanguage('en');
                  }
                }}>
                <CText
                  value={'English'}
                  style={{
                    fontSize: 10,
                    color:
                      currentLang == 'en'
                        ? BaseColor.primaryBG
                        : BaseColor.inputBorder,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderRadius: 6,
                  backgroundColor:
                    currentLang == 'ar'
                      ? BaseColor.inputBottomLine
                      : BaseColor.primaryBG,
                  padding: 10,
                  borderWidth: 1,
                  borderColor:
                    currentLang == 'ar'
                      ? BaseColor.inputBottomLine
                      : BaseColor.inputBorder,
                }}
                activeOpacity={0.7}
                onPress={() => {
                  if (currentLang != 'ar') {
                    changeLanguage('ar');
                  }
                }}>
                <CText
                  value={'Arabic'}
                  style={{
                    fontSize: 10,
                    color:
                      currentLang == 'ar'
                        ? BaseColor.primaryBG
                        : BaseColor.inputBorder,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.rowStyle, {marginTop: 8, paddingVertical: 16}]}
            activeOpacity={0.7}>
            <CText
              value={t('darkMode')}
              medium
              style={{
                fontSize: 14,
                color: BaseColor.text1,
              }}
            />
            <Switch
              trackColor={{
                false: BaseColor.text2,
                true: BaseColor.inputBorder,
              }}
              thumbColor={BaseColor.inputBottomLine}
              ios_backgroundColor={BaseColor.inputBorder}
              onValueChange={val => {
                console.log(
                  '🚀 ~ file: index.js ~ line 226 ~ Account ~ val',
                  val,
                );
                changeTheme();
              }}
              value={darkTheme}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
}
