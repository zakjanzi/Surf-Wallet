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

export default function CCheckBox(props) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const {checked = false, onPress = () => {}, size = 16} = props;

  const checkedImg = dark ? Images.checked_dark : Images.checked_light;
  const uncheckedImg = dark ? Images.unchecked_light : Images.unchecked_light;

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
