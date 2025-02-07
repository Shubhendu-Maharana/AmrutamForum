import React from 'react';
import RootNavigator from './navigation/RootNavigator';
import {View} from 'react-native';

export default function App() {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <RootNavigator />;
    </View>
  );
}
