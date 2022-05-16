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
  balanceImg: {
    height: 150,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  balanceAbs: {
    position: 'absolute',
    height: 150,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  graphStyle: {
    height: 24,
    width: 24,
  },
  graphBtnCont: {
    marginTop: 16,
  },
  portCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 16,
  },
  partContO: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});
