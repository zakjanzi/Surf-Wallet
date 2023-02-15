import {t} from 'i18next';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  LayoutAnimation,
  ScrollView,
  Text,
  TouchableOpacity,
  UIManager,
  View,
  StatusBar,
} from 'react-native';
import {useSelector} from 'react-redux';
import CButton from '../../components/CButton';
import CText from '../../components/CText';
import {DarkColor, LightColor} from '../../config/colors';
import {
  enableAnimateInEaseOut,
  enableAnimateLinear,
} from '../../config/commonFunctions';
import {Images} from '../../config/images';
import styles from './styles';

// UIManager.setLayoutAnimationEnabledExperimental(true);

export default function OnboardingScreen({navigation}) {
  const {dark} = useSelector(state => state.auth);
  const [curIndex, setcurIndex] = useState(0);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);
  const flatlistRef = useRef();

  const walkArr = [
    {
      title: t('onboardtitle1'),
      desciption: t('onboardDesc1'),
      image: dark ? Images.dark_onboarding_1 : Images.light_onboarding_1,
    },
    {
      title: t('onboardtitle2'),
      desciption: t('onboardDesc2'),
      image: dark ? Images.dark_onboarding_2 : Images.light_onboarding_2,
    },
    {
      title: t('onboardtitle3'),
      desciption: t('onboardDesc3'),
      image: dark ? Images.dark_onboarding_3 : Images.light_onboarding_3,
    },
  ];

  const onViewRef = React.useRef(({viewableItems, changed}) => {
    setcurIndex(changed[0].index);
    // Use viewable items in state or as intended
  });

  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  // render single page
  const renderPage = ({item, index}) => {
    return (
      <View
        style={{
          width: Dimensions.get('window').width,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Image
          source={item.image}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height / 2.2,
            marginTop: 8,
          }}
          resizeMode="center"
        />
        <View style={{marginTop: 24}}>
          <CText
            value={item.title}
            extraBold
            style={[styles.title, {color: BaseColor.onBoardTitle}]}
          />
          <CText
            value={item.desciption}
            medium
            style={[styles.desciption, {color: BaseColor.onBoardDesc}]}
          />
        </View>

        <View style={styles.dotCont}>
          {walkArr.map((item, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    height: index == curIndex ? 8 : 4,
                    width: index == curIndex ? 8 : 4,
                    backgroundColor:
                      index == curIndex
                        ? BaseColor.primary
                        : BaseColor.boardingSkip,
                  },
                ]}></View>
            );
          })}
        </View>
      </View>
    );
  };

  // enableAnimateInEaseOut();
  return (
    <>
      <StatusBar
        barStyle={dark ? 'light-content' : 'dark-content'}
        backgroundColor={BaseColor.primaryBG}
        hidden={false}
      />
      <View style={{flex: 1, backgroundColor: BaseColor.primaryBG}}>
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={dark ? Images.back_arrow_dark : Images.back_arrow}
              style={{height: 18, width: 18}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <FlatList
          ref={flatlistRef}
          data={walkArr}
          renderItem={renderPage}
          keyExtractor={(item, index) => index}
          pagingEnabled
          horizontal
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          showsHorizontalScrollIndicator={false}
        />

        {curIndex == 2 ? (
          <View style={{padding: 16}}>
            <CButton
              value={t('createWallet')}
              onPress={() => {
                navigation.navigate('OnboardingUsername');
              }}
            />
            <TouchableOpacity
              style={{padding: 24}}
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('SeedPhrase2', {type: 'already'});
              }}>
              <CText
                value={t('alreadyWallet')}
                medium
                style={{
                  color: BaseColor.boardingTxt,
                  textAlign: 'center',
                  marginTop: 8,
                }}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.bottomBar}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                flatlistRef.current.scrollToIndex({
                  animated: true,
                  index: 2,
                });
              }}>
              <CText value={t('skip')} medium style={styles.skipTxt} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                flatlistRef.current.scrollToIndex({
                  animated: true,
                  index: curIndex + 1,
                });
              }}
              style={[
                styles.nextCont,
                {
                  backgroundColor: BaseColor.whiteColor,
                },
              ]}>
              <Image
                source={Images.light_right_arrow}
                style={{height: 24, width: 24}}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  );
}
