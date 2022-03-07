import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {DarkColor, LightColor} from '../../config/colors';
import {Images} from '../../config/images';
import CText from '../CText';

export default function CHeader(props) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const {title = '', backBtn, onBackPress = () => {}} = props;

  return (
    <>
      <View
        style={{
          backgroundColor: BaseColor.primaryBG,
          height: 80,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CText
          value={title}
          bold
          style={{
            color: BaseColor.headerTitle,
            fontSize: 16,
          }}
        />
      </View>
      {backBtn && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            onBackPress();
          }}
          style={{position: 'absolute', left: 16, top: 31}}>
          <Image
            source={dark ? Images.back_arrow_dark : Images.back_arrow}
            style={{height: 18, width: 18}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </>
  );
}
