import {Dimensions, StyleSheet} from 'react-native';
import {LightColor} from '../../config/colors';
import {FontFamily} from '../../config/typography';

export default styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 50,
    marginRight: 8,
  },
  tollerBar: {
    height: 6,
    width: 56,
    borderRadius: 16,
    alignSelf: 'center',
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtStyle: {
    fontFamily: FontFamily.Inter_Bold,
  },
  cardCont: {
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
});
