/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Header from '../../components/Header';
import AppointmentDropdown from '../../components/AppointmentDropdown';
import {RootStackParamList} from '../../types/navigationTypes';
import {RouteProp, useNavigation} from '@react-navigation/native';
import AppointmentCancelModal from '../../components/AppointmentCancelModal';
import {useState} from 'react';
import {useAppointments} from '../../context/AppointmentContext';
import {useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AppointmentRescheduleModal from '../../components/AppointmentRescheduleModal';

const medicalData = [
  {label: 'Medical ID', value: 'APPLF10247816'},
  {label: 'Medical type', value: 'Freeaudio'},
];

type AppointmentDetailsRouteProp = RouteProp<
  RootStackParamList,
  'AppointmentDetails'
>;

const AppointmentDetails = () => {
  const route = useRoute<AppointmentDetailsRouteProp>();
  const {isEditable} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [cancellationModalVisible, setCancellationModalVisible] =
    useState(false);
  const [rescheduleModalVisible, setRescheduleModalVisible] = useState(false);
  const {currentAppointment} = useAppointments();

  return (
    <View style={{flex: 1}}>
      <Header
        heading="Appointment Details"
        isEditable={isEditable}
        onCanelPress={() => setCancellationModalVisible(true)}
        onReschedulePress={() => setRescheduleModalVisible(true)}
      />
      <ScrollView
        style={{
          flex: 1,
          margin: 8,
        }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#00000025',
            borderRadius: 12,
            paddingVertical: 8,
            paddingHorizontal: 10,
          }}>
          <Image
            source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              alignSelf: 'center',
            }}
          />
          <View style={{flexDirection: 'row', marginTop: 12}}>
            <Text
              style={{
                flex: 1,
                color: '#00000070',
              }}>
              Doctor name:
            </Text>
            <Text
              style={{
                flex: 2,
              }}>
              {currentAppointment?.doctorName}
            </Text>
          </View>

          {currentAppointment?.status === 'Cancelled' && (
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
              <TouchableOpacity onPress={() => navigation.navigate('Refund')}>
                <Text
                  style={{color: '#3A643B', fontSize: 12, fontWeight: '600'}}>
                  Track refund
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={{marginTop: 12, gap: 8}}>
          <AppointmentDropdown
            title="Appointment Details"
            data={currentAppointment?.appointmentDetails ?? []}
          />

          <AppointmentDropdown
            title="Symptom Details"
            data={currentAppointment?.symptomDetails ?? []}
          />
          <AppointmentDropdown
            title="Coupons Details"
            data={currentAppointment?.couponDetails ?? []}
          />
          <AppointmentDropdown
            title="Booking Details"
            data={currentAppointment?.bookingDetails ?? []}
          />
          <AppointmentDropdown title="Medical Report" data={medicalData} />
        </View>
      </ScrollView>
      <AppointmentCancelModal
        visible={cancellationModalVisible}
        setVisibility={setCancellationModalVisible}
      />
      <AppointmentRescheduleModal
        visible={rescheduleModalVisible}
        setVisibility={setRescheduleModalVisible}
      />
    </View>
  );
};

export default AppointmentDetails;
