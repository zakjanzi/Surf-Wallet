import {Platform} from 'react-native';

export const FontFamily = {
  Inter_Black: Platform.OS === 'android' ? 'Inter-Black' : 'System',
  Inter_SemiBold: Platform.OS === 'android' ? 'Inter-SemiBold' : 'System',
  Inter_Bold: Platform.OS === 'android' ? 'Inter-Bold' : 'System',
  Inter_Regular:
    Platform.OS === 'android' ? 'Inter-VariableFont_slnt,wght' : 'System',
  Inter_Medium: Platform.OS === 'android' ? 'Inter-Medium' : 'System',
  Inter_ExtraBold: Platform.OS === 'android' ? 'Inter-ExtraBold' : 'System',
};
