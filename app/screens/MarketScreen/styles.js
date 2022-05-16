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
  topMenuCont: {
    padding: 8,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginEnd: 16,
  },
  rowStyle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  curCont: {
    padding: 8,
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  blockCont: {
    borderRadius: 10,
    width: Dimensions.get('window').width / 2 - 16,
    padding: 4,
    marginVertical: 4,
  },
  blockCont2: {
    borderRadius: 10,
    padding: 10,
  },
});
