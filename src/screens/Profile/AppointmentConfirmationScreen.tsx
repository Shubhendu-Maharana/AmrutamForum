import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useAppointments} from '../../context/AppointmentContext';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigationTypes';

const AppointmentConfirmationScreen = () => {
  const {currentAppointment, rescheduleAppointment} = useAppointments();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderDetailRow = (
    label: string | undefined,
    value: string | undefined,
    isAmount?: boolean,
  ) => (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{isAmount ? `₹ ${value}` : value}</Text>
    </View>
  );

  const handleGotIt = () => {
    rescheduleAppointment(
      currentAppointment?.date,
      currentAppointment?.time,
      currentAppointment?.rescheduleReason,
    );
    navigation.reset({
      index: 0,
      routes: [{name: 'ProfileHome'}],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: currentAppointment?.doctorImage}}
              style={styles.expertImage}
              resizeMode="cover"
            />
            <View style={styles.checkmarkContainer}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
          </View>

          <Text style={styles.confirmationTitle}>Appointment Confirmed</Text>
          <Text style={styles.confirmationSubtitle}>
            Thank you for choosing our Experts to help guide you
          </Text>
        </View>

        {/* Details Section */}
        <View style={styles.detailsSection}>
          {renderDetailRow('Expert', currentAppointment?.doctorName)}
          {renderDetailRow('Appointment Date', currentAppointment?.date)}
          {renderDetailRow('Appointment Time', currentAppointment?.time)}
          {renderDetailRow('Consultation Type', 'Video Consultaion')}
          {renderDetailRow('Current Wallet Balance', '2,000', true)}
          {renderDetailRow('Consultation Fee', '650', true)}
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={styles.gotItButton}
          onPress={handleGotIt}
          activeOpacity={0.8}>
          <Text style={styles.gotItButtonText}>Got it</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  headerSection: {
    alignItems: 'center',
    backgroundColor: '#f0f4f0',
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  expertImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  checkmarkContainer: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#28a745',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  confirmationTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 8,
    textAlign: 'center',
  },
  confirmationSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 22,
  },
  detailsSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    padding: 20,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  detailLabel: {
    fontSize: 16,
    color: '#6c757d',
    fontWeight: '400',
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: '#212529',
    fontWeight: '500',
    textAlign: 'right',
    flex: 1,
  },
  gotItButton: {
    backgroundColor: '#3A643B',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  gotItButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AppointmentConfirmationScreen;
