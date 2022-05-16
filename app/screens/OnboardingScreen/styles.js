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
  header: {
    padding: 16,
    height: 60,
    justifyContent: 'center',
  },
  title: {
    fontSize: 19,
    color: LightColor.primary,
    textAlign: 'center',
  },
  desciption: {
    fontSize: 19,
    color: LightColor.boardingTxt,
    textAlign: 'center',
    marginHorizontal: 56,
    marginTop: 12,
  },
  dotCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 48,
  },
  dot: {
    backgroundColor: LightColor.primary,
    marginHorizontal: 4,
    height: 8,
    width: 8,
    borderRadius: 100,
  },
  bottomBar: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    padding: 24,
  },
  skipTxt: {
    color: LightColor.boardingSkip,
  },
  nextCont: {
    borderRadius: 50,
    padding: 16,
    backgroundColor: LightColor.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
