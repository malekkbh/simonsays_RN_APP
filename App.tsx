/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {I18nManager, SafeAreaView, StyleSheet} from 'react-native';
import GameScreen from './src/screens/GameScreen';
import MainNavigation from './routes/navigation';
import {Provider} from 'react-redux';
import {globalStore} from './store/store';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

const App = (): React.JSX.Element => {
  I18nManager.allowRTL(false);

  return (
    <Provider store={globalStore}>
      <MainNavigation />
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
