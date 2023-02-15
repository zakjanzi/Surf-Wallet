import {t} from 'i18next';
import {isNumber, range} from 'lodash';
import React, {useState} from 'react';
import {View, ScrollView, Image, TouchableOpacity, Text} from 'react-native';
import {AirbnbRating, Rating} from 'react-native-ratings';
import {useSelector} from 'react-redux';
import {DarkColor, LightColor} from '../../config/colors';
import {Images} from '../../config/images';
import CText from '../CText';

export default function BSItemList(props) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const {
    profilePic,
    profileName,
    rating,
    place,
    place_icon,
    priceRange,
    item_icon,
    itemKey,
    price,
    rate,
    type,
    onBtnPress = () => {},
  } = props;

  return (
    <>
      <View style={{marginVertical: 12}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Image
              source={profilePic}
              resizeMode="contain"
              style={{height: 30, width: 30}}
            />
            <CText
              value={profileName}
              medium
              style={{
                fontSize: 12,
                color: BaseColor.text2,
                marginStart: 12,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Image
              source={place_icon}
              resizeMode="contain"
              style={{height: 16, width: 16}}
            />
            <CText
              value={place}
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
          <AirbnbRating
            defaultRating={rating}
            size={10}
            starContainerStyle={{
              backgroundColor: BaseColor.primaryBG,
            }}
            isDisabled
            showRating={false}
            selectedColor={BaseColor.inputBottomLine}
          />
          <CText
            value={t('cashInPerson')}
            style={{
              fontSize: 10,
              color: BaseColor.text2,
            }}
          />
        </View>

        <CText
          value={`${type == 'buy' ? t('selling') : t('buying')}  ${priceRange}`}
          medium
          style={{
            fontSize: 12,
            color: BaseColor.text1,
            marginTop: 16,
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
              source={item_icon}
              resizeMode="contain"
              style={{
                height: 36,
                width: 36,
              }}
            />
            <View
              style={{
                marginStart: 12,
                justifyContent: 'space-between',
                height: 36,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <CText
                  value={itemKey}
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
                  {isNumber(rate) && (
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
                  )}
                  <CText
                    value={isNumber(rate) ? `${rate}%` : `${rate}`}
                    medium
                    style={{
                      color: isNumber(rate)
                        ? rate > 0
                          ? BaseColor.profiteValue
                          : BaseColor.lossValue
                        : BaseColor.text2,
                      fontSize: 8,
                    }}
                  />
                </View>
              </View>
              <CText
                value={`${price} USD`}
                medium
                style={{
                  color: BaseColor.text1,
                  fontSize: 12,
                }}
              />
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              backgroundColor: BaseColor.btnBack2,
              borderRadius: 50,
              paddingHorizontal: 24,
              padding: 8,
              borderWidth: 1,
              borderColor: BaseColor.btnBack2,
            }}
            onPress={onBtnPress}>
            <CText
              value={type == 'buy' ? t('buy') : t('sell')}
              style={{
                fontSize: 12,
                color: BaseColor.whiteColor,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
