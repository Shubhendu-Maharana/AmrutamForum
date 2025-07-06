/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Header from '../../components/Header';
import {useAppointments} from '../../context/AppointmentContext';
import CalendarScroll from '../../components/CalenderScroll';
import Ionicons from '@react-native-vector-icons/ionicons';
import {useState} from 'react';
import TimeScroll from '../../components/TimeScroll';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigationTypes';

const ReschedulingScreen = () => {
  const {currentAppointment, setCurrentAppointment} = useAppointments();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [step, setStep] = useState<'date' | 'time'>('date');
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderChooseDate = () => (
    <>
      <View style={{marginVertical: 16, flexDirection: 'row', gap: 12}}>
        <Image
          source={{uri: currentAppointment?.doctorImage}}
          style={{
            height: 60,
            width: 60,
            resizeMode: 'cover',
            borderRadius: 14,
          }}
        />
        <View style={{flex: 1, justifyContent: 'space-evenly'}}>
          <Text style={{fontSize: 16, fontWeight: '700', color: '#0C0C0C'}}>
            {currentAppointment?.doctorName}
          </Text>
          <Text style={{fontSize: 14, fontWeight: '400', color: '#646665'}}>
            {currentAppointment?.specialization}
          </Text>
        </View>
      </View>
      <Text style={{fontSize: 14, fontWeight: '700', color: '#2E2F2E'}}>
        Pick Appointment Date
      </Text>

      <CalendarScroll
        baseDateISO={currentAppointment?.dateTime ?? ''}
        selectedDateISO={selectedDate?.toISOString() ?? ''}
        onDateSelect={newDate => setSelectedDate(newDate)}
      />

      <View
        style={{
          backgroundColor: '#EAF2EA',
          gap: 12,
          paddingVertical: 12,
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
          <Ionicons name="calendar-outline" size={24} color="#3A643B" />
          <Text style={{fontSize: 14, fontWeight: '400'}}>
            {new Intl.DateTimeFormat('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }).format(selectedDate)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (selectedDate) {
              setCurrentAppointment(
                prev =>
                  prev && {
                    ...prev,
                    dateTime: selectedDate.toISOString(),
                  },
              );
              setStep('time');
            }
          }}
          style={{
            backgroundColor: '#3A643B',
            alignItems: 'center',
            padding: 18,
            borderRadius: 16,
            width: '100%',
          }}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: '700'}}>
            Confirm Date
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const renderChooseTime = () => (
    <>
      <View style={{marginVertical: 16, flexDirection: 'row', gap: 12}}>
        <Image
          source={{uri: currentAppointment?.doctorImage}}
          style={{
            height: 60,
            width: 60,
            resizeMode: 'cover',
            borderRadius: 14,
          }}
        />
        <View style={{flex: 1, justifyContent: 'space-evenly'}}>
          <Text style={{fontSize: 16, fontWeight: '700', color: '#0C0C0C'}}>
            {currentAppointment?.doctorName}
          </Text>
          <Text style={{fontSize: 14, fontWeight: '400', color: '#646665'}}>
            {currentAppointment?.specialization}
          </Text>
        </View>
      </View>
      <Text style={{fontSize: 14, fontWeight: '700', color: '#2E2F2E'}}>
        Pick a time slot
      </Text>

      <TimeScroll selected={selectedTime} setSelected={setSelectedTime} />

      <View
        style={{
          gap: 12,
          paddingVertical: 12,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            const [time, meridiem] = selectedTime.split(' ');
            const [hourStr, minuteStr] = time.split(':');
            let hour = parseInt(hourStr, 10);
            const minute = parseInt(minuteStr, 10);

            if (meridiem === 'PM' && hour !== 12) {
              hour += 12;
            }
            if (meridiem === 'AM' && hour === 12) {
              hour = 0;
            }

            const newDate = new Date(currentAppointment?.dateTime ?? '');
            newDate.setHours(hour, minute, 0, 0);
            setCurrentAppointment(
              prev =>
                prev && {
                  ...prev,
                  dateTime: newDate.toISOString(),
                },
            );
            navigation.navigate('Overview');
          }}
          style={{
            backgroundColor: '#3A643B',
            alignItems: 'center',
            padding: 18,
            borderRadius: 16,
            width: '100%',
          }}>
          <Text style={{color: 'white', fontSize: 16, fontWeight: '700'}}>
            Confirm Appointment
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <View style={{flex: 1, marginHorizontal: 16}}>
      <Header heading="Choose Date" />

      {step === 'date'
        ? renderChooseDate()
        : step === 'time'
        ? renderChooseTime()
        : null}
    </View>
  );
};

export default ReschedulingScreen;
