import {t} from 'i18next';
import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import CHeader from '../../components/CHeader';
import {DarkColor, LightColor} from '../../config/colors';
import styles from './styles';
import {Images} from '../../config/images';
import CText from '../../components/CText';
import {enableAnimateInEaseOut} from '../../config/commonFunctions';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export default function Notifications({navigation}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const progress = useSharedValue(0);
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
    };
  }, []);

  useEffect(() => {
    progress.value = withTiming(1, {duration: 2000});
  }, []);

  const data = [
    {
      title: 'You Received 0.000042 BTC from @Joe_14.',
      descp: '@Joe_14 sent you 0.0000042 BTC ($30.40).',
      time: 'TODAY 4:33PM',
    },
    {
      title: 'You Sent 4,781 VET to 0xtUys3blD7-1kLseRgq.',
      descp: 'You sent 0XtUys3blD71kLseRgq 21 1.5 ETH ($4276.41).',
      time: 'TODAY 1:27PM',
    },
    {
      title: 'Trade canceled with 0xBadran.',
      descp: 'Trade canceled. Tap for more info.',
      time: 'Yesterday 5:08AM',
    },
    {
      title: 'Trade initiated with @0xBadran.',
      descp: '@0xBadran started a trade.',
      time: '20/04/2022 6:32 PM',
    },
    {
      title: 'Sign up Successful.',
      descp: 'You’re signed up. Welcome!',
      time: '15/032021, 4:33PM',
    },
  ];

  enableAnimateInEaseOut();

  // notification list item
  const renderNotification = ({item, index}) => {
    return (
      <View
        style={[
          {
            backgroundColor: BaseColor.securityBtnColor,
            borderRadius: 12,
            padding: 10,
            marginVertical: 8,
            flexDirection: 'row',
          },
        ]}>
        <Image
          source={Images.notification_icon}
          style={{height: 22, width: 22}}
          resizeMode="contain"
        />
        <View style={{flex: 1, marginStart: 8}}>
          <CText
            value={item?.title}
            medium
            style={{
              color: BaseColor.inputBottomLine,
              fontSize: 13,
            }}
          />
          <CText
            value={item?.descp}
            medium
            style={{
              color: BaseColor.boardingTxt,
              fontSize: 11,
              marginVertical: 8,
            }}
          />
        </View>
        <CText
          value={item?.time}
          medium
          style={{
            color: BaseColor.boardingTxt,
            fontSize: 9,
            marginStart: 8,
          }}
        />
      </View>
    );
  };

  return (
    <>
      <CHeader
        title={t('notifications')}
        backBtn
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        <FlatList
          keyExtractor={(item, index) => index}
          data={data}
          renderItem={renderNotification}
        />
      </View>
    </>
  );
}
