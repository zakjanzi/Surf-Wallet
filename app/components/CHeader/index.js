import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {DarkColor, LightColor} from '../../config/colors';
import {Images} from '../../config/images';
import CText from '../CText';

export default function CHeader(props) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const {
    title = '',
    backBtn,
    onBackPress = () => {},
    leftIcon,
    onLeftIconPress = () => {},
    renderCenter = () => {},
    rightIcon,
    onRightIconPress = () => {},
    rightIconSize = 24,
    style,
  } = props;

  useEffect(() => {
    setBaseColor(dark ? DarkColor : LightColor);
  }, [dark]);

  return (
    <>
      <View
        style={[
          {
            backgroundColor: BaseColor.primaryBG,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
          },
          style,
        ]}>
        {title ? (
          <CText
            value={title}
            bold
            style={{
              color: BaseColor.headerTitle,
              fontSize: 16,
            }}
          />
        ) : (
          <View
            style={{
              width: '80%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {renderCenter()}
          </View>
        )}
      </View>
      {backBtn ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            onBackPress();
          }}
          style={{
            position: 'absolute',
            padding: 16,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={dark ? Images.back_arrow_dark : Images.back_arrow}
            style={{height: 18, width: 18}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : leftIcon ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            onLeftIconPress();
          }}
          style={{
            position: 'absolute',
            padding: 16,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={leftIcon}
            style={{height: 18, width: 18}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : null}
      {rightIcon && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            onRightIconPress();
          }}
          style={{
            position: 'absolute',
            right: 0,
            padding: 16,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={rightIcon}
            style={{height: rightIconSize, width: rightIconSize}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </>
  );
}
