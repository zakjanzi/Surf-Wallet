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
  boxStyle: {
    paddingHorizontal: 10,
    padding: 8,
    borderRadius: 4,
    marginStart: 16,
  },
  amountTICont: {
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  amountIT: {
    flex: 1,
    fontFamily: FontFamily.Inter_Medium,
  },
  offerCont: {
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  contactCont: {
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    flex: 1,
  },
});
