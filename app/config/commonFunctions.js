import {LayoutAnimation, Linking, Platform, UIManager} from 'react-native';
// import InAppBrowser from 'react-native-inappbrowser-reborn';
import BaseColor from './colors';

export const enableAnimateInEaseOut = () => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};

export const enableAnimateLinear = () => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
};

export const enableAnimateSpring = () => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
};

// export const openInAppBrowser = async url => {
//   try {
//     if (await InAppBrowser.isAvailable()) {
//       const result = await InAppBrowser.open(url, {
//         // iOS Properties
//         dismissButtonStyle: 'cancel',
//         preferredBarTintColor: BaseColor.darkBlue,
//         preferredControlTintColor: 'white',
//         readerMode: false,
//         animated: true,
//         modalPresentationStyle: 'fullScreen',
//         modalTransitionStyle: 'coverVertical',
//         modalEnabled: true,
//         enableBarCollapsing: false,
//         // Android Properties
//         showTitle: true,
//         toolbarColor: BaseColor.darkBlue,
//         secondaryToolbarColor: 'black',
//         enableUrlBarHiding: true,
//         enableDefaultShare: true,
//         forceCloseOnRedirection: false,
//         // Specify full animation resource identifier(package:anim/name)
//         // or only resource name(in case of animation bundled with app).
//         animations: {
//           startEnter: 'slide_in_right',
//           startExit: 'slide_out_left',
//           endEnter: 'slide_in_left',
//           endExit: 'slide_out_right',
//         },
//         headers: {
//           'my-custom-header': 'my custom header value',
//         },
//       });
//       // Alert.alert(JSON.stringify(result));
//     } else Linking.openURL(url);
//   } catch (error) {
//     console.log('onPress={ -> error', error);
//     // Alert.alert(error.message);
//   }
// };
