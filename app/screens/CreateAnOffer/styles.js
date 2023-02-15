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
    marginTop: 4,
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topMenuCont: {
    padding: 4,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginEnd: 16,
  },
  dropdownCont: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    marginTop: 8,
  },
  textInputCont: {
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 8,
    paddingStart: 16,
    maxHeight: 120,
  },
  borderedBox: {
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 8,
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
    justifyContent: 'space-between',
  },
});
