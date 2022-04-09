import {t} from 'i18next';
import React, {useRef, useState} from 'react';
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
import CHeader from '../../components/CHeader';
import {DarkColor, LightColor} from '../../config/colors';
import styles from './styles';
import ActiveTrades from './ActiveTrades';
import CompletedTrades from './CompletedTrades';
import {SceneMap, TabView} from 'react-native-tab-view';
import PagerView from 'react-native-pager-view';
import CText from '../../components/CText';
import CTabView from '../../components/CTabView';

export default function MyTrades({navigation}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const [selectedIndex, setselectedIndex] = useState(0);
  const [routes] = useState([
    {key: 'active', title: 'ActiveTrades', screen: <ActiveTrades />},
    {key: 'completed', title: 'CompletedTrades', screen: <CompletedTrades />},
  ]);

  return (
    <>
      <CHeader
        title={t('myTrades')}
        backBtn
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        <CTabView
          routes={routes}
          initialPage={0}
          selectedIndex={selectedIndex}
          setselectedIndex={setselectedIndex}
        />
      </View>
    </>
  );
}
