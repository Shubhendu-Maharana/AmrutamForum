/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import RootNavigator from './navigation/RootNavigator';
import {View} from 'react-native';
import {AppointmentProvider} from './context/AppointmentContext';

export default function App() {
  return (
    <AppointmentProvider>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <RootNavigator />
      </View>
    </AppointmentProvider>
  );
}
