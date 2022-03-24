import {t} from 'i18next';
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
  FlatList,
  StatusBar,
  Dimensions,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import PortListItem from '../../components/PortListItem';
import {DarkColor, LightColor} from '../../config/colors';
import {Images} from '../../config/images';
import {FontFamily} from '../../config/typography';
import styles from './styles';

export default function SearchScreen({navigation}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const [searchTxt, setsearchTxt] = useState('');

  //search Data
  const searchData = [
    {
      icon: Images.bitcoin,
      title: 'Bitcoin',
      profite: true,
      plPer: -0.01,
      price: '54,893.13',
      nativeValue: '0.0325474',
      key: 'BTC',
      chart: Images.bit_chart,
    },
  ];

  // searched list item
  const renderSearchItem = ({item, index}) => {
    return (
      <View>
        <PortListItem
          icon={item?.icon}
          topLeftTxt={item?.title}
          bottomLeftTxt={`${item?.key}`}
          topRightTxt={`$${item?.price}`}
          bottomRightTxt={`${item?.plPer}%`}
          bottomLeftTxtColor={BaseColor.text2}
          bottomRightTxtColor={
            item.plPer > 0 ? BaseColor.profiteValue : BaseColor.lossValue
          }
          onPress={() => {}}
        />
      </View>
    );
  };

  return (
    <>
      <CHeader
        title={t('search')}
        backBtn
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        <View style={[styles.rowStyle]}>
          <View
            style={[
              styles.inputCont,
              {
                backgroundColor: BaseColor.selectedBack,
                borderColor: BaseColor.strokeGrey,
              },
            ]}>
            <Image
              source={Images.search}
              style={{
                height: 16,
                width: 16,
              }}
              resizeMode="contain"
            />
            <TextInput
              value={searchTxt}
              onChangeText={setsearchTxt}
              style={{
                flex: 1,
                color: BaseColor.text2,
                marginStart: 16,
                fontSize: 12,
                height: 40,
                fontFamily: FontFamily.Inter_Medium,
              }}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{marginStart: 16}}
            onPress={() => setsearchTxt('')}>
            <CText
              value={t('cancel')}
              medium
              style={{
                color: BaseColor.inputBottomLine,
                fontSize: 12,
              }}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          data={searchData}
          keyExtractor={(item, index) => index}
          renderItem={renderSearchItem}
          contentContainerStyle={{flexGrow: 1, paddingBottom: 60}}
          style={{
            marginTop: 48,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
}
