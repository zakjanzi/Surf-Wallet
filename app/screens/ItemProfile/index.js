import {t} from 'i18next';
import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
  FlatList,
  BackHandler,
} from 'react-native';
import {useSelector} from 'react-redux';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import PortListItem from '../../components/PortListItem';
import {DarkColor, LightColor} from '../../config/colors';
import {Images} from '../../config/images';
import styles from './styles';
import Modal from 'react-native-modal';

import {BlurView, VibrancyView} from '@react-native-community/blur';
import {Card} from 'react-native-paper';

export default function ItemProfile({navigation, route}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const [selectedSort, setselectedSort] = useState(0);
  const [sortModal, setsortModal] = useState(false);

  const itemDetails = route?.params?.itemDetail;

  const transactionHistoryArr = [
    {
      send: false,
      date: '30 August, 2022 1:45 PM',
      price: '343.82',
      nativeValue: '0.0060',
    },
    {
      send: true,
      date: '14 July, 2022 4:42 AM',
      price: '112.82',
      nativeValue: '0.0060',
    },
  ];

  const sort_item = [
    {
      id: 0,
      title: t('sent'),
    },
    {
      id: 1,
      title: t('received'),
    },
  ];

  // transaction history list item
  const renderTransactionHistory = ({item, index}) => {
    return (
      <Card
        style={{
          marginBottom: 16,
          backgroundColor: BaseColor.langUNSBtnBack,
          padding: 8,
        }}>
        <PortListItem
          icon={
            item?.send
              ? dark
                ? Images.sent_icon_dark
                : Images.sent_icon
              : dark
              ? Images.received_icon_dark
              : Images.received_icon
          }
          topLeftTxt={item?.send ? t('sent') : t('received')}
          bottomLeftTxt={item?.date}
          bottomLeftTxtColor={BaseColor.text2}
          topRightTxt={`$${item?.price}`}
          topRightTxtColor={
            item?.send ? BaseColor.lossValue : BaseColor.profiteValueDark
          }
          bottomRightTxt={`${item.send ? '-' : '+'}${item?.nativeValue}${
            itemDetails?.key
          }`}
          bottomRightTxtColor={
            item?.send ? BaseColor.lossValue : BaseColor.profiteValueDark
          }
          bottomLeftTxtFontSize={10}
          onPress={() => {
            navigation.navigate('TransactionDetails', {
              transactionDetails: item,
              itemDetails: itemDetails,
            });
          }}
        />
      </Card>
    );
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backPress,
    );

    return () => backHandler.remove();
  }, []);

  const backPress = () => {
    navigation.goBack();
    return true;
  };

  return (
    <>
      <CHeader
        title={itemDetails?.title}
        backBtn
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        <View style={[styles.rowStyle]}>
          <View>
            <CText
              value={`${itemDetails?.title} ${t('balance')}`}
              medium
              style={{fontSize: 12, color: BaseColor.text2}}
            />
            <CText
              value={`$${itemDetails?.price}`}
              style={{fontSize: 24, color: BaseColor.fontHighContrast}}
            />
            <CText
              value={`${itemDetails?.nativeValue} ${itemDetails?.key}`}
              medium
              style={{fontSize: 14, color: BaseColor.fontHighContrast}}
            />
          </View>
          <Image
            source={itemDetails?.icon}
            style={{height: 50, width: 50}}
            resizeMode="contain"
          />
        </View>

        <View style={[styles.rowStyle, {marginTop: 64}]}>
          <CText
            value={t('transactionHistory')}
            medium
            style={{fontSize: 14, color: BaseColor.fontHighContrast}}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setsortModal(true)}>
            <Image
              source={dark ? Images.lower_menu_dark : Images.lower_menu_light}
              style={{height: 20, width: 20}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={transactionHistoryArr}
          keyExtractor={(item, index) => index}
          renderItem={renderTransactionHistory}
          contentContainerStyle={{marginTop: 24}}
        />
      </View>

      {/* sort options modal */}
      <Modal
        style={{margin: 0}}
        isVisible={sortModal}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}
        animationInTiming={1000}
        animationOutTiming={1000}
        useNativeDriverForBackdrop={true}
        onBackButtonPress={() => {
          setsortModal(false);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <View style={{backgroundColor: BaseColor.primaryBG, padding: 16}}>
            <CText
              value={t('sortBy')}
              medium
              style={{
                fontSize: 14,
                color: BaseColor.fontHighContrast,
                textAlign: 'center',
              }}
            />
            <FlatList
              keyExtractor={(item, index) => index}
              data={sort_item}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 16,
                    }}
                    activeOpacity={0.7}
                    onPress={() => {
                      setselectedSort(item?.id);
                      setsortModal(false);
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={
                          selectedSort == item?.id
                            ? dark
                              ? Images.selected_sort_dark
                              : Images.selected_sort_light
                            : dark
                            ? Images.unselected_sort_dark
                            : Images.unselected_sort_light
                        }
                        style={{height: 32, width: 32}}
                        resizeMode="contain"
                      />
                      <CText
                        value={item.title}
                        style={{
                          color:
                            selectedSort == item?.id
                              ? BaseColor.inputBottomLine
                              : BaseColor.text2,
                          fontSize: 12,
                          marginStart: 16,
                        }}
                      />
                    </View>
                    {selectedSort == item?.id && (
                      <Image
                        source={
                          dark
                            ? Images.check_border_dark
                            : Images.check_border_light
                        }
                        style={{height: 14, width: 14}}
                        resizeMode="contain"
                      />
                    )}
                  </TouchableOpacity>
                );
              }}
              contentContainerStyle={{height: 200, marginTop: 24}}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
