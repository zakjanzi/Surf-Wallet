import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {DarkColor, LightColor} from '../../config/colors';
import CText from '../CText';

export default function CButton(props) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);
  const {
    value = 'title',
    containerStyle = {},
    titleStyle = {},
    onPress = () => {},
    disable = false,
  } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        {
          borderRadius: 24,
          backgroundColor: disable ? BaseColor.disbtnColor : BaseColor.btnColor,
          height: 56,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
      disabled={disable}>
      <CText
        value={value}
        semiBold
        style={{color: LightColor.white, fontSize: 14}}
      />
    </TouchableOpacity>
  );
}
