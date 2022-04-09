import {t} from 'i18next';
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Linking,
  FlatList,
} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import {useSelector} from 'react-redux';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import {DarkColor, LightColor} from '../../config/colors';
import styles from './styles';

export default function Feedback({navigation}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const [selectedTopMenu, setselectedTopMenu] = useState('all');

  const feedbackData = [
    {
      name: 'Anononymous',
      rate: 5,
      msg: 'Good trade.',
      time: 'Sep 04 2021',
    },
    {
      name: 'Anononymous',
      rate: 0,
      msg: 'Very slow',
      time: 'Sep 04 2021',
    },
  ];

  //horizontal menu tabs
  const topHorizontalMenu = [
    {
      title: 'All',
      id: 'all',
    },
    {
      title: 'Positive',
      id: 'positive',
      num: 1,
    },
    {
      title: 'Negative',
      id: 'negative',
      num: 1,
    },
  ];

  const renderFeedBack = ({item, index}) => {
    return (
      <View
        key={index}
        style={[styles.offerCont, {backgroundColor: BaseColor.langUNSBtnBack}]}>
        <View style={[styles.rowStyle, {justifyContent: 'space-between'}]}>
          <CText
            value={item?.name}
            medium
            style={{color: BaseColor.text2, fontSize: 12}}
          />
          <CText
            value={item?.time}
            style={{color: BaseColor.text1, fontSize: 12}}
          />
        </View>
        <View
          style={[
            styles.rowStyle,
            {justifyContent: 'space-between', marginTop: 12},
          ]}>
          <CText
            value={item?.msg}
            medium
            style={{color: BaseColor.text1, fontSize: 12}}
          />

          <AirbnbRating
            defaultRating={item?.rate}
            size={10}
            starContainerStyle={{
              backgroundColor: BaseColor.primaryBG,
            }}
            isDisabled
            showRating={false}
            selectedColor={BaseColor.inputBottomLine}
          />
        </View>
      </View>
    );
  };

  // top tab render function
  const renderTopMenu = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.topMenuCont,
          {
            backgroundColor:
              selectedTopMenu == item.id
                ? BaseColor.inputBottomLine
                : BaseColor.selectedBack,
          },
        ]}
        onPress={() => {
          setselectedTopMenu(item.id);
        }}>
        <CText
          value={item?.num ? `${item.title} (${item?.num})` : `${item.title}`}
          medium
          style={{
            fontSize: 12,
            color:
              selectedTopMenu == item.id
                ? BaseColor.langUNSBtnBack
                : BaseColor.grey70,
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <CHeader
        title={t('feedback')}
        backBtn
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        <View>
          <FlatList
            keyExtractor={(item, index) => index}
            data={topHorizontalMenu}
            renderItem={renderTopMenu}
            horizontal
            style={{flex: 0}}
          />
        </View>
        <FlatList
          keyExtractor={(item, index) => index}
          data={feedbackData}
          showsVerticalScrollIndicator={false}
          renderItem={renderFeedBack}
        />
      </View>
    </>
  );
}
