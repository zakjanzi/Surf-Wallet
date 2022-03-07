import {Dimensions, StyleSheet} from 'react-native';
import {LightColor} from '../../config/colors';
import {FontFamily} from '../../config/typography';

export default styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: LightColor.primaryBG,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnStyle: {
    backgroundColor: LightColor.white,
    height: Dimensions.get('window').width / 2.5,
    width: Dimensions.get('window').width / 2.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  themeCont: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: LightColor.strokeGrey,
    marginTop: 64,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
