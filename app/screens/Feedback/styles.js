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
  rowStyle: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  offerCont: {
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  topMenuCont: {
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 50,
    marginEnd: 16,
  },
});
