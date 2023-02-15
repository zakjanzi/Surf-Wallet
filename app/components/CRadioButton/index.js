import React, {useState} from 'react';

import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  Dimensions,
  Modal,
} from 'react-native';
import {useSelector} from 'react-redux';
import {DarkColor, LightColor} from '../../config/colors';
import {Images} from '../../config/images';

export default function CRadioButton(props) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const {checked = false, onPress = () => {}, size = 16} = props;

  const checkedImg = dark
    ? Images.selected_radio_dark
    : Images.selected_radio_light;
  const uncheckedImg = dark
    ? Images.unselected_radio_dark
    : Images.unselected_radio_light;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        onPress();
      }}>
      <Image
        source={checked ? checkedImg : uncheckedImg}
        style={{height: size, width: size}}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}
