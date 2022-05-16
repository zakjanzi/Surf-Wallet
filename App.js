/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  I18nManager,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import NavStart from './app/navigation';
import {persistor, store} from './app/redux/store/configureStore';
import i18n from './app/language/i18n';
import {Provider as PaperProvider} from 'react-native-paper';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={'#3700B3'} />
      <Provider store={store}>
        <PersistGate loading={false} persistor={persistor}>
          <PaperProvider>
            <NavStart />
          </PaperProvider>
        </PersistGate>
      </Provider>
    </>
  );
}
