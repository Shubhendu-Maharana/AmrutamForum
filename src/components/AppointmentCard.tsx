/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigationTypes';
import {useAppointments} from '../context/AppointmentContext';
import {Appointment} from '../types';

const AppointmentCard: React.FC<{appointment: Appointment}> = ({
  appointment,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {setCurrentAppointment} = useAppointments();

  const formatDateTime = () => {
    const dateTime = new Date(appointment.dateTime);
    const now = new Date();
    const diffInMs = dateTime.getTime() - now.getTime();

    const formattedDate = new Intl.DateTimeFormat('en-GB', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(dateTime);

    const formattedTime = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(dateTime);

    const isJoinEnabled = diffInMs > 0 && diffInMs <= 30 * 60 * 1000;

    return {formattedDate, formattedTime, isJoinEnabled};
  };

  const {formattedDate, formattedTime, isJoinEnabled} = formatDateTime();

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.topRow}>
        <View style={{flex: 1}}>
          <Text style={styles.name}>Dr. {appointment.doctorName}</Text>
          <View style={styles.specialityRow}>
            <Text style={styles.speciality}>{appointment.specialization}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{appointment.status}</Text>
            </View>
          </View>
        </View>
        <Image source={{uri: appointment.doctorImage}} style={styles.avatar} />
      </View>

      {/* Date and Time */}
      <View style={styles.datetimeRow}>
        <View style={styles.iconText}>
          <Ionicons name="calendar-outline" size={16} color="#3A643B" />
          <Text style={styles.datetimeText}>{formattedDate}</Text>
        </View>
        <View style={styles.iconText}>
          <Ionicons name="time-outline" size={16} color="#3A643B" />
          <Text style={styles.datetimeText}>{formattedTime}</Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.viewDetailBtn}
          onPress={() => {
            setCurrentAppointment(appointment);
            navigation.navigate('AppointmentDetails', {isEditable: true});
          }}>
          <Text style={styles.viewDetailText}>View Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.joinCallBtn, !isJoinEnabled && styles.disabledJoin]}
          disabled={!isJoinEnabled}>
          <Text style={[styles.joinCallText, !isJoinEnabled && {opacity: 0.5}]}>
            Join Call
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  specialityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 8,
  },
  speciality: {
    fontSize: 13,
    color: '#444',
  },
  statusBadge: {
    backgroundColor: '#F6E9DC',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    color: '#C1802F',
    fontWeight: '500',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginLeft: 12,
  },
  datetimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  datetimeText: {
    fontSize: 13,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  viewDetailBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#3A643B',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewDetailText: {
    color: '#3A643B',
    fontSize: 14,
    fontWeight: '500',
  },
  joinCallBtn: {
    flex: 1,
    backgroundColor: '#3A643B',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinCallText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  disabledJoin: {
    backgroundColor: '#3A643B80',
  },
});

export default AppointmentCard;
