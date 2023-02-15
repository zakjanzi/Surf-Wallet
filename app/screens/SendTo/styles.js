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
  },
  mainCont: {
    flex: 1,
    marginTop: 16,
  },
  divider: {
    height: 1,
    borderRadius: 16,
    marginVertical: 12,
  },
  gifCont: {
    paddingHorizontal: 16,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 16,
  },
});
