/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileHome from './ProfileHome';
import MyAppointmentsScreen from './MyAppointmentsScreen';
import AppointmentDetails from './AppointmentDetails';
import Refund from './Refund';
import ReschedulingScreen from './ReschedulingScreen';
import AppointmentOverview from './AppointmentOverview';
import AppointmentConfirmationScreen from './AppointmentConfirmationScreen';

const Stack = createNativeStackNavigator();

const ProfileRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileHome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProfileHome" component={ProfileHome} />
      <Stack.Screen name="MyAppointments" component={MyAppointmentsScreen} />
      <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
      <Stack.Screen name="Refund" component={Refund} />
      <Stack.Screen name="Rescheduing" component={ReschedulingScreen} />
      <Stack.Screen name="Overview" component={AppointmentOverview} />
      <Stack.Screen
        name="Confirmation"
        component={AppointmentConfirmationScreen}
      />
    </Stack.Navigator>
  );
};

export default ProfileRoutes;
