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
    flexDirection: 'row',
    alignItems: 'center',
  },
  middleRowStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 48,
  },
  maxCont: {
    height: 42,
    width: 42,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputStyle: {
    fontSize: 32,
    fontFamily: FontFamily.Inter_SemiBold,
    marginHorizontal: 12,
  },
  inputCont: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});
