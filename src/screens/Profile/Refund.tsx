/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Text, View} from 'react-native';
import Header from '../../components/Header';
import {useAppointments} from '../../context/AppointmentContext';
import RefundTracker from '../../components/RefundTracker';

const Refund = () => {
  const {currentAppointment} = useAppointments();

  return (
    <View style={{flex: 1}}>
      <Header heading="Refund" />

      <View
        style={{
          flex: 1,
          marginVertical: 16,
          marginHorizontal: 18,
        }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#00000025',
            borderRadius: 12,
            paddingVertical: 8,
            paddingHorizontal: 10,
            gap: 20,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                flex: 1,
                color: '#00000070',
              }}>
              Appointment ID:
            </Text>
            <Text
              style={{
                flex: 2,
              }}>
              {currentAppointment?.id}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                flex: 1,
                color: '#00000070',
              }}>
              Reason:
            </Text>
            <Text
              style={{
                flex: 2,
              }}>
              {currentAppointment?.cancellactionReason}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                flex: 1,
                color: '#00000070',
              }}>
              Return amount:
            </Text>
            <Text
              style={{
                flex: 2,
              }}>
              {currentAppointment?.returnAmount} INR
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#FFE3E3',
              padding: 8,
              borderRadius: 8,
              flexDirection: 'row',
              gap: 6,
            }}>
            <Text style={{color: '#CB0000', fontSize: 12}}>
              This appointment has been cancelled by doctor.
            </Text>
          </View>
        </View>

        <RefundTracker />
      </View>
    </View>
  );
};

export default Refund;
