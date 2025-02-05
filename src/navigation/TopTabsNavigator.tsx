import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ForumScreen from '../screens/ForumScreen';
import ThoughtsScreen from '../screens/ThoughtsScreen';
import {View, Text, StyleSheet} from 'react-native';

const TopTab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  return (
    <View style={{flex: 1}}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Forum</Text>
      </View>

      {/* Top Tab Navigation */}
      <TopTab.Navigator
        screenOptions={{
          tabBarLabelStyle: {fontSize: 14, fontWeight: 'bold'},
          tabBarIndicatorStyle: {backgroundColor: 'black', height: 3},
          tabBarStyle: {backgroundColor: 'white'},
        }}>
        <TopTab.Screen name="Questions" component={ForumScreen} />
        <TopTab.Screen name="Thoughts" component={ThoughtsScreen} />
      </TopTab.Navigator>
    </View>
  );
};

export default TopTabNavigator;

const styles = StyleSheet.create({
  header: {
    padding: 15,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
