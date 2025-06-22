/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {ScrollView, View} from 'react-native';
import Header from '../../components/Header';
import AppointmentCard from '../../components/AppointmentCard';
import {useAppointments} from '../../context/AppointmentContext';

const MyAppointmentsScreen = () => {
  const {appointments} = useAppointments();

  return (
    <View style={{flex: 1}}>
      <Header heading="My Appointments" />

      <ScrollView
        style={{
          flex: 1,
          margin: 8,
        }}>
        {appointments.map(item => (
          <AppointmentCard key={item.id} appointment={item} />
        ))}
      </ScrollView>
    </View>
  );
};

export default MyAppointmentsScreen;
