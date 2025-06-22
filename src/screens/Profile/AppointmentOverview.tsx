/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Header from '../../components/Header';
import {useAppointments} from '../../context/AppointmentContext';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigationTypes';

const AppointmentOverview = () => {
  const {currentAppointment} = useAppointments();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderRow = ({
    label,
    value,
  }: {
    label: string;
    value: string | undefined;
  }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Text style={{color: '#444', fontSize: 13, flex: 1}}>{label}</Text>
      <Text style={{color: '#000', fontSize: 13}}> : </Text>
      <Text
        style={{
          color: '#000',
          fontSize: 13,
          flex: 1,
          marginLeft: 12,
          fontWeight: '500',
        }}>
        {value}
      </Text>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <Header heading="Appointment Overview" />

      <ScrollView style={{marginTop: 14, marginHorizontal: 14}}>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 12,
            padding: 14,
            gap: 12,
            marginBottom: 12,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 20, fontWeight: '500'}}>Date and time</Text>
            <TouchableOpacity>
              <Text style={{fontSize: 16, fontWeight: '500', color: '#3A643B'}}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>
          {renderRow({
            label: 'Appointment Date',
            value: currentAppointment?.date,
          })}
          {renderRow({
            label: 'Appointment Time',
            value: currentAppointment?.time,
          })}
          {renderRow({
            label: 'Consultation Type',
            value: 'Video Consultaion',
          })}
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 12,
            padding: 14,
            gap: 12,
            marginBottom: 12,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 20, fontWeight: '500'}}>Concern</Text>
            <TouchableOpacity>
              <Text style={{fontSize: 16, fontWeight: '500', color: '#3A643B'}}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>
          {renderRow({
            label: 'Concern',
            value: 'Diabetes',
          })}
          {renderRow({
            label: 'Severity',
            value: 'Moderate  ',
          })}
          {renderRow({
            label: 'How long?',
            value: '28 days',
          })}
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 12,
            padding: 14,
            gap: 12,
            marginBottom: 12,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 20, fontWeight: '500'}}>
              Basic information
            </Text>
            <TouchableOpacity>
              <Text style={{fontSize: 16, fontWeight: '500', color: '#3A643B'}}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>
          {renderRow({
            label: 'Gender',
            value: 'Female',
          })}
          {renderRow({
            label: 'Age',
            value: '28 years  ',
          })}
          {renderRow({
            label: 'Height',
            value: '171 cm',
          })}
          {renderRow({
            label: 'Weight',
            value: '63 kg',
          })}
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => navigation.navigate('Confirmation')}
        style={{
          marginHorizontal: 20,
          marginBottom: 10,
          alignItems: 'center',
          paddingVertical: 12,
          backgroundColor: '#3A643B',
          borderRadius: 12,
        }}>
        <Text style={{fontSize: 16, color: 'white', fontWeight: '500'}}>
          Confirm Appointment
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppointmentOverview;
