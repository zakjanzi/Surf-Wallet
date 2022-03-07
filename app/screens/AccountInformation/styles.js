import {Dimensions, StyleSheet} from 'react-native';
import {LightColor} from '../../config/colors';
import {FontFamily} from '../../config/typography';

export default styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
  },
  text2: {
    fontFamily: FontFamily.Inter_Regular,
    fontSize: 12,
  },
  privacyCont: {
    borderRadius: 14,
    padding: 16,
    marginTop: 24,
    paddingHorizontal: 24,
  },
  divider: {
    height: 1,
    borderRadius: 16,
    marginVertical: 12,
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalCont: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomCont: {
    padding: 16,
  },
});
