import {Dimensions, StyleSheet} from 'react-native';
import {LightColor} from '../../config/colors';
import {FontFamily} from '../../config/typography';

export default styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputCont: {
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    flex: 1,
    marginEnd: 16,
  },
  tollerBar: {
    height: 6,
    width: 56,
    borderRadius: 16,
    alignSelf: 'center',
  },
  inputStyle: {
    borderBottomWidth: 1,
    height: 40,
    fontFamily: FontFamily.Inter_Medium,
    fontSize: 12,
  },
});
