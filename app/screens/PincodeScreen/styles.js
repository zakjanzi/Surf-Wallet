import {Dimensions, StyleSheet} from 'react-native';
import {LightColor} from '../../config/colors';
import {FontFamily} from '../../config/typography';

export default styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
  },
  otpCont: {
    borderRadius: 8,
    height: 40,
    width: 40,
  },
  codeFieldRoot: {
    width: '80%',
    marginTop: 64,
  },
  cell: {
    backgroundColor: 'blue',
    width: 40,
    height: 40,
    fontSize: 24,
    textAlign: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  focusCell: {
    backgroundColor: 'yellow',
  },
});
