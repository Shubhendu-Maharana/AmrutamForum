/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
  TextInput,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigationTypes';
import {useAppointments} from '../context/AppointmentContext';

interface AppointmentRescheduleModalProps {
  visible: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const reasons = [
  {label: 'Emergency work', icon: 'alert-circle-outline'},
  {label: 'Internet issues', icon: 'wifi-off'},
  {label: 'Scheduling conflict', icon: 'flash-outline'},
  {label: 'Other', icon: 'ellipsis-horizontal'},
];

const AppointmentRescheduleModal: React.FC<AppointmentRescheduleModalProps> = ({
  visible,
  setVisibility,
}) => {
  const [step, setStep] = useState<
    'confirm' | 'reason' | 'custom' | 'rescheduled'
  >('confirm');
  const [customReason, setCustomReason] = useState('');
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {setCurrentAppointment} = useAppointments();

  useEffect(() => {
    if (!visible) {
      setStep('confirm');
    }
  }, [visible]);

  const handleReasonSelect = (reason: string) => {
    if (reason === 'Other') {
      setStep('custom');
    } else {
      setVisibility(false);
      setCurrentAppointment(
        prev =>
          prev && {...prev, status: 'Rescheduled', rescheduleReason: reason},
      );
      navigation.navigate('Rescheduing');
      setCustomReason('');
    }
  };

  const renderConfirmStep = () => (
    <>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Reschedule Appointment</Text>
        <TouchableOpacity onPress={() => setVisibility(false)}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.message}>
        Unfortunately, the doctor is not available at your chosen time. Kindly
        reschedule your appointment
      </Text>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => setVisibility(false)}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.keepButton}
        onPress={() => setStep('reason')}>
        <Text style={styles.keepText}>Reschedule</Text>
      </TouchableOpacity>
    </>
  );

  const renderReasonStep = () => (
    <>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>
          Please select reason for cancellation
        </Text>
        <TouchableOpacity onPress={() => setVisibility(false)}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={reasons}
        keyExtractor={item => item.label}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.reasonItem}
            onPress={() => handleReasonSelect(item.label)}>
            <Ionicons
              name={item.icon as any}
              size={20}
              color="#333"
              style={{width: 24}}
            />
            <Text style={styles.reasonText}>{item.label}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={{height: 12}} />}
        contentContainerStyle={{paddingTop: 12}}
      />
    </>
  );

  const renderCustomReasonStep = () => (
    <>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Other</Text>
      </View>

      <Text style={styles.message}>
        Let the doctor know why you're cancelling.
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>
          Reason<Text style={{color: 'red'}}>*</Text>
        </Text>
        <TextInput
          placeholder="Type your reason..."
          style={styles.input}
          value={customReason}
          onChangeText={setCustomReason}
        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => setStep('reason')}>
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.saveBtn, {opacity: customReason.trim() ? 1 : 0.5}]}
          onPress={() => {
            if (customReason.trim()) {
              setVisibility(false);
              setCurrentAppointment(
                prev =>
                  prev && {
                    ...prev,
                    status: 'Rescheduled',
                    rescheduleReason: customReason.trim(),
                  },
              );
              navigation.navigate('Rescheduing');
              setCustomReason('');
            }
          }}
          disabled={!customReason.trim()}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={() => setVisibility(false)}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {step === 'confirm'
            ? renderConfirmStep()
            : step === 'reason'
            ? renderReasonStep()
            : step === 'custom'
            ? renderCustomReasonStep()
            : null}
        </View>
      </View>
    </Modal>
  );
};

export default AppointmentRescheduleModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000055',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modal: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    gap: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  skipText: {
    color: '#3A643B',
    fontSize: 14,
    fontWeight: '500',
  },
  message: {
    fontSize: 14,
    color: '#333',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#3A643B',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelText: {
    color: '#3A643B',
    fontSize: 14,
    fontWeight: '600',
  },
  keepButton: {
    backgroundColor: '#3A643B',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  keepText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 6,
  },
  reasonText: {
    fontSize: 14,
    color: '#333',
  },
  inputContainer: {
    marginTop: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#CED8E0',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  inputLabel: {
    fontSize: 14,
    color: '#444',
  },
  input: {
    fontSize: 14,
    backgroundColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#3A643B',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#3A643B',
    fontSize: 14,
    fontWeight: '600',
  },
  saveBtn: {
    flex: 1,
    backgroundColor: '#3A643B',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
