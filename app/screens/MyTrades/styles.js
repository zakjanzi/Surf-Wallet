import {Dimensions, StyleSheet} from 'react-native';
import {LightColor} from '../../config/colors';
import {FontFamily} from '../../config/typography';

export default styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: LightColor.primaryBG,
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
