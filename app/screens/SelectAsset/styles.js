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
  inputCont: {
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  cardCont: {
    width: Dimensions.get('window').width / 2 - 16,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainCardCont: {
    borderRadius: 16,
    padding: 16,
    width: '100%',
  },
});
