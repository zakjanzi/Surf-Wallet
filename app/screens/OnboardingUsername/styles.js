import {Dimensions, StyleSheet} from 'react-native';
import {LightColor} from '../../config/colors';
import {FontFamily} from '../../config/typography';

export default styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
  },
  txtInput: {
    flex: 1,
    fontSize: 12,
    fontFamily: FontFamily.Inter_Regular,
  },
  inputCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    width: '100%',
    borderBottomWidth: 1,
  },
  leftIcon: {
    fontSize: 14,
    fontFamily: FontFamily.Inter_Regular,
    marginRight: 8,
  },
  righttxt: {
    fontSize: 10,
    fontFamily: FontFamily.Inter_Regular,
    marginLeft: 8,
  },
  errorTxt: {
    marginTop: 6,
    fontSize: 10,
  },
  privacyToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  shadow5: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  txtStyle: {
    fontFamily: FontFamily.Inter_Medium,
  },
});
