import {t} from 'i18next';
import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import {useSelector} from 'react-redux';
import TradeListItem from '../../../components/TradeListItem';
import {DarkColor, LightColor} from '../../../config/colors';
import styles from '../styles';

export default function ActiveTrades() {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const data = [
    {
      amount: 25.0,
      cryptoAmount: '0.000062 BTC',
      createdTime: '2021-01-30 12:55pm',
    },
    {
      amount: 450,
      cryptoAmount: '0.0003243 BTC',
      createdTime: '2021-01-30 10:45pm',
    },
  ];

  const renderItems = ({item, index}) => {
    return (
      <View>
        <TradeListItem
          title1={t('amount')}
          value1={item?.amount}
          title2={t('cryptoAmount')}
          value2={item?.cryptoAmount}
          title3={t('createdTime')}
          value3={item?.createdTime}
          type={'active'}
          onDeclinePress={() => {}}
          onAcceptPress={() => {}}
          onPress={() => {}}
        />
        {index != data.length - 1 && (
          <View
            style={{
              height: 2,
              width: '96%',
              backgroundColor: BaseColor.divider1,
              alignSelf: 'center',
            }}
          />
        )}
      </View>
    );
  };

  return (
    <>
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        <FlatList
          keyExtractor={(item, index) => index}
          data={data}
          renderItem={renderItems}
          contentContainerStyle={{marginTop: 16, paddingBottom: 16}}
        />
      </View>
    </>
  );
}
