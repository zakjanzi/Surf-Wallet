import {t} from 'i18next';
import React, {useState} from 'react';
import {View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import {DarkColor, LightColor} from '../../config/colors';
import {Images} from '../../config/images';
import styles from './styles';

export default function SecurityScreen({navigation}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const options = [
    {
      title: t('faceID'),
      icon: dark ? Images.faceid_dark : Images.faceid_light,
      onPress: () => {},
    },
    {
      title: t('fingerprint'),
      icon: dark ? Images.fingerprint_dark : Images.fingerprint_light,
      onPress: () => {},
    },
    {
      title: t('pincode'),
      icon: dark ? Images.pincode_dark : Images.pincode_light,
      onPress: () => {
        navigation.navigate('PincodeScreen');
      },
    },
    {
      title: t('password'),
      icon: dark ? Images.lock_dark : Images.lock_light,
      onPress: () => {},
    },
  ];

  return (
    <>
      <CHeader
        title={t('security')}
        backBtn
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View
        style={[styles.root, {flex: 1, backgroundColor: BaseColor.primaryBG}]}>
        <ScrollView
          contentContainerStyle={[
            {flexGrow: 1, justifyContent: 'space-between'},
          ]}>
          <View>
            <CText
              value={t('secureYourWallet')}
              bold
              style={[styles.titleStyle, {color: BaseColor.inputBottomLine}]}
            />
            <Image source={Images.security_jar} style={styles.imageSty} />
          </View>

          <View>
            {options.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.btnCont,
                    {
                      backgroundColor: BaseColor.securityBtnColor,
                    },
                  ]}
                  activeOpacity={0.7}
                  onPress={item.onPress}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={item.icon}
                      style={styles.btnIcon}
                      resizeMode="contain"
                    />
                    <CText
                      value={item.title}
                      medium
                      style={{
                        color: BaseColor.headerTitle,
                        marginLeft: 24,
                        fontSize: 14,
                      }}
                    />
                  </View>
                  <Image
                    source={
                      dark ? Images.right_arrow_dark : Images.right_arrow_light
                    }
                    style={{height: 14, width: 14}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </>
  );
}
