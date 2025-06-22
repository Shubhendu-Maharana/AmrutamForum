import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import StoreScreen from '../screens/StoreScreen';
import Ionicons from '@react-native-vector-icons/ionicons';
import PatientScreen from '../screens/ConsultScreen';
import ForumScreen from '../screens/ForumScreen';
import ProfileRoutes from '../screens/Profile';

const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else if (route.name === 'Store') {
              iconName = 'storefront-outline';
            } else if (route.name === 'Consult') {
              iconName = 'leaf-outline';
            } else if (route.name === 'Forum') {
              iconName = 'people-outline';
            } else if (route.name === 'Profile') {
              iconName = 'person-outline';
            }

            return (
              <Ionicons name={iconName as any} size={size} color={color} />
            );
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#718D6A',
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#3A643B',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingTop: 10,
            height: 70,
          },
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Store" component={StoreScreen} />
        <Tab.Screen name="Consult" component={PatientScreen} />
        <Tab.Screen name="Forum" component={ForumScreen} />
        <Tab.Screen name="Profile" component={ProfileRoutes} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
