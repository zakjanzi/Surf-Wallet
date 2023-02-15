import React from 'react';
import {Text} from 'react-native';
import {FontFamily} from '../../config/typography';

export default function CText(props) {
  const {value, style, semiBold, bold, medium, extraBold} = props;

  const fontFamily = bold
    ? FontFamily.Inter_Bold
    : semiBold
    ? FontFamily.Inter_SemiBold
    : medium
    ? FontFamily.Inter_Medium
    : extraBold
    ? FontFamily.Inter_ExtraBold
    : FontFamily.Inter_Regular;

  return (
    <>
      <Text style={[{fontFamily: fontFamily}, style]}>{value}</Text>
    </>
  );
}
