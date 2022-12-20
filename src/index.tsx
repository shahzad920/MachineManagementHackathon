/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {StatusBar, Platform} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigator from './navigation';
import {persistor, store} from './store';
import KeyboardManager from 'react-native-keyboard-manager';

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'ios') {
      KeyboardManager.setEnable(true);
      KeyboardManager.setShouldResignOnTouchOutside(false);
      KeyboardManager.setToolbarPreviousNextButtonEnable(true);
    }
  }, []);
  return (
    <Provider store={store}>
      <StatusBar barStyle={'dark-content'} />
      <PersistGate persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
