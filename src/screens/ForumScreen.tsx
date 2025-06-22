/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import QuestionsTab from './QuestionsTab';
import ThoughtsTab from './ThoughtsTab';
import {View} from 'react-native';
import CustomTopTabBar from '../components/CustomTopTabBar';
import Header from '../components/Header';

const TopTab = createMaterialTopTabNavigator();

const ForumScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header heading="Forum" />
      <TopTab.Navigator tabBar={props => <CustomTopTabBar {...props} />}>
        <TopTab.Screen name="Questions" component={QuestionsTab} />
        <TopTab.Screen name="Thoughts" component={ThoughtsTab} />
      </TopTab.Navigator>
    </View>
  );
};

export default ForumScreen;
