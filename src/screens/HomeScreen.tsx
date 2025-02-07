import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ForumScreen from '../screens/ForumScreen';
import ThoughtsScreen from '../screens/ThoughtsScreen';
import {View, Text} from 'react-native';
import CustomTopTabBar from '../components/CustomTopTabBar';

const TopTab = createMaterialTopTabNavigator();

const HomeScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          backgroundColor: '#EAF2EA',
          height: 188,
          position: 'relative',
          overflow: 'hidden',
          borderBottomStartRadius: 42,
          borderBottomEndRadius: 42,
        }}>
        <Text
          style={{
            position: 'absolute',
            top: 48,
            left: 15,
            color: '#0C140C',
            fontWeight: '500',
            fontSize: 29,
          }}>
          Forum
        </Text>
        <View
          style={{
            height: 191,
            width: 191,
            backgroundColor: '#CFEBCF80',
            borderRadius: 100,
            position: 'absolute',
            top: -104,
            left: 183,
          }}
        />
        <View
          style={{
            height: 191,
            width: 191,
            backgroundColor: '#CFEBCF80',
            borderRadius: 100,
            position: 'absolute',
            top: 117,
            left: 216,
          }}
        />
      </View>

      <TopTab.Navigator tabBar={props => <CustomTopTabBar {...props} />}>
        <TopTab.Screen name="Questions" component={ForumScreen} />
        <TopTab.Screen name="Thoughts" component={ThoughtsScreen} />
      </TopTab.Navigator>
    </View>
  );
};

export default HomeScreen;
