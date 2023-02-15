import {Dimensions, StyleSheet} from 'react-native';
import {LightColor} from '../../config/colors';
import {FontFamily} from '../../config/typography';

export default styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
  },
  titleStyle: {
    fontSize: 16,
    textAlign: 'center',
  },
  imageSty: {
    width: '100%',
    height: 300,
  },
  btnCont: {
    padding: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  btnIcon: {
    height: 24,
    width: 24,
  },
});
