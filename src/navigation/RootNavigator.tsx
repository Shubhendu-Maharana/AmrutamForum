import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import AppointmentScreen from '../screens/AppointmentScreen';
import Ionicons from '@react-native-vector-icons/ionicons';
import PatientScreen from '../screens/PatientScreen';
import BulletinScreen from '../screens/BulletinScreen';
import PaymentScreen from '../screens/PaymentScreen';

const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else if (route.name === 'Appointment') {
              iconName = 'calendar-outline';
            } else if (route.name === 'Patient') {
              iconName = 'person-outline';
            } else if (route.name === 'Bulletin') {
              iconName = 'notifications-outline';
            } else if (route.name === 'Payment') {
              iconName = 'wallet-outline';
            }

            return (
              <Ionicons name={iconName as any} size={size} color={color} />
            );
          },
          tabBarActiveTintColor: '#9DB29D',
          tabBarInactiveTintColor: '#9DB29D',
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#0C140C',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingTop: 10,
            height: 70,
          },
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Appointment" component={AppointmentScreen} />
        <Tab.Screen name="Patient" component={PatientScreen} />
        <Tab.Screen name="Bulletin" component={BulletinScreen} />
        <Tab.Screen name="Payment" component={PaymentScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
