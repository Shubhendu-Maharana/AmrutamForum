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
import {useAppointments} from '../context/AppointmentContext';

interface AppointmentCancelModalProps {
  visible: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const reasons = [
  {label: 'Emergency work', icon: 'alert-circle-outline'},
  {label: 'Internet issues', icon: 'wifi-off'},
  {label: 'Scheduling conflict', icon: 'flash-outline'},
  {label: 'Other', icon: 'ellipsis-horizontal'},
];

const AppointmentCancelModal: React.FC<AppointmentCancelModalProps> = ({
  visible,
  setVisibility,
}) => {
  const [step, setStep] = useState<
    'confirm' | 'reason' | 'custom' | 'cancelled'
  >('confirm');
  const [customReason, setCustomReason] = useState('');
  const {cancelAppointment} = useAppointments();

  const handleCancel = () => {
    cancelAppointment(customReason, '500');
    setVisibility(false);
  };

  useEffect(() => {
    if (!visible) {
      setStep('confirm');
    }
  }, [visible]);

  const handleReasonSelect = (reason: string) => {
    if (reason === 'Other') {
      setStep('custom');
    } else {
      setCustomReason(reason);
      setStep('cancelled');
    }
  };

  const renderConfirmStep = () => (
    <>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Cancel Appointment</Text>
        <TouchableOpacity onPress={() => setVisibility(false)}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.message}>
        Are you sure you want to cancel your appointment?
      </Text>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => setStep('reason')}>
        <Text style={styles.cancelText}>Yes, Cancel</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.keepButton}
        onPress={() => setVisibility(false)}>
        <Text style={styles.keepText}>No, keep</Text>
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
              setStep('cancelled');
            }
          }}
          disabled={!customReason.trim()}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const renderCancelledStep = () => (
    <>
      <View
        style={{
          marginBottom: 12,
        }}>
        <View
          style={{
            backgroundColor: '#EAF2EA',
            padding: 10,
            borderRadius: 14,
            alignItems: 'center',
          }}>
          <Ionicons name="wallet-outline" size={80} color="#333" />
        </View>
        <View style={{marginVertical: 12}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#2E2F2E',
            }}>
            Appointment cancelled
          </Text>
          <Text style={{fontSize: 16, marginTop: 8, textAlign: 'center'}}>
            A Refund will be processed to your wallet within a few days.
          </Text>
          <Text style={{fontSize: 16, marginTop: 8, textAlign: 'center'}}>
            Thank you for your patience!{' '}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => handleCancel()}
          style={styles.keepButton}>
          <Text style={styles.keepText}>Got it</Text>
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
            : step === 'cancelled'
            ? renderCancelledStep()
            : null}
        </View>
      </View>
    </Modal>
  );
};

export default AppointmentCancelModal;

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
    borderColor: '#FF4B4B',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelText: {
    color: '#FF4B4B',
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
