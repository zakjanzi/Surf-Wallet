import {Dimensions, StyleSheet} from 'react-native';
import {LightColor} from '../../config/colors';
import {FontFamily} from '../../config/typography';

export default styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 50,
    marginRight: 8,
  },
  privateKeyCont: {
    borderRadius: 12,
    padding: 16,
    minHeight: 74,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    margin: 16,
  },
  modalCont: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomCont: {
    padding: 16,
  },
});
