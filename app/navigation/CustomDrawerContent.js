import {t} from 'i18next';
import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  I18nManager,
  Appearance,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import CText from '../components/CText';
import {DarkColor, LightColor} from '../config/colors';
import {Images} from '../config/images';

export default function CustomDrawerContent({navigation}) {
  const {currentLanguage, dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const [userName, setuserName] = useState('Swiftbaza915');

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: BaseColor.langUNSBtnBack,
          justifyContent: 'space-between',
        }}>
        <View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 48,
              backgroundColor: BaseColor.drawerTopSection,
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.closeDrawer();
                navigation.navigate('ChangeProfile');
              }}>
              <Image
                source={Images.avatar_1}
                style={{height: 74, width: 74}}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <CText
              value={userName}
              semiBold
              style={{
                color: BaseColor.headerTitle,
                marginTop: 24,
                fontSize: 16,
              }}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.closeDrawer();
                navigation.navigate('Account');
              }}
              style={{
                borderRadius: 18,
                borderWidth: 2,
                borderColor: BaseColor.inputBottomLine,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 24,
                padding: 12,
                paddingHorizontal: 20,
              }}>
              <CText
                value={t('profileNSetting')}
                semiBold
                style={{
                  color: BaseColor.inputBottomLine,
                }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {}}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 16,
              paddingHorizontal: 16,
              borderTopWidth: 2,
              borderBottomWidth: 2,
              borderTopColor: BaseColor.strokeGrey,
              borderBottomColor: BaseColor.strokeGrey,
            }}>
            <Image
              source={dark ? Images.brower_dark : Images.brower_light}
              style={{height: 16, width: 16, marginEnd: 16}}
              resizeMode="contain"
            />
            <CText
              value={t('appBrowser')}
              semiBold
              style={{
                color: BaseColor.text2,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate('MyOffers');
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 16,
              paddingHorizontal: 16,
            }}>
            <Image
              source={dark ? Images.offer_dark : Images.offer_light}
              style={{height: 16, width: 16, marginEnd: 16}}
              resizeMode="contain"
            />
            <CText
              value={t('myOffers')}
              semiBold
              style={{
                color: BaseColor.text2,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate('MyTrades');
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 16,
              paddingHorizontal: 16,
            }}>
            <Image
              source={dark ? Images.trade_dark : Images.trade_light}
              style={{height: 16, width: 16, marginEnd: 16}}
              resizeMode="contain"
            />
            <CText
              value={t('myTrades')}
              semiBold
              style={{
                color: BaseColor.text2,
              }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {}}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 16,
              paddingHorizontal: 16,
              justifyContent: 'space-between',
              borderTopColor: BaseColor.strokeGrey,
              borderTopWidth: 2,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={Images.support}
                style={{height: 16, width: 16, marginEnd: 16}}
                resizeMode="contain"
                tintColor={BaseColor.cccccc}
              />
              <CText
                value={t('support')}
                semiBold
                style={{
                  color: BaseColor.text2,
                }}
              />
            </View>
            <TouchableOpacity>
              <Image
                source={
                  dark
                    ? Images.menuBottom_right_btn_dark
                    : Images.menuBottom_right_btn_light
                }
                style={{height: 22, width: 38}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {}}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 16,
              paddingHorizontal: 16,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={dark ? Images.version_dark : Images.version_light}
                style={{height: 16, width: 16, marginEnd: 16}}
                resizeMode="contain"
              />
              <CText
                value={t('appVersion')}
                semiBold
                style={{
                  color: BaseColor.text2,
                }}
              />
            </View>
            <CText
              value={'1.0.0'}
              semiBold
              style={{
                color: BaseColor.text2,
              }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
