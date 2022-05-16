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

export default function OfferListItem(props) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const {
    type,
    value,
    place,
    key = 'BTC',
    icon,
    price,
    rate,
    place_flag,
  } = props;
  console.log('🚀 ~ file: index.js ~ line 23 ~ OfferListItem ~ key', key);

  return (
    <>
      <View style={{paddingVertical: 10}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <CText
            value={type}
            medium
            style={{
              fontSize: 12,
              color: BaseColor.text2,
            }}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={place_flag}
              style={{height: 18, width: 18}}
              resizeMode="contain"
            />
            <CText
              value={place}
              medium
              style={{
                fontSize: 12,
                color: BaseColor.text1,
                marginStart: 12,
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <CText
            value={value}
            medium
            style={{
              fontSize: 12,
              color: BaseColor.text1,
            }}
          />
          <CText
            value={t('cashInPerson')}
            style={{
              fontSize: 12,
              color: BaseColor.text2,
              marginStart: 12,
            }}
          />
        </View>
        <CText
          value={t('fixedPrice')}
          style={{
            fontSize: 10,
            color: BaseColor.text2,
            marginTop: 10,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 16,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 16,
              justifyContent: 'space-between',
            }}>
            <Image
              source={icon}
              resizeMode="contain"
              style={{
                height: 36,
                width: 36,
              }}
            />
            <View
              style={{
                marginStart: 12,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <CText
                  value={key}
                  medium
                  style={{
                    color: BaseColor.text1,
                    fontSize: 10,
                  }}
                />
                <View
                  style={{
                    backgroundColor: BaseColor.unselectedPrivacyback,
                    paddingHorizontal: 12,
                    paddingVertical: 2,
                    borderRadius: 4,
                    marginStart: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={
                      rate > 0
                        ? Images.profite_arrow_dark
                        : Images.loss_arrow_dark
                    }
                    resizeMode="contain"
                    style={{
                      height: 8,
                      width: 8,
                      marginEnd: 6,
                    }}
                  />
                  <CText
                    value={`${rate}%`}
                    medium
                    style={{
                      color:
                        rate > 0 ? BaseColor.profiteValue : BaseColor.lossValue,
                      fontSize: 8,
                    }}
                  />
                </View>
              </View>
              <CText
                value={price}
                medium
                style={{
                  color: BaseColor.text1,
                  fontSize: 12,
                }}
              />
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Image
              source={dark ? Images.delete : Images.delete}
              resizeMode="contain"
              style={{
                height: 16,
                width: 16,
                alignSelf: 'flex-end',
              }}
              tintColor={BaseColor.redCC}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
