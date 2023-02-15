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
import {DarkColor, LightColor} from '../../config/colors';
import {Images} from '../../config/images';
import CText from '../CText';

export default function MoreItemHeader(props) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const {title, onPress = () => {}} = props;
  return (
    <>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <CText
          value={title}
          semiBold
          style={{
            fontSize: 14,
            color: BaseColor.text1,
          }}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            onPress();
          }}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <CText
            value={t('seeAll')}
            semiBold
            style={{
              fontSize: 10,
              color: BaseColor.inputBottomLine,
            }}
          />
          <Image
            source={Images.right_arrow_acount_dark}
            resizeMode="contain"
            style={{
              height: 8,
              width: 8,
              marginStart: 8,
            }}
            tintColor={BaseColor.inputBottomLine}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}
