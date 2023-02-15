import {Dimensions, StyleSheet} from 'react-native';
import {LightColor} from '../../config/colors';
import {FontFamily} from '../../config/typography';

export default styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 50,
    marginRight: 8,
  },
  txtStyle: {
    fontSize: 14,
    fontFamily: FontFamily.Inter_Regular,
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    padding: 16,
    borderRadius: 10,
    marginTop: 8,
  },
});
