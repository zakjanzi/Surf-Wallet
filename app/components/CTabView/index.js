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
import PagerView from 'react-native-pager-view';
import {useSelector} from 'react-redux';
import {DarkColor, LightColor} from '../../config/colors';
import CText from '../CText';

// =====USAGE======
// const [routes] = useState([
//     {key: 'active', title: 'ActiveTrades', screen: <ActiveTrades />},
//     {key: 'completed', title: 'CompletedTrades', screen: <CompletedTrades />},
//   ]);

const CTabView = React.forwardRef((props, ref) => {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const {routes, initialPage, selectedIndex, setselectedIndex} = props;

  const flatlistRef = useRef();

  const [curIndex, setcurIndex] = useState(0);

  const onViewRef = React.useRef(({viewableItems, changed}) => {
    setcurIndex(changed[0].index);
    setselectedIndex(changed[0].index);
    console.log(
      '🚀 ~ file: index.js ~ line 43 ~ onViewRef ~ changed[0].index',
      changed[0].index,
    );
  });

  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  return (
    <>
      <View style={{flex: 1}}>
        <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
          {routes.map((item, index) => {
            return (
              <TouchableOpacity
                style={{alignItems: 'center', flex: 1}}
                key={index}
                onPress={() => {
                  flatlistRef.current.scrollToIndex({
                    animated: true,
                    index: index,
                  });
                }}>
                <CText
                  value={item?.title}
                  medium
                  style={{
                    color:
                      curIndex == index
                        ? BaseColor.inputBottomLine
                        : BaseColor.text2,
                    marginVertical: 6,
                  }}
                />
                <View
                  style={{
                    height: 2,
                    width: '100%',
                    backgroundColor:
                      curIndex == index
                        ? BaseColor.inputBottomLine
                        : BaseColor.primaryBG,
                  }}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <FlatList
          ref={flatlistRef}
          data={routes}
          keyExtractor={(item, index) => index}
          contentContainerStyle={{flexGrow: 1, backgroundColor: 'red'}}
          horizontal
          pagingEnabled
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View
                key={item?.key}
                style={{
                  flex: 1,
                  backgroundColor: 'red',
                  width: Dimensions.get('window').width,
                }}>
                {item?.screen}
              </View>
            );
          }}
        />
      </View>
    </>
  );
});

export default CTabView;
