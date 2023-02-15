import {t} from 'i18next';
import React, {useState} from 'react';
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
} from 'react-native';
import {useSelector} from 'react-redux';
import {DarkColor, LightColor} from '../../config/colors';
import {Images} from '../../config/images';
import CText from '../CText';

export default function TradeListItem(props) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const {
    title1,
    title2,
    title3,
    value1,
    value2,
    value3,
    type,
    onDeclinePress = () => {},
    onAcceptPress = () => {},
    onPress = () => {},
  } = props;

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={{padding: 12}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <CText
            value={title1}
            medium
            style={{
              color: BaseColor.text2,
              fontSize: 12,
            }}
          />
          <CText
            value={value1}
            medium
            style={{
              color: BaseColor.text1,
              marginStart: 10,
              fontSize: 12,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <CText
            value={title2}
            medium
            style={{
              color: BaseColor.text2,
              fontSize: 12,
            }}
          />
          <CText
            value={value2}
            medium
            style={{
              color: BaseColor.text1,
              marginStart: 10,
              fontSize: 12,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <CText
            value={title3}
            medium
            style={{
              color: BaseColor.text2,
              fontSize: 12,
            }}
          />
          <CText
            value={value3}
            medium
            style={{
              color: BaseColor.text1,
              marginStart: 10,
              fontSize: 12,
            }}
          />
        </View>
        {type == 'active' ? (
          <View style={{marginTop: 12}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={Images.info_light}
                style={{height: 16, width: 16}}
                resizeMode="contain"
                tintColor={BaseColor.availableName}
              />
              <CText
                value={t('active')}
                medium
                style={{
                  color: BaseColor.availableName,
                  fontSize: 12,
                  marginStart: 6,
                }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 16,
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  backgroundColor: BaseColor.btnBack2,
                  borderRadius: 50,
                  paddingHorizontal: 16,
                  padding: 8,
                  borderWidth: 1,
                  borderColor: BaseColor.btnBack2,
                }}
                onPress={onAcceptPress}>
                <CText
                  value={t('accept')}
                  style={{
                    fontSize: 12,
                    color: BaseColor.whiteColor,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  backgroundColor: BaseColor.primaryBG,
                  borderRadius: 50,
                  paddingHorizontal: 16,
                  padding: 8,
                  borderWidth: 1,
                  borderColor: BaseColor.inputBottomLine,
                  marginStart: 16,
                }}
                onPress={onDeclinePress}>
                <CText
                  value={t('decline')}
                  style={{
                    fontSize: 12,
                    color: BaseColor.inputBottomLine,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </TouchableOpacity>
    </>
  );
}
