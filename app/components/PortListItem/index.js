import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import CText from '../../components/CText';
import {DarkColor, LightColor} from '../../config/colors';
import {Images} from '../../config/images';
import styles from './styles';

export default function PortListItem(props) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const {
    icon,
    topLeftTxt,
    bottomLeftTxt,
    topRightTxt,
    bottomRightTxt,
    topLeftTxtColor = BaseColor.portTitle,
    bottomLeftTxtColor = BaseColor.profiteValueDark,
    topRightTxtColor = BaseColor.portTitle,
    bottomRightTxtColor = BaseColor.fontLowContrast,
    bottomLeftTxtFontSize = 14,
    centerImage,
    onPress = () => {},
  } = props;

  return (
    <>
      <TouchableOpacity
        style={[styles.portCont]}
        activeOpacity={0.7}
        onPress={() => {
          onPress();
        }}>
        <View style={[styles.partContO]}>
          <Image
            source={icon}
            style={{height: 34, width: 34}}
            resizeMode="contain"
          />
          <View
            style={{
              marginStart: 16,
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}>
            <CText
              value={topLeftTxt}
              style={{
                fontSize: 14,
                color: topLeftTxtColor,
                textAlign: 'center',
              }}
            />
            <CText
              value={`${bottomLeftTxt}`}
              style={{
                fontSize: bottomLeftTxtFontSize,
                color: bottomLeftTxtColor,
                textAlign: 'center',
              }}
            />
          </View>
        </View>
        {centerImage && (
          <View style={{flex: 1, alignItems: 'center'}}>
            <Image
              source={centerImage}
              style={{width: 60, height: 24}}
              resizeMode="contain"
            />
          </View>
        )}
        <View
          style={{
            marginStart: 16,
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <CText
            value={`${topRightTxt}`}
            style={{
              fontSize: 14,
              color: topRightTxtColor,
              textAlign: 'center',
            }}
          />
          <CText
            value={`${bottomRightTxt}`}
            style={{
              fontSize: 14,
              color: bottomRightTxtColor,
              textAlign: 'center',
            }}
          />
        </View>
      </TouchableOpacity>
    </>
  );
}
